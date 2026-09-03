import React from 'react';
import { ArrowLeft, Save, Check } from 'lucide-react';

export interface StepItem {
  id: number;
  label: string;
  shortLabel: string;
  isComplete: boolean;
  isCurrent: boolean;
}

interface OnboardingStepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
  onSaveDraft: () => void;
  onBack?: () => void;
  saveMessage?: string | null;
}

export const OnboardingStepper: React.FC<OnboardingStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  onSaveDraft,
  onBack,
  saveMessage,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-20 z-30 py-3.5 px-4 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Step Items Pill Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {onBack && currentStep > 1 && (
            <button
              onClick={onBack}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 flex items-center gap-1 shrink-0 mr-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          {steps.map((step, idx) => {
            const isDone = step.isComplete;
            const isCurrent = step.isCurrent;

            return (
              <React.Fragment key={step.id}>
                {idx > 0 && (
                  <div className={`h-0.5 w-6 shrink-0 ${isDone ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                )}
                <button
                  onClick={() => isDone && onStepClick(step.id)}
                  disabled={!isDone && !isCurrent}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-[#00a3d9] text-white shadow-xs font-bold'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-pointer'
                      : 'bg-slate-100 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-white text-[#00a3d9]'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    {isDone ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : step.id}
                  </span>
                  <span>{step.shortLabel}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Actions & Draft Save */}
        <div className="flex items-center gap-3 shrink-0">
          {saveMessage && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 animate-fade-in">
              {saveMessage}
            </span>
          )}
          <button
            onClick={onSaveDraft}
            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            <span>Save Application Draft</span>
          </button>
        </div>
      </div>
    </div>
  );
};
