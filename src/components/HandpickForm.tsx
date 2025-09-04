import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import step components
import WelcomeStep from './form-steps/WelcomeStep';
import ContactStep from './form-steps/ContactStep';
import ProductStep from './form-steps/ProductStep';
import BudgetStep from './form-steps/BudgetStep';
import ScheduleStep from './form-steps/ScheduleStep';
import ReviewStep from './form-steps/ReviewStep';
import { sendHandpickEmail } from './sendEmail';

// Form schema
const formSchema = z.object({
  // Contact details
  name: z.string().min(1, 'Name is required'),
  whatsapp: z.string().min(1, 'WhatsApp number is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  // businessType: z.string().min(1, 'Business type is required'),
  region: z.string().min(1, 'Region is required'),
  timezone: z.string().min(1, 'Timezone is required'),

  // Product details
  // brands: z.array(z.string()).min(1, 'At least one brand must be selected'),
  customBrand: z.string().optional(),
  categories: z.array(z.object({
    name: z.string(),
    grade: z.string(),
    size: z.string(),
    color: z.string(),
    quantity: z.number().min(1),
    description: z.string().optional()
  })).min(1, 'At least one category must be added'),

  // Budget
  currency: z.string().min(1, 'Currency is required'),
  budgetFrom: z.number().min(0, 'Budget from must be positive'),
  budgetTo: z.number().min(0, 'Budget to must be positive'),
  notes: z.string().optional(),

  // Schedule
  date: z.date({ message: 'Date is required' }),
  timeSlot: z.string().min(1, 'Time slot is required'),
  scheduleTimezone: z.string().min(1, 'Timezone is required'),

  // Consent
  consent: z.boolean().refine(val => val === true, 'You must agree to proceed')
});

export type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: 'Welcome', component: WelcomeStep },
  { id: 2, title: 'Contact', component: ContactStep },
  { id: 3, title: 'Products', component: ProductStep },
  { id: 4, title: 'Budget', component: BudgetStep },
  { id: 5, title: 'Schedule', component: ScheduleStep },
  { id: 6, title: 'Review', component: ReviewStep },
];

const HandpickForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      // brands: [],
      categories: [],
      budgetFrom: 0,
      budgetTo: 0,
      consent: false
    }
  });

  const getStepFields = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 2: // Contact Step
        return ['name', 'whatsapp', 'email', 'region', 'timezone'];
      case 3: // Product Step
        return ['categories'];
      case 4: // Budget Step
        return ['currency', 'budgetFrom', 'budgetTo'];
      case 5: // Schedule Step
        return ['date', 'timeSlot', 'scheduleTimezone'];
      case 6: // Review Step
        return ['consent'];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    if (currentStep < steps.length) {
      // Validate current step fields before proceeding
      const fieldsToValidate = getStepFields(currentStep);

      if (fieldsToValidate.length > 0) {
        const isValid = await methods.trigger(fieldsToValidate);

        if (!isValid) {
          toast({
            title: "Validation Error",
            description: "Please fix the errors in the form before proceeding.",
            variant: "destructive",
          });
          return;
        }
      }

      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    
    setIsSubmitting(true);
    try {
      // Here you would integrate with EmailJS
    

      // Simulate API call
      await sendHandpickEmail(data)

      toast({
        title: "Form Submitted Successfully!",
        description: "We'll be in touch soon to confirm your handpick selection.",
      });


    } catch (error) {
      console.log(error, "error");
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Riaaj Vintage — Handpick Request
          </h1>
          <p className="text-muted-foreground text-lg">
            A clean, responsive, step-by-step form built with React + Tailwind.
          </p>
        </div>

        {/* Progress Stepper */}


        <div className="mb-8">
          <div
            className="
      flex items-center relative
      -mx-1 px-1 sm:-mx-2 sm:px-2
      overflow-hidden
      /* keep items on one line and allow scroll on tiny screens */
      flex-nowrap  sm:overflow-x-visible
    "
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center flex-none">
                  <div
                    className={`
              w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
              text-xs sm:text-sm font-semibold border-2 flex-none
              ${index + 1 === currentStep
                        ? 'bg-luxury text-luxury-foreground border-luxury'
                        : index + 1 < currentStep
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-muted-foreground border-muted'
                      }
            `}
                  >
                    {step.id}
                  </div>

                  {/* Hide title on small screens */}
                  <span
                    className={`
              hidden sm:inline-block
              ml-3 text-sm font-medium whitespace-nowrap
              ${index + 1 === currentStep ? 'text-foreground' : 'text-muted-foreground'}
            `}
                  >
                    {step.title}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-4 h-px bg-border"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>



        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(
            onSubmit,
            (errors) => {
              console.log(errors);
            }
          )}>
            <Card className="shadow-card border-0 bg-card/95 backdrop-blur-sm">
              <CardContent className="md:p-8">
                <div className="animate-step-in">
                  <CurrentStepComponent />
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </Button>
                  )}

                  <div className="ml-auto">
                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        variant="luxury"
                        onClick={nextStep}
                        className="flex items-center gap-2 luxury-hover"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="luxury"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 luxury-hover"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default HandpickForm;