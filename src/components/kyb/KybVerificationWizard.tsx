import React, { useState, useEffect } from 'react';
import type { KybVerificationData } from '../../types/kyb';
import { KybService } from '../../services/kybService';
import { KybStepper } from './KybStepper';
import { Step1BusinessInfoForm } from './Step1BusinessInfoForm';
import { Step2BusinessDocumentsForm } from './Step2BusinessDocumentsForm';
import { Step3OwnershipDirectorsForm } from './Step3OwnershipDirectorsForm';
import { Step4AuthorizedRepresentativeForm } from './Step4AuthorizedRepresentativeForm';
import { Step5ComplianceSection } from './Step5ComplianceSection';
import { Step6ReviewSubmitSection } from './Step6ReviewSubmitSection';
import { KybSubmissionSuccessView } from './KybSubmissionSuccessView';
import { KybVerificationStatusView } from './KybVerificationStatusView';

interface KybVerificationWizardProps {
  initialViewMode?: 'wizard' | 'status';
  onComplete?: () => void;
  onGoToDashboard?: () => void;
}

export const KybVerificationWizard: React.FC<KybVerificationWizardProps> = ({
  initialViewMode = 'wizard',
  onComplete,
  onGoToDashboard,
}) => {
  const [kybData, setKybData] = useState<KybVerificationData>(KybService.loadDraft());
  const [viewMode, setViewMode] = useState<'wizard' | 'success' | 'status'>(initialViewMode);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    KybService.saveDraft(kybData);
  }, [kybData]);

  const handleSaveProgress = () => {
    KybService.saveDraft(kybData);
    setSaveMessage('KYB progress saved cleanly');
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    const nextStep = Math.min(6, stepId + 1);
    setKybData((prev) => ({ ...prev, currentStep: nextStep }));
  };

  const handleFinalSubmission = () => {
    const submittedData: KybVerificationData = {
      ...kybData,
      overallStatus: 'UNDER_REVIEW',
      submittedAt: new Date().toISOString(),
    };
    setKybData(submittedData);
    KybService.saveDraft(submittedData);
    setViewMode('success');
  };

  return (
    <div className="space-y-6">
      {/* VIEWMODE 1: SUCCESS CONFIRMATION RECEIPT */}
      {viewMode === 'success' && (
        <KybSubmissionSuccessView
          referenceNumber={kybData.referenceNumber}
          businessName={kybData.businessDetails.registeredName}
          onGoToDashboard={() => onGoToDashboard ? onGoToDashboard() : setViewMode('status')}
          onViewStatus={() => setViewMode('status')}
        />
      )}

      {/* VIEWMODE 2: DEDICATED VERIFICATION STATUS TRACKER */}
      {viewMode === 'status' && (
        <KybVerificationStatusView
          data={kybData}
          onStartVerification={() => {
            setKybData((prev) => ({ ...prev, overallStatus: 'IN_PROGRESS' }));
            setViewMode('wizard');
          }}
          onFixDocument={() => {
            setKybData((prev) => ({ ...prev, currentStep: 2 }));
            setViewMode('wizard');
          }}
          onResubmit={() => {
            setKybData((prev) => ({ ...prev, currentStep: 1, overallStatus: 'IN_PROGRESS' }));
            setViewMode('wizard');
          }}
          onGoToDashboard={() => onGoToDashboard ? onGoToDashboard() : onComplete?.()}
        />
      )}

      {/* VIEWMODE 3: MULTI-STEP WIZARD */}
      {viewMode === 'wizard' && (
        <div className="space-y-6">
          <KybStepper
            currentStep={kybData.currentStep}
            completedSteps={completedSteps}
            onSelectStep={(stepId) => setKybData((prev) => ({ ...prev, currentStep: stepId }))}
            onSaveDraft={handleSaveProgress}
            onBack={kybData.currentStep > 1 ? () => setKybData((prev) => ({ ...prev, currentStep: prev.currentStep - 1 })) : undefined}
            saveMessage={saveMessage}
          />

          <div className="py-4">
            {kybData.currentStep === 1 && (
              <Step1BusinessInfoForm
                data={kybData.businessDetails}
                onChange={(updatedDetails) => setKybData({ ...kybData, businessDetails: updatedDetails })}
                onNext={() => handleStepComplete(1)}
              />
            )}

            {kybData.currentStep === 2 && (
              <Step2BusinessDocumentsForm
                documents={kybData.documents}
                onChange={(updatedDocs) => setKybData({ ...kybData, documents: updatedDocs })}
                onNext={() => handleStepComplete(2)}
                onBack={() => setKybData({ ...kybData, currentStep: 1 })}
              />
            )}

            {kybData.currentStep === 3 && (
              <Step3OwnershipDirectorsForm
                persons={kybData.persons}
                onChange={(updatedPersons) => setKybData({ ...kybData, persons: updatedPersons })}
                onNext={() => handleStepComplete(3)}
                onBack={() => setKybData({ ...kybData, currentStep: 2 })}
              />
            )}

            {kybData.currentStep === 4 && (
              <Step4AuthorizedRepresentativeForm
                data={kybData.authorizedRepresentative}
                onChange={(updatedRep) => setKybData({ ...kybData, authorizedRepresentative: updatedRep })}
                onNext={() => handleStepComplete(4)}
                onBack={() => setKybData({ ...kybData, currentStep: 3 })}
              />
            )}

            {kybData.currentStep === 5 && (
              <Step5ComplianceSection
                data={kybData.compliance}
                onChange={(updatedCompliance) => setKybData({ ...kybData, compliance: updatedCompliance })}
                onNext={() => handleStepComplete(5)}
                onBack={() => setKybData({ ...kybData, currentStep: 4 })}
              />
            )}

            {kybData.currentStep === 6 && (
              <Step6ReviewSubmitSection
                data={kybData}
                onChange={(updatedData) => setKybData(updatedData)}
                onGoToStep={(stepId) => setKybData({ ...kybData, currentStep: stepId })}
                onSubmit={handleFinalSubmission}
                onSaveAndExit={() => {
                  handleSaveProgress();
                  setViewMode('status');
                }}
                onBack={() => setKybData({ ...kybData, currentStep: 5 })}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
