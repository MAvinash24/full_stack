"use client";
import { useState } from "react";
import { ResponsiveContainer, ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [{ x: 1, y: 40 }, { x: 2, y: 48 }, { x: 3, y: 52 }, { x: 4, y: 60 }, { x: 5, y: 70 }, { x: 6, y: 72 }, { x: 7, y: 85 }];

export default function ManualRegression() {
  const [intercept, setIntercept] = useState(20);
  const [slope, setSlope] = useState(3);
  const lineData = [{ x: 0, y: intercept }, { x: 8, y: slope * 8 + intercept }];
  const mse = data.reduce((acc, point) => acc + Math.pow(point.y - (slope * point.x + intercept), 2), 0) / data.length;

  return (
    <div className="space-y-8">
      
      {/* 1. Title & Custom Legend (Matches Screenshot) */}
      <div className="text-center space-y-4">
          <h4 className="text-purple-400 font-bold text-lg">Adjust the Intercept and Slope to Fit the Data</h4>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                  <div className="w-12 h-4 bg-[#3b82f6] rounded-sm"></div>
                  <span>Student Scores</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-12 h-4 border-2 border-[#f43f5e] rounded-sm"></div>
                  <span>Your Regression Line</span>
              </div>
          </div>
      </div>

      {/* 2. Chart Area */}
      <div className="h-[350px] w-full rounded-xl p-4 transition-colors shadow-inner
        bg-gray-50 border border-gray-200        /* Light Mode */
        dark:bg-[#1a0b2e] dark:border-white/5"   /* Dark Mode */
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} stroke="#4c1d95" />
            <XAxis 
                dataKey="x" type="number" domain={[0, 8]} 
                stroke="#6b7280" fontSize={12} 
                label={{ value: 'Study Hours', position: 'bottom', offset: 0, fill: '#6b7280' }} 
            />
            <YAxis 
                domain={[0, 100]} 
                stroke="#6b7280" fontSize={12} 
                label={{ value: 'Exam Score', angle: -90, position: 'insideLeft', fill: '#6b7280' }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#000', color: '#fff' }} 
            />
            <Scatter name="Student Scores" data={data} fill="#3b82f6" shape="circle" />
            <Line data={lineData} dataKey="y" type="monotone" stroke="#f43f5e" strokeWidth={4} dot={false} animationDuration={0} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Controls Area */}
      <div className="grid gap-6 md:grid-cols-2 rounded-xl p-6 transition-colors border
          bg-white border-gray-200 shadow-sm       /* Light Mode */
          dark:bg-[#2e1065] dark:border-white/5"   /* Dark Mode */
      >
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="flex justify-between text-sm font-bold text-gray-700 dark:text-white">
                    Intercept (β₀): <span className="text-pink-500 text-lg">{intercept}</span>
                </label>
                <input type="range" min="0" max="50" value={intercept} onChange={(e) => setIntercept(Number(e.target.value))} />
            </div>
            
            <div className="space-y-2">
                <label className="flex justify-between text-sm font-bold text-gray-700 dark:text-white">
                    Slope (β₁): <span className="text-pink-500 text-lg">{slope}</span>
                </label>
                <input type="range" min="0" max="10" step="0.1" value={slope} onChange={(e) => setSlope(Number(e.target.value))} />
            </div>
        </div>
        <div className="text-center flex flex-col justify-center border-l border-gray-200 dark:border-white/10 pl-6">
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">Mean Squared Error</p>
            <p className="text-5xl font-extrabold text-yellow-500 dark:text-yellow-400">{mse.toFixed(2)}</p>
        </div>
      </div>

      {/* 4. Instructions Text */}
      <div className="space-y-4">
          <p className="text-gray-700 dark:text-purple-100 font-medium">As you adjust the sliders, observe how the regression line changes:</p>
          <ul className="pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex gap-2">
                  <span className="text-gray-400">•</span> 
                  The <strong className="text-white">intercept</strong> moves the line up or down (where it crosses the y-axis)
              </li>
              <li className="flex gap-2">
                  <span className="text-gray-400">•</span> 
                  The <strong className="text-white">slope</strong> changes how steep the line is (positive slopes go up, negative slopes go down)
              </li>
          </ul>
      </div>

      {/* 5. Notification Box */}
      <div className="rounded-lg p-5 border-l-4 border-pink-500 transition-colors bg-purple-50 dark:bg-purple-900/30">
          <p className="text-sm text-gray-800 dark:text-purple-100 leading-relaxed">
              Notice that some lines fit the data better than others. The <strong className="text-white">best line</strong> is the one that minimizes the total error between the line and the actual data points.
          </p>
      </div>

    </div>
  );
}