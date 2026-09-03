import React from 'react';
import { KybVerificationWizard } from '../kyb/KybVerificationWizard';

interface RetailBusinessVerificationFlowProps {
  userEmail: string;
  userName: string;
  onComplete: () => void;
}

export const RetailBusinessVerificationFlow: React.FC<RetailBusinessVerificationFlowProps> = ({
  onComplete,
}) => {
  return (
    <div className="space-y-6">
      <KybVerificationWizard
        initialViewMode="wizard"
        onComplete={onComplete}
        onGoToDashboard={onComplete}
      />
    </div>
  );
};
