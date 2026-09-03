import React from 'react';
import type { KybPerson } from '../../types/kyb';
import { ShieldCheck, Edit3, Trash2, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';

interface KybPersonCardProps {
  person: KybPerson;
  onEdit: () => void;
  onRemove: () => void;
}

export const KybPersonCard: React.FC<KybPersonCardProps> = ({
  person,
  onEdit,
  onRemove,
}) => {
  const roleLabel =
    person.role === 'DIRECTOR_SHAREHOLDER'
      ? 'Director & Shareholder'
      : person.role === 'DIRECTOR'
      ? 'Director'
      : person.role === 'SHAREHOLDER'
      ? 'Shareholder'
      : person.role === 'BENEFICIAL_OWNER'
      ? 'Beneficial Owner'
      : 'Executive / Other';

  return (
    <div className="fintech-card p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#00a3d9] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {person.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-xs font-bold text-slate-900">{person.fullName}</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-50 text-[#00a3d9] border border-cyan-200">
                {roleLabel}
              </span>
              {person.ownershipPercentage !== undefined && (
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#e8f4fb] text-slate-900 border border-[#d0e7f7] font-mono">
                  {person.ownershipPercentage}% Ownership
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">Nationality: {person.nationality}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Identity Verified ({person.govtIdType})
          </span>

          <button
            type="button"
            onClick={onEdit}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md"
            title="Edit details"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md"
            title="Remove person"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{person.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{person.phoneNumber}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>DOB: {person.dateOfBirth}</span>
        </div>

        <div className="flex items-center gap-2 sm:col-span-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{person.residentialAddress}</span>
        </div>

        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-mono text-[11px]">{person.govtIdType}: {person.govtIdNumber}</span>
        </div>
      </div>
    </div>
  );
};
