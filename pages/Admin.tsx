import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, HardDrive, DollarSign, Image as ImageIcon, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_EVENTS } from '../constants';

const DATA_SEARCH_STATS = [
  { name: 'Mon', searches: 400 },
  { name: 'Tue', searches: 300 },
  { name: 'Wed', searches: 600 },
  { name: 'Thu', searches: 800 },
  { name: 'Fri', searches: 1200 },
  { name: 'Sat', searches: 2400 },
  { name: 'Sun', searches: 1800 },
];

const STORAGE_DATA = [
  { name: 'Used (Images)', value: 3.5 },
  { name: 'Used (Vectors)', value: 0.2 },
  { name: 'Free Space', value: 1.3 },
];

const COLORS = ['#6366f1', '#a855f7', '#1e293b'];

export const Admin: React.FC = () => {
  return (
    <div className="pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400">Manage events, storage, and analytics.</p>
        </div>
        <Button icon={<Plus size={18} />}>Create New Event</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
            { label: 'Total Events', val: '12', icon: <ImageIcon className="text-indigo-400"/> },
            { label: 'Face Searches', val: '14.2k', icon: <Users className="text-blue-400"/> },
            { label: 'Storage Used', val: '3.7 GB', icon: <HardDrive className="text-amber-400"/> },
            { label: 'Revenue', val: '$1,240', icon: <DollarSign className="text-green-400"/> },
        ].map((stat, i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                    <div className="p-2 bg-slate-900 rounded-lg">{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-white">{stat.val}</div>
            </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Search Volume Chart */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-6">Weekly Search Volume</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_SEARCH_STATS}>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            cursor={{ fill: '#334155' }}
                        />
                        <Bar dataKey="searches" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Storage Pie Chart */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-2">Storage Overview</h3>
            <div className="flex-grow flex items-center justify-center relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-white">74%</span>
                    <span className="text-xs text-slate-400">Used</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={STORAGE_DATA}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {STORAGE_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        Photos
                    </span>
                    <span className="text-slate-400">3.5 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        AI Vectors
                    </span>
                    <span className="text-slate-400">200 MB</span>
                </div>
                <Button variant="secondary" fullWidth className="mt-4 text-xs h-8">Upgrade Storage</Button>
            </div>
        </div>
      </div>

      {/* Event List */}
      <div className="mt-8 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white">Active Events</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-4">Event Name</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Storage</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 text-slate-300 text-sm">
                    {MOCK_EVENTS.map(evt => (
                        <tr key={evt.id} className="hover:bg-slate-700/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">{evt.name}</td>
                            <td className="px-6 py-4">{evt.date}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: `${(evt.storageUsed / evt.storageLimit) * 100}%`}}></div>
                                    </div>
                                    <span className="text-xs">{Math.round(evt.storageUsed/100)/10}GB</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded-full text-xs font-bold">Active</span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-indigo-400 hover:text-indigo-300 font-medium">Manage</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};
