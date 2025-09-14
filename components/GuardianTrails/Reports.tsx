
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../shared/Card';
import { REPORT_CHART_DATA, REPORT_PIE_DATA } from '../../constants';

const COLORS = ['#22D3EE', '#0E7490', '#3B82F6'];

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Comprehensive Tourist Safety Reports</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Monthly Incident Trends</h2>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={REPORT_CHART_DATA}>
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF"/>
                  <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D' }} />
                  <Bar dataKey="Incidents" fill="#22D3EE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <h2 className="text-lg font-semibold mb-4">Incident Type Distribution</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={REPORT_PIE_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {REPORT_PIE_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                         <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
       <Card className="overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Reports Zones</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="p-3">Tourist ID/Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
       </Card>
    </div>
  );
};

export default Reports;
