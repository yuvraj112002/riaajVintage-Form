import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Gift, Calendar } from "lucide-react";

const ThankYouScreen: React.FC = () => {

  return (
    <div className="h-screen bg-[#EBF1DB] px-4 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-2xl">
        {/* Main Card Container */}
        <div className="bg-white rounded-lg shadow-card p-6 sm:p-8 md:p-12 text-center">
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#1E5846]/10 rounded-full animate-pulse" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
              <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-[#1E5846] animate-bounce relative z-10" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E5846] mb-2">
            Thank You!
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 leading-snug">
            Your handpick request has been submitted successfully.<br className="hidden sm:inline" />
            We appreciate your interest and will contact you soon!
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {/* WhatsApp Card */}
            <div className="bg-[#EBF1DB] rounded p-2 sm:p-3">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-[#1E5846] mx-auto mb-1" />
              <h3 className="font-semibold text-xs sm:text-sm text-[#1E5846] mb-0.5 line-clamp-1">WhatsApp</h3>
              <p className="text-[0.625rem] sm:text-xs text-gray-600 line-clamp-1">We'll contact you</p>
            </div>

            {/* Curated Selection Card */}
            <div className="bg-[#EBF1DB] rounded p-2 sm:p-3">
              <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-[#1E5846] mx-auto mb-1" />
              <h3 className="font-semibold text-xs sm:text-sm text-[#1E5846] mb-0.5 line-clamp-1">Curated</h3>
              <p className="text-[0.625rem] sm:text-xs text-gray-600 line-clamp-1">Handpicked items</p>
            </div>

            {/* Schedule Card */}
            <div className="bg-[#EBF1DB] rounded p-2 sm:p-3">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-[#1E5846] mx-auto mb-1" />
              <h3 className="font-semibold text-xs sm:text-sm text-[#1E5846] mb-0.5 line-clamp-1">Scheduled</h3>
              <p className="text-[0.625rem] sm:text-xs text-gray-600 line-clamp-1">Date confirmed</p>
            </div>
          </div>

          {/* Return Button */}
          <Button
            size="sm"
            className="bg-[#1E5846] hover:bg-[#1E5846]/90 text-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            onClick={() => window.top.location.href = 'https://www.riaajvintage.com/'}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;