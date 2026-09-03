import React, { useState } from 'react';
import type { KybPerson, DirectorRole, GovtIdType } from '../../types/kyb';
import { KybPersonCard } from './KybPersonCard';
import { KybOwnershipSummary } from './KybOwnershipSummary';
import { KybService } from '../../services/kybService';
import { Users, Plus, ShieldCheck, ArrowRight, ArrowLeft, X, Upload } from 'lucide-react';

interface Step3OwnershipDirectorsFormProps {
  persons: KybPerson[];
  onChange: (updatedPersons: KybPerson[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3OwnershipDirectorsForm: React.FC<Step3OwnershipDirectorsFormProps> = ({
  persons,
  onChange,
  onNext,
  onBack,
}) => {
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState<string | null>(null);

  // Modal Form State
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('Nigerian');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<DirectorRole>('DIRECTOR_SHAREHOLDER');
  const [ownershipPercentage, setOwnershipPercentage] = useState<number>(50);
  const [govtIdType, setGovtIdType] = useState<GovtIdType>('NIN');
  const [govtIdNumber, setGovtIdNumber] = useState('');
  const [uploadedIdFileName, setUploadedIdFileName] = useState<string | undefined>();

  const totalPercentage = KybService.calculateTotalOwnership(persons);

  const resetForm = () => {
    setFullName('');
    setDob('');
    setNationality('Nigerian');
    setResidentialAddress('');
    setPhoneNumber('');
    setEmail('');
    setRole('DIRECTOR_SHAREHOLDER');
    setOwnershipPercentage(20);
    setGovtIdType('NIN');
    setGovtIdNumber('');
    setUploadedIdFileName(undefined);
    setEditingPersonId(null);
  };

  const handleOpenEdit = (p: KybPerson) => {
    setEditingPersonId(p.id);
    setFullName(p.fullName);
    setDob(p.dateOfBirth);
    setNationality(p.nationality);
    setResidentialAddress(p.residentialAddress);
    setPhoneNumber(p.phoneNumber);
    setEmail(p.email);
    setRole(p.role);
    setOwnershipPercentage(p.ownershipPercentage || 0);
    setGovtIdType(p.govtIdType);
    setGovtIdNumber(p.govtIdNumber);
    setUploadedIdFileName(p.identityDocName);
    setShowPersonModal(true);
  };

  const handleSavePerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !govtIdNumber || !email) {
      alert('Please fill in mandatory name, email, and government ID details.');
      return;
    }

    const newPerson: KybPerson = {
      id: editingPersonId || `person-${Date.now()}`,
      fullName,
      dateOfBirth: dob || '1990-01-01',
      nationality,
      residentialAddress,
      phoneNumber,
      email,
      role,
      ownershipPercentage: Number(ownershipPercentage) || 0,
      govtIdType,
      govtIdNumber,
      identityDocName: uploadedIdFileName || `${fullName.replace(/\s+/g, '_')}_ID.pdf`,
      identityVerificationStatus: 'VERIFIED',
    };

    if (editingPersonId) {
      onChange(persons.map((p) => (p.id === editingPersonId ? newPerson : p)));
    } else {
      onChange([...persons, newPerson]);
    }

    setShowPersonModal(false);
    resetForm();
  };

  const handleRemovePerson = (id: string) => {
    onChange(persons.filter((p) => p.id !== id));
  };

  const handleSubmitStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (persons.length === 0) {
      alert('Please add at least 1 Director or Beneficial Owner to proceed.');
      return;
    }
    if (totalPercentage !== 100) {
      alert(`Shareholder ownership total is ${totalPercentage}%. It must equal exactly 100%.`);
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmitStep} className="space-y-8 max-w-4xl mx-auto">
      {/* Header Info Banner */}
      <div className="fintech-card p-5 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#00a3d9] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
          <Users className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">Step 3 — Ownership, Directors & UBO Control</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Declare all directors, major shareholders, and Ultimate Beneficial Owners (UBOs) holding 5% or more controlling equity in the business.
          </p>
        </div>
      </div>

      {/* Real-time Ownership Calculation Summary */}
      <KybOwnershipSummary
        totalPercentage={totalPercentage}
        personCount={persons.length}
      />

      {/* Person Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Listed Directors & Beneficial Owners ({persons.length})</h3>

          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowPersonModal(true);
            }}
            className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Director / Shareholder</span>
          </button>
        </div>

        {persons.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-300 space-y-2 text-xs text-slate-500">
            <Users className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-bold text-slate-800">No Directors or Shareholders Added Yet</p>
            <p>Click "Add Director / Shareholder" above to enter company ownership details.</p>
          </div>
        ) : (
          persons.map((p) => (
            <KybPersonCard
              key={p.id}
              person={p}
              onEdit={() => handleOpenEdit(p)}
              onRemove={() => handleRemovePerson(p.id)}
            />
          ))
        )}
      </div>

      {/* Add / Edit Person Modal */}
      {showPersonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-[#e8f4fb] border-b border-[#d0e7f7] text-slate-900 p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 font-bold text-base">
                <Users className="w-5 h-5 text-[#00a3d9]" />
                <span>{editingPersonId ? 'Edit Director / Shareholder' : 'Add Director / Shareholder'}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowPersonModal(false);
                  resetForm();
                }}
                className="text-slate-500 hover:text-slate-900 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Explanatory callout for ID verification */}
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00a3d9] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Why we collect this information:</strong> We use this information to verify the identity of individuals who own or control the business in compliance with CBN KYB and Anti-Money Laundering regulations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="fintech-label">Full Legal Name (Matching ID) *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Amina Bello"
                    className="fintech-input"
                  />
                </div>

                <div>
                  <label className="fintech-label">Role in Business *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as DirectorRole)}
                    className="fintech-input"
                  >
                    <option value="DIRECTOR_SHAREHOLDER">Director & Shareholder</option>
                    <option value="DIRECTOR">Director Only</option>
                    <option value="SHAREHOLDER">Shareholder Only</option>
                    <option value="BENEFICIAL_OWNER">Ultimate Beneficial Owner (UBO)</option>
                    <option value="OTHER">Other Executive</option>
                  </select>
                </div>

                <div>
                  <label className="fintech-label">Shareholder Ownership Percentage (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={ownershipPercentage}
                    onChange={(e) => setOwnershipPercentage(Number(e.target.value))}
                    placeholder="e.g. 60"
                    className="fintech-input font-mono"
                  />
                </div>

                <div>
                  <label className="fintech-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@dealmaker.ng"
                    className="fintech-input"
                  />
                </div>

                <div>
                  <label className="fintech-label">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="fintech-input"
                  />
                </div>

                <div>
                  <label className="fintech-label">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="fintech-input"
                  />
                </div>

                <div>
                  <label className="fintech-label">Nationality *</label>
                  <input
                    type="text"
                    required
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="Nigerian"
                    className="fintech-input"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="fintech-label">Residential Address *</label>
                  <input
                    type="text"
                    required
                    value={residentialAddress}
                    onChange={(e) => setResidentialAddress(e.target.value)}
                    placeholder="e.g. 8 Lekki Phase 1, Lagos State"
                    className="fintech-input"
                  />
                </div>

                {/* Identity Verification Sub-Section */}
                <div className="sm:col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00a3d9]" />
                    <span>Government Identity Verification</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="fintech-label">Government ID Type *</label>
                      <select
                        value={govtIdType}
                        onChange={(e) => setGovtIdType(e.target.value as GovtIdType)}
                        className="fintech-input"
                      >
                        <option value="NIN">National Identity Number (NIN Slip)</option>
                        <option value="PASSPORT">International Passport</option>
                        <option value="DRIVERS_LICENSE">Driver's Licence</option>
                        <option value="VOTERS_CARD">Permanent Voter's Card (PVC)</option>
                        <option value="OTHER">Other Supported Govt ID</option>
                      </select>
                    </div>

                    <div>
                      <label className="fintech-label">Government ID Number *</label>
                      <input
                        type="text"
                        required
                        value={govtIdNumber}
                        onChange={(e) => setGovtIdNumber(e.target.value)}
                        placeholder="e.g. 10928374651"
                        className="fintech-input font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="fintech-label">Upload Government ID Document (PDF / Image) *</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => e.target.files?.[0] && setUploadedIdFileName(e.target.files[0].name)}
                        className="hidden"
                        id="person-id-upload"
                      />
                      <label
                        htmlFor="person-id-upload"
                        className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose ID File</span>
                      </label>
                      <span className="text-[11px] text-slate-600 font-mono">
                        {uploadedIdFileName || 'No document selected'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setShowPersonModal(false);
                  resetForm();
                }}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePerson}
                className="btn-primary text-xs"
              >
                {editingPersonId ? 'Save Changes' : 'Add Person to Ownership List'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 2</span>
        </button>

        <button
          type="submit"
          disabled={persons.length === 0 || totalPercentage !== 100}
          className={`btn-primary text-xs py-2.5 px-6 flex items-center gap-2 ${
            persons.length === 0 || totalPercentage !== 100 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span>Continue to Step 4: Representative</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
