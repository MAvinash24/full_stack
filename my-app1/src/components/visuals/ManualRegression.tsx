"use client";
import { useState } from "react";
import { ResponsiveContainer, ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Mock data for the "Student Scores" example
const data = [
  { x: 1, y: 40 }, { x: 2, y: 48 }, { x: 3, y: 52 }, 
  { x: 4, y: 60 }, { x: 5, y: 70 }, { x: 6, y: 72 }, { x: 7, y: 85 }
];

export default function ManualRegression() {
  const [intercept, setIntercept] = useState(20);
  const [slope, setSlope] = useState(3);

  // Generate line points based on sliders
  const lineData = [
    { x: 0, y: intercept },
    { x: 8, y: slope * 8 + intercept }
  ];

  // Calculate MSE dynamically
  const mse = data.reduce((acc, point) => {
    const predicted = slope * point.x + intercept;
    return acc + Math.pow(point.y - predicted, 2);
  }, 0) / data.length;

  return (
    <div className="space-y-6">
      <div className="h-[300px] w-full rounded-lg bg-black/20 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="x" type="number" domain={[0, 8]} stroke="#9ca3af" />
            <YAxis domain={[0, 100]} stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1a0b2e', color: '#fff' }} />
            <Scatter name="Student Data" data={data} fill="#3b82f6" />
            <Line data={lineData} dataKey="y" type="monotone" stroke="#f43f5e" strokeWidth={3} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 md:grid-cols-2 rounded-lg bg-[#3b1c6b] p-6">
        <div className="space-y-4">
            <label className="block text-sm font-bold">Intercept (β₀): <span className="text-red-400">{intercept}</span></label>
            <input type="range" min="0" max="50" value={intercept} onChange={(e) => setIntercept(Number(e.target.value))} />
            
            <label className="block text-sm font-bold">Slope (β₁): <span className="text-red-400">{slope}</span></label>
            <input type="range" min="0" max="10" step="0.1" value={slope} onChange={(e) => setSlope(Number(e.target.value))} />
        </div>
        <div className="flex items-center justify-center">
            <div className="text-center">
                <p className="text-sm text-gray-400">Mean Squared Error</p>
                <p className="text-3xl font-bold text-yellow-400">{mse.toFixed(2)}</p>
            </div>
        </div>
      </div>
    </div>
  );
}