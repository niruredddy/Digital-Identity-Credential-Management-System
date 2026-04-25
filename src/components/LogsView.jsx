import React from 'react';
import { Search, Filter, Download, User, ShieldAlert, CheckCircle2, MoreVertical } from 'lucide-react';

const LogsView = () => {
  const logs = [
    { id: 'TX-9402', user: 'Julian Thorne', action: 'Auth Success', target: 'Vault Alpha', status: 'SUCCESS', time: '14:22:01', type: 'success' },
    { id: 'TX-9401', user: 'Unknown IP', action: 'Auth Failure', target: 'Root Entry', status: 'BLOCKED', time: '14:21:44', type: 'error' },
    { id: 'TX-9400', user: 'Elena Vance', action: 'Credential Issue', target: 'Tier 1 Ledger', status: 'SUCCESS', time: '14:18:22', type: 'success' },
    { id: 'TX-9399', user: 'Sarah Jenkins', action: 'Auth Success', target: 'Vault Beta', status: 'SUCCESS', time: '14:12:11', type: 'success' },
    { id: 'TX-9398', user: 'Marcus Aurelius', action: 'Biometric Scan', target: 'Main Gate', status: 'SUCCESS', time: '14:05:00', type: 'success' },
    { id: 'TX-9397', user: 'Unknown IP', action: 'Port Scan', target: 'Security Mesh', status: 'MITIGATED', time: '13:58:33', type: 'warning' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif text-slate-100 mb-2">Verification Logs</h2>
          <p className="text-slate-400">Full audit trail of all identity transactions and security events.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-850 border border-slate-800 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-aureum-500 text-slate-900 font-bold rounded-lg text-sm shadow-lg hover:bg-aureum-400 transition-colors">
            <Filter className="w-4 h-4" /> Live Filter
          </button>
        </div>
      </div>

      <div className="bg-slate-850 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search logs by ID, User, or Action..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-aureum-500 text-slate-300"
            />
          </div>
          <select className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-400 focus:outline-none">
            <option>All Statuses</option>
            <option>Success</option>
            <option>Blocked</option>
            <option>Warning</option>
          </select>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-900/30 text-slate-500 uppercase tracking-widest text-[10px] font-bold">
              <th className="px-6 py-4">Event ID</th>
              <th className="px-6 py-4">Identity Agent</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Target Node</th>
              <th className="px-6 py-4">Security Status</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                <td className="px-6 py-4 font-mono text-xs text-aureum-500/70">{log.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${log.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-slate-800 text-slate-400'}`}>
                      {log.user.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-200">{log.user}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400">{log.action}</td>
                <td className="px-6 py-4 text-slate-500 font-mono text-[11px]">{log.target}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                    log.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                    log.type === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                    'bg-aureum-500/10 text-aureum-500 border-aureum-500/20'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 font-mono">{log.time}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-600 group-hover:text-slate-400">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-slate-800 bg-slate-900/30 flex justify-center">
           <button className="text-xs font-bold text-slate-500 hover:text-aureum-500 transition-colors uppercase tracking-widest">Load Previous 50 Entries</button>
        </div>
      </div>
    </div>
  );
};

export default LogsView;
