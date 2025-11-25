"use client";
import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { ResponsiveContainer, ComposedChart, Line, Scatter, XAxis, YAxis, CartesianGrid, ReferenceDot } from "recharts";

// Simple datasets logic
const DATASETS = {
  sales: { name: "Sales Revenue", data: Array.from({ length: 15 }, (_, i) => ({ x: i + 1, y: 10 + i * 2 + Math.random() * 5 })) },
  housing: { name: "Housing Prices", data: Array.from({ length: 15 }, (_, i) => ({ x: i + 1, y: 50 + i * 4 + Math.random() * 10 })) },
};

export default function TrainingSim() {
  const [selectedDs, setSelectedDs] = useState<"sales" | "housing">("sales");
  const [iteration, setIteration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Fake history generator
  const history = Array.from({ length: 101 }, (_, i) => ({
    iteration: i,
    cost: 100 * Math.exp(-0.05 * i), // Fake cost curve
    slope: 0.1 + (i / 100) * 2,      // Fake parameter update
  }));

  // Auto-play logic
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setIteration(p => (p < 100 ? p + 1 : 100));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentSlope = history[iteration].slope;
  const currentCost = history[iteration].cost;
  const currentData = DATASETS[selectedDs].data;
  const lineData = [{ x: 0, y: 0 }, { x: 20, y: 20 * currentSlope + 10 }];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-xl border border-white/10 bg-[#2e1065] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <select 
            className="rounded bg-black/30 px-4 py-2 text-white"
            value={selectedDs}
            onChange={(e) => { setSelectedDs(e.target.value as any); setIteration(0); }}
          >
            <option value="sales">Sales Revenue</option>
            <option value="housing">Housing Prices</option>
          </select>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2 rounded bg-brand-accent px-4 py-2 font-bold hover:opacity-90">
              {isPlaying ? <Pause size={16}/> : <Play size={16}/>} {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={() => setIteration(0)} className="rounded bg-white/10 p-2"><RotateCcw size={16}/></button>
          </div>
          <span className="font-mono text-brand-accent">Iteration: {iteration}/100</span>
        </div>
        <input 
            type="range" min="0" max="100" value={iteration} 
            onChange={(e) => setIteration(Number(e.target.value))} 
            className="w-full"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Regression */}
        <div className="h-[300px] rounded-xl bg-[#2e1065] p-4 border border-white/5">
            <h3 className="mb-2 text-center text-sm font-bold text-gray-400">Linear Regression Model</h3>
            <ResponsiveContainer>
                <ComposedChart>
                    <CartesianGrid stroke="#ffffff10" />
                    <XAxis dataKey="x" type="number" domain={[0, 20]} stroke="#6b7280"/>
                    <YAxis domain={['auto', 'auto']} stroke="#6b7280"/>
                    <Scatter data={currentData} fill="#3b82f6" />
                    <Line data={lineData} dataKey="y" type="monotone" stroke="#d946ef" strokeWidth={3} dot={false} animationDuration={0} />
                </ComposedChart>
            </ResponsiveContainer>
        </div>

        {/* Right: Cost Function */}
        <div className="h-[300px] rounded-xl bg-[#2e1065] p-4 border border-white/5">
            <h3 className="mb-2 text-center text-sm font-bold text-gray-400">Cost vs Parameter</h3>
            <ResponsiveContainer>
                <ComposedChart data={history}>
                    <CartesianGrid stroke="#ffffff10" />
                    <XAxis dataKey="iteration" hide />
                    <YAxis dataKey="cost" stroke="#6b7280"/>
                    <Line dataKey="cost" stroke="#10b981" strokeWidth={2} dot={false} />
                    <ReferenceDot x={iteration} y={currentCost} r={6} fill="#d946ef" stroke="white" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}