import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../shared/Card';
import { REPORT_CHART_DATA, REPORT_PIE_DATA } from '../../constants';

const COLORS = ['#0ea5e9', '#6366f1', '#f97316', '#10b981', '#f59e0b'];

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Incident Trends</h2>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={REPORT_CHART_DATA}>
                  <XAxis dataKey="name" stroke="currentColor" tick={{ fontSize: 12 }} className="text-gray-500 dark:text-gray-400"/>
                  <YAxis stroke="currentColor" tick={{ fontSize: 12 }} className="text-gray-500 dark:text-gray-400" />
                  <Tooltip 
                    cursor={{fill: 'rgba(113, 113, 122, 0.1)'}}
                    contentStyle={{ 
                      backgroundColor: 'var(--color-light-100, #ffffff)', 
                      border: '1px solid var(--color-light-300, #e2e8f0)', 
                      borderRadius: '0.5rem'
                    }}
                    />
                  <Legend />
                  <Bar dataKey="Incidents" fill="#0ea5e9" name="Total Incidents" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Resolved" fill="#84cc16" name="Incidents Resolved" radius={[4, 4, 0, 0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Incident Type Distribution</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={REPORT_PIE_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                            labelLine={false}
                            // FIX: Explicitly type the label props with `any` to resolve TypeScript error with recharts' PieLabelRenderProps.
                            label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {REPORT_PIE_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                         <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
       <Card className="overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Detailed Report Data</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-light-200 dark:border-dark-700 bg-light-200/50 dark:bg-dark-700/50">
              <th className="p-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Report ID</th>
              <th className="p-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Date</th>
              <th className="p-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Type</th>
              <th className="p-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Location</th>
               <th className="p-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
                <td colSpan={5} className="p-8 text-gray-400 dark:text-gray-500">
                    No detailed reports to display.
                </td>
            </tr>
          </tbody>
        </table>
       </Card>
    </div>
  );
};

export default Reports;