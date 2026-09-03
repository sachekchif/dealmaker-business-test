import React from 'react';
import type { BusinessStructure } from '../../types';
import { Building2, FileCheck2, Users, Landmark, User, Sparkles } from 'lucide-react';

interface BusinessTypeSelectorProps {
  selectedType: BusinessStructure | null;
  onSelectType: (type: BusinessStructure) => void;
}

export const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const structures: {
    id: BusinessStructure;
    title: string;
    description: string;
    cacRequired: boolean;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'REGISTERED_BUSINESS_NAME',
      title: 'Registered Business Name',
      description: 'CAC Business Name registration (BN Number). Common for small businesses and sole proprietors.',
      cacRequired: true,
      icon: <FileCheck2 className="w-5 h-5 text-blue-600" />,
    },
    {
      id: 'LIMITED_LIABILITY',
      title: 'Limited Liability Company (Ltd / LLC)',
      description: 'Incorporated company with CAC RC number, directors, shareholders, and Memorandum of Association.',
      cacRequired: true,
      icon: <Building2 className="w-5 h-5 text-indigo-600" />,
    },
    {
      id: 'PARTNERSHIP',
      title: 'Partnership / LLP',
      description: 'Business entity owned by two or more partners. Requires Partnership Deed and identity proof.',
      cacRequired: true,
      icon: <Users className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: 'PLC_CORPORATE',
      title: 'PLC / Public Limited Company',
      description: 'Large public corporation, financial institute, or multinational corporate entity.',
      cacRequired: true,
      icon: <Landmark className="w-5 h-5 text-purple-600" />,
    },
    {
      id: 'SOLE_PROPRIETORSHIP',
      title: 'Sole Proprietorship (Unregistered)',
      description: 'Individual operating under a business brand without formal CAC registration.',
      cacRequired: false,
      icon: <User className="w-5 h-5 text-amber-600" />,
    },
    {
      id: 'OTHER',
      title: 'Other Entity Structure',
      description: 'NGOs, Cooperative Societies, Incorporated Trustees, or custom business structures.',
      cacRequired: false,
      icon: <Sparkles className="w-5 h-5 text-slate-600" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Select Business Structure</h2>
        <p className="text-sm text-slate-600">
          Forms and verification requirements will dynamically adapt based on your selected business structure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {structures.map((item) => {
          const isSelected = selectedType === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onSelectType(item.id)}
              className={`fintech-card p-5 cursor-pointer flex items-start gap-4 transition-all ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20'
                  : 'hover:border-slate-300'
              }`}
            >
              <div className="p-2.5 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  {item.cacRequired ? (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      CAC Required
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      No CAC Doc
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
