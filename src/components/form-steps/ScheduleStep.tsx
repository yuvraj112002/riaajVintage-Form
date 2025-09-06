import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../HandpickForm';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Clock, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const timezones = [
  'GMT-12:00 (Baker Island)',
  'GMT-11:00 (Samoa)',
  'GMT-10:00 (Hawaii)',
  'GMT-09:00 (Alaska)',
  'GMT-08:00 (Pacific)',
  'GMT-07:00 (Mountain)',
  'GMT-06:00 (Central)',
  'GMT-05:00 (Eastern)',
  'GMT-04:00 (Atlantic)',
  'GMT-03:00 (Argentina)',
  'GMT-02:00 (South Georgia)',
  'GMT-01:00 (Cape Verde)',
  'GMT+00:00 (UTC)',
  'GMT+01:00 (Central European)',
  'GMT+02:00 (Eastern European)',
  'GMT+03:00 (Moscow)',
  'GMT+04:00 (Gulf)',
  'GMT+05:00 (Pakistan)',
  'GMT+05:30 (India)',
  'GMT+06:00 (Bangladesh)',
  'GMT+07:00 (Thailand)',
  'GMT+08:00 (China)',
  'GMT+09:00 (Japan)',
  'GMT+10:00 (Australia Eastern)',
  'GMT+11:00 (Solomon Islands)',
  'GMT+12:00 (New Zealand)'
];

// Generate time slots (30-minute intervals from 9 AM to 6 PM)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      slots.push({ value: time, display: displayTime });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const ScheduleStep: React.FC = () => {
  const { control, watch } = useFormContext<FormData>();
  const selectedDate = watch('date');

  const isDateDisabled = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Disable past dates
  if (date < today) {
    return true;
  }

  // Disable Saturday (6) and Sunday (0)
  const day = date.getDay();
  if (day === 0 ) {
    return true;
  }

  return false;
};

  const getAvailableTimeSlots = () => {
    if (!selectedDate) return timeSlots;
    
    const today = new Date();
    const isToday = selectedDate.toDateString() === today.toDateString();
    
    if (!isToday) return timeSlots;
    
    // Filter out past time slots for today
    const currentTime = today.getHours() * 60 + today.getMinutes();
    return timeSlots.filter(slot => {
      const [hour, minute] = slot.value.split(':').map(Number);
      const slotTime = hour * 60 + minute;
      return slotTime > currentTime + 30; // Allow 30 minutes buffer
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Schedule Consultation</h2>
        <p className="text-muted-foreground">
          Choose a convenient date and time for your handpick consultation
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Consultation Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal transition-all duration-300 focus:shadow-elegant",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={isDateDisabled}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Time and Timezone Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Time & Timezone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={control}
              name="scheduleTimezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Timezone *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="transition-all duration-300 focus:shadow-elegant">
                        <SelectValue placeholder="Select your timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone} value={timezone}>
                          {timezone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time Slot *
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={!selectedDate}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-all duration-300 focus:shadow-elegant">
                        <SelectValue 
                          placeholder={
                            !selectedDate 
                              ? "Select a date first" 
                              : "Select time slot"
                          } 
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getAvailableTimeSlots().map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.display}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedDate && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-medium text-primary mb-2">Consultation Details</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Duration: 30 minutes</p>
                  <p>Format: Video call or phone</p>
                  <p>We'll send you meeting details via email</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {getAvailableTimeSlots().length === 0 && selectedDate && (
        <Card className="shadow-card border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Clock className="w-8 h-8 text-destructive mx-auto" />
              <h3 className="font-medium text-destructive">No Available Time Slots</h3>
              <p className="text-sm text-muted-foreground">
                All time slots for today have passed. Please select a future date.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScheduleStep;