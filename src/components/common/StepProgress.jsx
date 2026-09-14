import React from 'react';

export default function StepProgress({
  sections = [],
  currentStep = 1,
  onStepClick
}) {
  const total = sections.length || 16;
  const progressPercent = Math.min(Math.round((currentStep / total) * 100), 100);

  return (
    <div className="bg-white border-b border-slate-200 sticky top-[65px] z-20 shadow-sm">
      {/* Thin animated progress bar */}
      <div className="h-1 w-full bg-slate-100">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Numbers Container */}
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {sections.map((sec, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <button
                key={sec.id || idx}
                type="button"
                onClick={() => onStepClick && onStepClick(stepNum)}
                title={`Step ${stepNum}: ${sec.title}`}
                className={`shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                    : isCompleted
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {stepNum}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
