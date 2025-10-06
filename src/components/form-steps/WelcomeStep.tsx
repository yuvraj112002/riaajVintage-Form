import React from 'react';
import { Play } from 'lucide-react';
import logo from "/photo.png";
const WelcomeStep: React.FC = () => {
  return (
    <div className="space-y-6">


      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome to Riaaj Vintage — Handpick
            </h2>
            <p className="text-muted-foreground mb-8">
              Tell us what you need. We'll tailor the perfect bundle for you.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              What this form does
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-foreground">Collect your contact & product preferences.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-foreground">Capture budget and notes (type or speak!).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-foreground">Pick a schedule for a quick call.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-foreground">Review & submit — we receive it on WhatsApp and email.</span>
              </li>
            </ul>
          </div>
        </div>
        <div className=" bg-neutral-900 flex items-center justify-center relative overflow-hidden h-full  rounded-[1rem]">

          <img src={logo} alt="Logo" className='absolute inset-0 w-full h-full object-cover rounded-[1rem]' />
          {/* <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900"></div>
          <div className="relative z-10 text-center">
            <Play className="w-12 h-12 text-white mx-auto mb-2" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
              <span>0:00</span>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M13.828 7.172a1 1 0 011.414 0A5.983 5.983 0 0117 12a5.983 5.983 0 01-1.758 4.828 1 1 0 01-1.414-1.414A3.987 3.987 0 0015 12a3.987 3.987 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;