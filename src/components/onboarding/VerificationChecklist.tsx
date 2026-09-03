import React from 'react';
import type { VerificationStatus, VerificationCheckItem } from '../../types';
import { CheckCircle2, Clock, AlertTriangle, RefreshCcw, HelpCircle, ArrowRight } from 'lucide-react';

interface VerificationChecklistProps {
  status: VerificationStatus;
  checklistItems: VerificationCheckItem[];
  onRetryCheck?: (checkId: string) => void;
  onEditSection?: (stepIndex: number) => void;
  onFinishOnboarding: () => void;
}

export const VerificationChecklist: React.FC<VerificationChecklistProps> = ({
  status,
  checklistItems,
  onRetryCheck,
  onEditSection,
  onFinishOnboarding,
}) => {
  const getStatusHeader = () => {
    switch (status) {
      case 'VERIFIED':
        return {
          title: 'Verification Complete — Account Verified!',
          subtitle: 'Your identity and business details have passed all regulatory checks. Your profile is active.',
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          badge: 'Verified',
          icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
        };
      case 'PENDING_REVIEW':
      case 'IN_PROGRESS':
        return {
          title: 'Verification in Progress',
          subtitle: 'Our compliance team is verifying your registration number and documents. Usually takes 5-15 mins.',
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          badge: 'Pending Compliance Review',
          icon: <Clock className="w-8 h-8 text-amber-600 animate-pulse" />,
        };
      case 'FAILED':
      case 'REQUIRES_ACTION':
        return {
          title: 'Verification Requires Attention',
          subtitle: 'One or more items require correction or re-upload before approval can proceed.',
          bg: 'bg-rose-50 border-rose-200 text-rose-900',
          badge: 'Action Required',
          icon: <AlertTriangle className="w-8 h-8 text-rose-600" />,
        };
      default:
        return {
          title: 'Application Submitted',
          subtitle: 'Your profile has been queued for verification.',
          bg: 'bg-blue-50 border-blue-200 text-blue-900',
          badge: 'In Review',
          icon: <Clock className="w-8 h-8 text-blue-600" />,
        };
    }
  };

  const header = getStatusHeader();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Banner */}
      <div className={`border rounded-xl p-6 flex items-start gap-4 ${header.bg}`}>
        <div className="shrink-0">{header.icon}</div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{header.title}</h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 border border-current shadow-2xs">
              {header.badge}
            </span>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">{header.subtitle}</p>
        </div>
      </div>

      {/* Checklist items */}
      <div className="fintech-card p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Verification Checklist Progress
        </h3>

        <div className="divide-y divide-slate-100">
          {checklistItems.map((item) => {
            const isDone = item.status === 'VERIFIED';
            const isPending = item.status === 'PENDING';
            const isFailed = item.status === 'FAILED' || item.status === 'REQUIRES_ACTION';

            return (
              <div key={item.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isDone && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {isPending && <Clock className="w-5 h-5 text-amber-500" />}
                    {isFailed && <AlertTriangle className="w-5 h-5 text-rose-600" />}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600">{item.description}</p>
                    {isFailed && item.failureReason && (
                      <p className="text-xs font-medium text-rose-700 mt-1 bg-rose-50 p-2 rounded border border-rose-200">
                        Reason: {item.failureReason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isDone && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      Verified
                    </span>
                  )}
                  {isPending && (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      In Review
                    </span>
                  )}
                  {isFailed && (
                    <div className="flex items-center gap-2">
                      {onRetryCheck && (
                        <button
                          onClick={() => onRetryCheck(item.id)}
                          className="btn-secondary text-xs py-1 px-2.5 flex items-center gap-1"
                        >
                          <RefreshCcw className="w-3 h-3 text-slate-500" />
                          <span>Retry</span>
                        </button>
                      )}
                      {onEditSection && (
                        <button
                          onClick={() => onEditSection(2)}
                          className="btn-secondary text-xs py-1 px-2.5"
                        >
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps / Dashboard Action */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => alert('Support helpline: compliance@dealmaker.ng or +234 1 800 DEAL')}
          className="btn-secondary text-xs flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Contact Compliance Support</span>
        </button>

        <button onClick={onFinishOnboarding} className="btn-primary flex items-center gap-2">
          <span>Go to Account Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
