"use client";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { DATASETS, generateHistory } from "@/lib/data";
import { ResponsiveContainer, ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot, Area } from "recharts";
import Card from "@/components/ui/Card";

export default function BuildSimulation() {
  const [dataset, setDataset] = useState<keyof typeof DATASETS>("sales");
  const [showTable, setShowTable] = useState(false);
  const [learningRate, setLearningRate] = useState(0.05);
  const [iterations, setIterations] = useState(100);
  
  const [isBuilt, setIsBuilt] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentData = DATASETS[dataset];

  const handleBuild = () => {
    const newHistory = generateHistory(dataset, learningRate, iterations);
    setHistory(newHistory);
    setIsBuilt(true);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsBuilt(false);
    setIsPlaying(false);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (isPlaying && isBuilt) {
      timerRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= history.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current!);
  }, [isPlaying, isBuilt, history.length]);

  const stepData = isBuilt ? history[currentStep] : { m: 0, b: 0, cost: 0 };
  const maxX = currentData.data.length > 0 ? Math.max(...currentData.data.map(d => d.x)) : 100;
  const lineData = [
    { x: 0, y: stepData.b },
    { x: maxX * 1.1, y: stepData.m * (maxX * 1.1) + stepData.b }
  ];

  return (
    <div className="space-y-12">
      
      {/* SECTION 2 */}
      <Card title="2. Visualizing the Relationship">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select a Dataset:</label>
            <select
              value={dataset}
              onChange={(e) => { setDataset(e.target.value as any); setIsBuilt(false); }}
              className="w-full rounded-lg bg-white dark:bg-black/30 border border-gray-300 dark:border-white/10 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            >
              {Object.entries(DATASETS).map(([key, val]) => (
                <option key={key} value={key}>{val.name}</option>
              ))}
            </select>
          </div>

          <div className="rounded-lg bg-purple-50 dark:bg-[#3b1c6b] p-4 border border-purple-100 dark:border-none">
            <h4 className="font-bold text-purple-600 dark:text-purple-300 mb-1">{currentData.name} Dataset</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{currentData.description}</p>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">Choose a dataset to see its scatter plot. This will help you understand the relationship between variables before building the model.</p>
          <button 
            onClick={() => setShowTable(!showTable)}
            className="w-full rounded-lg bg-gradient-to-r from-red-500 to-pink-600 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity"
          >
            {showTable ? "Hide Dataset Table" : "View Dataset Table"}
          </button>
          <div>
            <h2 className="font-bold text-purple-600 dark:text-purple-300 mb-1">{currentData.name} Dataset</h2>
          </div>

          {showTable && (
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-white/10">
              <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                <thead className="bg-gray-100 dark:bg-black/20 font-bold">
                  <tr>
                    <th className="px-4 py-2">{currentData.xLabel}</th>
                    <th className="px-4 py-2">{currentData.yLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.data.map((row, i) => (
                    <tr key={i} className="border-t border-gray-200 dark:border-white/5">
                      <td className="px-4 py-2">{row.x}</td>
                      <td className="px-4 py-2">{row.y}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="h-[300px] w-full rounded-lg bg-gray-100 dark:bg-black/20 p-4 border border-gray-200 dark:border-white/5">
             <p className="text-center text-xs font-bold text-gray-500 mb-2">{currentData.name} Preview</p>
             <ResponsiveContainer width="100%" height="100%">
               <ComposedChart>
                 <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                 <XAxis dataKey="x" type="number" stroke="#888" fontSize={12} />
                 <YAxis dataKey="y" type="number" stroke="#888" fontSize={12} />
                 <Tooltip contentStyle={{ borderRadius: '8px' }} />
                 <Scatter data={currentData.data} fill="#3b82f6" />
               </ComposedChart>
             </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* SECTION 3 */}
      <Card title="3. Choose the Hyperparameters">
        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden border border-purple-200 dark:border-purple-900">
             <table className="w-full text-sm text-left">
                <thead className="bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-white">
                   <tr>
                      <th className="px-4 py-2">Learning Rate (α)</th>
                      <th className="px-4 py-2">Effect</th>
                   </tr>
                </thead>
                <tbody className="bg-white dark:bg-black/20 text-gray-700 dark:text-gray-300">
                   <tr className="border-t border-purple-100 dark:border-white/5">
                      <td className="px-4 py-2 font-mono">0.001 - 0.005</td>
                      <td className="px-4 py-2">Slow, stable convergence</td>
                   </tr>
                   <tr className="border-t border-purple-100 dark:border-white/5 bg-purple-50 dark:bg-white/5">
                      <td className="px-4 py-2 font-mono">0.01 - 0.05</td>
                      <td className="px-4 py-2">Balanced (Recommended)</td>
                   </tr>
                   <tr className="border-t border-purple-100 dark:border-white/5">
                      <td className="px-4 py-2 font-mono">0.1+</td>
                      <td className="px-4 py-2">Unstable, may diverge</td>
                   </tr>
                
                
                </tbody>
             </table>
            <p className="mt-4 text-white-700 dark:text-white-300 text-centre">
              Tip: If the cost function plot oscillates or increases, try reducing the learning rate.
              </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
             <div className="space-y-2">
                <label className="flex justify-between text-sm font-bold text-gray-700 dark:text-gray-300">
                   <span>Learning Rate (α):</span>
                   <span className="text-blue-500">{learningRate.toFixed(3)}</span>
                </label>
                <input type="range" min="0.001" max="0.1" step="0.001" value={learningRate} onChange={e => setLearningRate(parseFloat(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="flex justify-between text-sm font-bold text-gray-700 dark:text-gray-300">
                   <span>Iterations:</span>
                   <span className="text-blue-500">{iterations}</span>
                </label>
                <input type="range" min="10" max="500" step="10" value={iterations} onChange={e => setIterations(parseInt(e.target.value))} />
             </div>
          </div>

          <div className="flex gap-4 pt-4">
             <button onClick={handleBuild} className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-colors shadow-lg">Build Model</button>
             <button onClick={handleReset} className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-white/10 hover:bg-gray-300 text-gray-800 dark:text-white font-bold transition-colors">Reset</button>
          </div>
        </div>
      </Card>

      {/* SECTION 4: Model's Growth */}
      <Card title="4. Model's Growth">
        {!isBuilt ? (
           <div className="space-y-8">
              <div className="w-full bg-purple-900/20 text-center py-3 rounded-lg border border-purple-500/30 text-gray-700 dark:text-purple-200 text-sm font-medium">
                 Select a dataset and parameters, then click "Build Model"
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                 {/* Left Empty */}
                 <div className="h-[320px] w-full bg-gray-50 dark:bg-[#1a0b2e] border border-gray-200 dark:border-purple-500/20 rounded-xl p-4 shadow-inner">
                    <p className="text-center text-sm font-bold text-gray-500 dark:text-gray-400 mb-4">Linear Regression Model - Build a model to see results</p>
                    <ResponsiveContainer>
                       <ComposedChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                          <XAxis type="number" domain={[0, 1]} tickCount={11} stroke="#6b7280" fontSize={12} label={{ value: 'X Values', position: 'bottom', offset: 0, fill: '#6b7280' }} />
                          <YAxis type="number" domain={[0, 1]} tickCount={11} stroke="#6b7280" fontSize={12} label={{ value: 'Y Values', angle: -90, position: 'insideLeft', fill: '#6b7280' }} />
                       </ComposedChart>
                    </ResponsiveContainer>
                 </div>

                 {/* Right Empty */}
                 <div className="h-[320px] w-full bg-gray-50 dark:bg-[#1a0b2e] border border-gray-200 dark:border-purple-500/20 rounded-xl p-4 shadow-inner">
                    <p className="text-center text-sm font-bold text-gray-500 dark:text-gray-400 mb-4">Parameter vs Cost - Build a model to see results</p>
                    <ResponsiveContainer>
                       <ComposedChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                          <XAxis type="number" domain={[0, 1]} tickCount={11} stroke="#6b7280" fontSize={12} label={{ value: 'Parameter (θ)', position: 'bottom', fill: '#6b7280', fontSize: 12 }} />
                          <YAxis type="number" domain={[0, 1]} tickCount={11} stroke="#6b7280" fontSize={12} label={{ value: 'Cost', angle: -90, position: 'insideLeft', fill: '#6b7280' }} />
                       </ComposedChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        ) : (
           <div className="space-y-8">
              <div className="w-full bg-purple-900/50 text-center py-3 rounded-lg border border-purple-500/30 text-purple-200 text-sm font-medium">
                 Model built successfully. Use the controls to navigate through {iterations} steps of training.
              </div>

              <div className="flex items-center justify-between gap-4">
                 <button 
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} 
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md transition-transform active:scale-95"
                 >
                    <SkipBack size={16} fill="currentColor" /> Previous
                 </button>

                 <input 
                    type="range" 
                    min="0" max={history.length - 1} 
                    value={currentStep} 
                    onChange={e => setCurrentStep(parseInt(e.target.value))}
                    className="flex-grow max-w-md accent-blue-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                 />

                 <button 
                    onClick={() => setCurrentStep(Math.min(history.length - 1, currentStep + 1))} 
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-transform active:scale-95"
                 >
                    Next <SkipForward size={16} fill="currentColor" />
                 </button>

                 <div className="font-mono font-bold text-gray-800 dark:text-white text-sm px-4">
                    Iteration: {currentStep}/{iterations}
                 </div>

                 <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-transform active:scale-95"
                 >
                    {isPlaying ? <Pause size={16} fill="currentColor"/> : <Play size={16} fill="currentColor"/>} {isPlaying ? "Pause" : "Play"}
                 </button>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                 <div className="h-[320px] w-full bg-[#1a0b2e] border border-purple-500/20 rounded-xl p-4 shadow-inner">
                    <p className="text-center text-sm font-bold text-gray-400 mb-4">Linear Regression Model (Iteration {currentStep})</p>
                    <ResponsiveContainer>
                       <ComposedChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                          <XAxis 
                             dataKey="x" type="number" domain={['dataMin', 'dataMax']} 
                             stroke="#6b7280" fontSize={12} 
                             label={{ value: currentData.xLabel, position: 'bottom', offset: 0, fill: '#6b7280' }}
                          />
                          <YAxis 
                             dataKey="y" type="number" domain={['auto', 'auto']} 
                             stroke="#6b7280" fontSize={12} 
                             label={{ value: currentData.yLabel, angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                          />
                          <Scatter name="Data Points" data={currentData.data} fill="#3b82f6" shape="circle" />
                          <Line data={lineData} dataKey="y" type="monotone" stroke="#f43f5e" strokeWidth={3} dot={false} animationDuration={0} />
                          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1a0b2e', borderColor: '#6b7280', color: '#fff' }} />
                       </ComposedChart>
                    </ResponsiveContainer>
                 </div>

                 <div className="h-[320px] w-full bg-[#1a0b2e] border border-purple-500/20 rounded-xl p-4 shadow-inner">
                    <p className="text-center text-sm font-bold text-gray-400 mb-4">Parameter (θ) vs Cost (Iteration {currentStep})</p>
                    <ResponsiveContainer>
                       <ComposedChart data={history} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                          <defs>
                             <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                          <XAxis dataKey="iteration" hide />
                          <YAxis dataKey="cost" stroke="#6b7280" fontSize={12} domain={['auto', 'auto']} label={{ value: 'Cost', angle: -90, position: 'insideLeft', fill: '#6b7280' }} />
                          <Area type="monotone" dataKey="cost" stroke="#2dd4bf" fillOpacity={1} fill="url(#colorCost)" />
                          <ReferenceDot x={currentStep} y={history[currentStep]?.cost} r={6} fill="#2dd4bf" stroke="white" strokeWidth={2} />
                          <Tooltip labelFormatter={(label) => `Iteration: ${label}`} formatter={(value: any) => [`${Number(value).toFixed(3)}`, 'Cost']} contentStyle={{ backgroundColor: '#000', borderRadius: '8px', border: '1px solid #333', color: '#fff' }} />
                       </ComposedChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        )}
      </Card>
    </div>
  );
}