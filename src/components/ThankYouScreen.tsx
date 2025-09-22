import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";

const ThankYouScreen: React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-12 bg-gradient-to-br from-primary/10 to-background rounded-xl">
      <CheckCircle2 className="w-16 h-16 text-primary mb-4 animate-bounce" />
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
        Thank You!
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground mb-6 text-center max-w-md">
        Your handpick request has been submitted successfully.<br />
        We appreciate your interest and will contact you soon!
      </p>
      <Button
        variant="luxury"
        size="lg"
        className="flex items-center gap-2 luxury-hover"
        onClick={() => window.top.location.href = 'https://www.riaajvintage.com/'}
      >
        <ArrowLeft className="w-5 h-5" />
        Return to Home
      </Button>
    </div>
  );
};

export default ThankYouScreen;