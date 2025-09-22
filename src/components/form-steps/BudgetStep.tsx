import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormData as HandpickForm } from "../HandpickForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Mic, MicOff, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
];

const minEuro = 300;
const currencyRates: Record<string, number> = {
  EUR: 1,
  USD: 1.07,
  GBP: 0.86,
  JPY: 160,
  CAD: 1.46,
  AUD: 1.65,
  CHF: 0.96,
  CNY: 7.75,
  INR: 89,
};

const getMinAmount = (code: string) => {
  const rate = currencyRates[code] || 1;
  return minEuro * rate;
};

type BudgetStepProps = {
  onBudgetError?: (error: string | null) => void;
};

const BudgetStep: React.FC<BudgetStepProps> = ({ onBudgetError }) => {
  const { control, setValue, watch } = useFormContext<HandpickForm>();
  const notes = watch("notes");
  const currency = watch("currency");

  // --- Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [budgetError, setBudgetError] = useState<string | null>(null);

  // --- Refs for recording lifecycle
  const streamRef = useRef<globalThis.MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  // Pick a supported mime type for MediaRecorder
  function pickMimeType(): string {
    const candidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4", // some Safari versions
      "audio/ogg",
    ];
    // @ts-ignore - MediaRecorder may not exist in SSR
    if (typeof window !== "undefined" && window.MediaRecorder) {
      for (const type of candidates) {
        // @ts-ignore
        if (MediaRecorder.isTypeSupported?.(type)) return type;
      }
      // fallback
      return "audio/webm";
    }
    return "audio/webm";
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        recorderRef.current?.stop();
      } catch {}
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  async function startRecording() {
    try {
      // Get mic
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, { mimeType });

      chunksRef.current = [];
      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onerror = (e) => {
        console.error("MediaRecorder error:", e);
        toast({
          title: "Recording error",
          description: "Could not record audio. Please try again.",
          variant: "destructive",
        });
        stopRecordingInternal(false);
      };

      recorder.onstop = handleStopAndTranscribe;

      recorderRef.current = recorder;
      recorder.start(); // optionally pass a timeslice (ms) for chunking
      setIsRecording(true);

      toast({
        title: "Recording started",
        description: "Speak now to add notes.",
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Microphone blocked",
        description: "Allow mic access and try again.",
        variant: "destructive",
      });
      setIsRecording(false);
    }
  }

  function stopRecordingInternal(showToast = true) {
    try {
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        recorderRef.current.stop();
      }
    } catch {}
    setIsRecording(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (showToast) {
      toast({ title: "Recording stopped", description: "Processing audio…" });
    }
  }

  function stopRecording() {
    stopRecordingInternal(true);
  }

  async function handleStopAndTranscribe() {
    const parts = chunksRef.current;
    chunksRef.current = [];

    if (!parts.length) {
      toast({
        title: "No audio captured",
        description: "Please try again and speak clearly.",
        variant: "destructive",
      });
      return;
    }

    // Create a Blob in whatever mimeType we used
    const blob = new Blob(parts, { type: recorderRef.current?.mimeType || "audio/webm" });

    setIsTranscribing(true);
    try {
      const text = await transcribeToEnglish(blob);
      if (text) {
        const current = notes || "";
        setValue("notes", current ? `${current} ${text}` : text, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
        toast({ title: "Transcribed", description: "Added text to notes." });
      } else {
        toast({
          title: "Empty transcript",
          description: "Couldn’t detect speech. Try again.",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      console.error(e);
      toast({
        title: "Transcription failed",
        description: e?.message || "OpenAI did not return text.",
        variant: "destructive",
      });
    } finally {
      setIsTranscribing(false);
    }
  }

  // --- OpenAI: force English using /audio/translations
  async function transcribeToEnglish(audioBlob: Blob): Promise<string> {
    if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY.includes("<PUT_OPENAI_API_KEY_HERE>")) {
      throw new Error("Missing NEXT_PUBLIC_OPENAI_API_KEY.");
    }

    const form = new globalThis.FormData();
    form.append("file", audioBlob, "notes.webm");
    form.append("model", "whisper-1");
    const res = await fetch("https://api.openai.com/v1/audio/translations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: form,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `OpenAI error: ${res.status}`);
    }

    const data = (await res.json()) as { text?: string };
    return (data.text || "").trim();
  }

  function toggleRecording() {
    if (isRecording) stopRecording();
    else startRecording();
  }

  function validateBudget(budgetFrom: number, budgetTo: number, currency: string) {
    const minAmount = getMinAmount(currency);
    let error: string | null = null;
    if (budgetFrom < minAmount || budgetTo < minAmount) {
      error = `Minimum budget is €${minEuro} or equivalent (${minAmount.toFixed(2)} ${currency})`;
    } else if (budgetTo <= budgetFrom) {
      error = "Budget To must be greater than Budget From.";
    }
    setBudgetError(error);
    if (onBudgetError) onBudgetError(error);
    return !error;
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Budget & Requirements</h2>
        <p className="text-muted-foreground">
          Share your budget range and any additional notes or requirements
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Budget Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Budget Range
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-3">
            <FormField
              control={control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency *</FormLabel>
                  <Select onValueChange={(val) => {
                    field.onChange(val);
                    validateBudget(watch("budgetFrom"), watch("budgetTo"), val);
                  }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="transition-all duration-300 focus:shadow-elegant">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          <span className="flex items-center gap-2">
                            <span className="font-medium">{curr.symbol}</span>
                            <span>
                              {curr.name} ({curr.code})
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="budgetFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget From *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {currencies.find((c) => c.code === currency)?.symbol || "$"}
                        </span>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="pl-8 transition-all duration-300 focus:shadow-elegant"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(value);
                            validateBudget(value, watch("budgetTo"), currency);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="budgetTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget To *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {currencies.find((c) => c.code === currency)?.symbol || "$"}
                        </span>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="pl-8 transition-all duration-300 focus:shadow-elegant"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(value);
                            validateBudget(watch("budgetFrom"), value, currency);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {budgetError && (
              <div className="text-destructive text-sm font-medium mt-2">{budgetError}</div>
            )}
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Additional Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requirements or Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share any specific requirements, preferences, or notes that would help us serve you better..."
                      className="min-h-[120px] transition-all duration-300 focus:shadow-elegant"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Use voice input to add notes quickly
              </p>
              <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={toggleRecording}
                disabled={isTranscribing}
                className="flex items-center gap-2"
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    {isTranscribing ? "Transcribing..." : "Start Recording"}
                  </>
                )}
              </Button>
            </div>

            {(isRecording || isTranscribing) && (
              <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-destructive animate-pulse" : "bg-primary"}`}></div>
                <span className={`text-sm font-medium ${isRecording ? "text-destructive" : "text-primary"}`}>
                  {isRecording ? "Recording... Speak now" : "Transcribing your voice..."}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetStep;
