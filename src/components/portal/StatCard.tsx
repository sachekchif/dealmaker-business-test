import React, { useState } from 'react';
import { MoreVertical, RefreshCw, ExternalLink } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  currency?: string;
  subtitle?: string;
  isCurrency?: boolean;
  onRefresh?: () => void;
  onViewDetails?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  currency = '₦',
  subtitle,
  isCurrency = false,
  onRefresh,
  onViewDetails,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="dealmaker-stat-card flex flex-col justify-between h-full min-h-[125px] relative">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">{title}</span>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20 text-xs">
              {onRefresh && (
                <button
                  onClick={() => {
                    onRefresh();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <RefreshCw className="w-3 h-3 text-[#00a3d9]" />
                  <span>Refresh</span>
                </button>
              )}
              {onViewDetails && (
                <button
                  onClick={() => {
                    onViewDetails();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <ExternalLink className="w-3 h-3 text-[#00a3d9]" />
                  <span>View Details</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mt-2 mb-1">
        <span className="text-3xl font-bold text-slate-900 tracking-tight">
          {isCurrency && typeof value === 'number' ? `${currency}${value.toLocaleString()}` : value}
        </span>
      </div>

      {/* Subtitle Information */}
      {subtitle && (
        <div className="text-xs text-slate-500 font-medium truncate pt-1 border-t border-slate-200/40">
          {subtitle}
        </div>
      )}
    </div>
  );
};
