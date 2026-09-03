import React, { useState } from 'react';
import type { LinkedUserItem } from '../../types';
import { Search, Filter, Calendar } from 'lucide-react';

interface LinkedUsersTableProps {
  users: LinkedUserItem[];
}

export const LinkedUsersTable: React.FC<LinkedUsersTableProps> = ({ users }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="fintech-card overflow-hidden space-y-4 p-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user name or email..."
            className="fintech-input pl-9 py-1.5 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="fintech-input py-1.5 text-xs w-36"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Users</option>
            <option value="INACTIVE">Inactive Users</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <th className="p-3">User Details</th>
              <th className="p-3">Onboarded Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Transactions Total</th>
              <th className="p-3 text-right">Commission Earned (5%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No linked users match your search criteria.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{user.name}</div>
                    <div className="text-slate-500 text-[11px] font-mono">{user.email} • {user.phone}</div>
                  </td>
                  <td className="p-3 text-slate-600 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {user.onboardedDate}
                    </span>
                  </td>
                  <td className="p-3">
                    {user.status === 'ACTIVE' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        Active Trader
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-900 font-mono">
                    ₦{user.totalTransactionsAmount.toLocaleString()}
                  </td>
                  <td className="p-3 text-right font-bold text-emerald-600 font-mono">
                    ₦{user.commissionGenerated.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
