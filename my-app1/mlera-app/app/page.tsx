"use client";
import Link from "next/link";
import ModuleHeader from "@/components/layout/ModuleHeader";
import Card from "@/components/ui/Card";
import MathBlock from "@/components/ui/MathBlock";
import ManualRegression from "@/components/visuals/ManualRegression";
import { Check, X, ArrowRight } from "lucide-react"; 
import { ResponsiveContainer, ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Data for Intuition Module
const intuitionData = [
  { x: 1, y: 41 }, { x: 2, y: 48 }, { x: 3, y: 46 }, { x: 4, y: 62 },{ x: 4, y: 48 }, 
  { x: 5, y: 72 },{ x: 5, y: 64 }, { x: 6, y: 75 },{ x: 6, y: 72 }, { x: 8, y: 84 } ,{ x: 8, y: 81 }
];
const intuitionLine = [{ x: 0, y: 38 }, { x: 8, y: 83 }];

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto space-y-12 pb-24">
      
      <ModuleHeader 
        title="Introduction to Linear Regression"
        currentStep={2}
        totalSteps={5}
        prevLink="/" 
      />

       {/* Module 1 */}
       <Card title="1. What is Linear Regression?">
         <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
            Linear Regression is one of the most fundamental and widely used techniques in the field of machine learning and statistics. At its core, it's a method for modeling the relationship between a <span className="font-bold text-[#06b6d4]">dependent variable</span> (often denoted as Y) and 
            one or more <span className="font-bold text-[#06b6d4]">independent variables</span>(X) by fitting a linear equation to the observed data.
         </p>
         <div className="rounded-lg border-l-4 border-[#d946ef] p-4 transition-colors bg-[#f3f0ff] dark:bg-[#3b1c6b]">
            <h4 className="mb-2 font-bold text-[#d946ef]">Definition:</h4>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              Linear Regression is a <span className="font-bold text-[#06b6d4]">supervised learning</span> algorithm that 
              predicts a continuous output value based on one or more input <span className="font-bold text-[#06b6d4]">features</span>, assuming a linear relationship between the inputs and the output.
            </p>
         </div>
       </Card>

       {/* Module 2 */}
       <Card title="2. Mathematical Formulation">
         <p className="text-gray-700 dark:text-gray-300">The simplest form of Linear Regression (Simple Linear Regression) can be expressed as:</p>
         <MathBlock formula="Y = \beta_0 + \beta_1 X + \epsilon" />
         
         <div className="mt-6 space-y-3">
             <p className="font-bold text-gray-900 dark:text-white">Where:</p>
             <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">Y</strong> is the dependent variable</span></li>
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">X</strong> is the independent variable</span></li>
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">β₀</strong> is the y-intercept</span></li>
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">β₁</strong> is the slope</span></li>
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">ε</strong> (epsilon) represents the error term</span></li>
             </ul>
         </div>

         <div className="mt-8 rounded-lg border-l-4 border-pink-500 p-5 bg-pink-50 dark:bg-pink-900/20 transition-colors">
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
               The goal of Linear Regression is to find the values of <span className="font-bold text-orange-600 dark:text-orange-400">β₀</span>, and <span className="font-bold text-orange-600 dark:text-orange-400">β₁</span>, that minimize the sum of squared differences between the actual <span className="font-bold text-[#06b6d4]">Y</span> values and the values predicted by our model.
            </p>
         </div>
       </Card>

       {/* Module 3: Intuition behind LR (Optimized Graph) */}
       <Card title="3. Intuition behind LR">
         <p className="mb-6 text-gray-700 dark:text-gray-300">
            Imagine you're trying to understand the relationship between study hours and exam scores. Intuitively, you might expect that more study hours lead to higher scores. Linear Regression formalizes this intuition by finding the straight line that best represents this relationship.
         </p>
         
         {/* Increased height and adjusted margins to prevent cutting */}
         <div className="h-[400px] w-full bg-gray-50 dark:bg-[#1a0b2e] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-inner flex flex-col">
            <div className="mb-6 w-full rounded bg-gradient-to-r from-red-400 to-purple-600 p-3 text-center font-bold text-white shadow-md">
                Relationship Between Study Hours and Exam Scores
            </div>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart margin={{ top: 10, right: 10, bottom: 40, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis 
                      dataKey="x" 
                      type="number" 
                      domain={[0, 8]} 
                      stroke="#888" 
                      fontSize={12} 
                      label={{ value: 'Study Hours', position: 'bottom', offset: 10 }} 
                    />
                    <YAxis 
                      dataKey="y" 
                      type="number" 
                      domain={[0, 100]} 
                      stroke="#888" 
                      fontSize={12} 
                      label={{ value: 'Exam Score', angle: -90, position: 'insideLeft' }} 
                    />
                    <Scatter name="Student Data" data={intuitionData} fill="#3b82f6" />
                    <Line data={intuitionLine} dataKey="y" type="monotone" stroke="#f43f5e" strokeWidth={3} dot={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
         </div>
         <p className="mb-6 text-gray-600 dark:text-gray-200 text-left">
             In the visualization above, each point represents a student's study hours (x-axis) and their exam score (y-axis). 
             The straight line is the <strong className="text-blue-500">"best fit"</strong>  line determined by Linear Regression, which minimizes the overall distance between the line and all data points.
             If we know this relationship, we can make predictions. For example, if a student studies for 6 hours, we can use our regression line to predict their likely exam score.
             Our goal in linear regression is to find the values of ẞo and ẞ1 (or all the ẞ coefficients in multiple regression) that <strong className="text-blue-500">"best fit"</strong> our data. 
             But what does <strong className="text-blue-500">"best fit"</strong> mean mathematically? That's where the cost function comes in. 
         </p>
       </Card>

      {/* Module 4: Cost Function */}
       <Card title="4. Understanding the Cost Function (MSE)">
         <p className="text-gray-700 dark:text-gray-300">
            To find the best-fitting line, we need a way to measure how well any given line fits our data. The cost function quantifies how "wrong" our model's predictions are compared to the actual values. In linear regression, we typically use the <strong className="text-blue-500">Mean Squared Error (MSE)</strong> as our cost function.
         </p>
         
         <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">For a dataset with n observations, the MSE is calculated as:</p>
         
         {/* Formula 1: Standard MSE */}
         <MathBlock formula="MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2" />
         
         <div className="mt-6 space-y-4">
             <p className="font-bold text-gray-900 dark:text-white">Where:</p>
             <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span>n is the number of observations</span></li>
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">yᵢ</strong> is the actual value of the dependent variable for observation i</span></li>
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">ŷᵢ</strong> is the predicted value for observation i</span></li>
             </ul>
             
             <p className="mt-4 text-gray-700 dark:text-gray-300">Substituting our linear regression equation into the MSE formula:</p>
             
             {/* Formula 2: MSE Expanded */}
             <MathBlock formula="MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - (\beta_0 + \beta_1 x_i))^2" />
         </div>

         <div className="mt-6 rounded-lg bg-purple-900/20 p-4 border border-purple-500/30">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                We've defined the cost function (typically Mean Squared Error), the next step in Linear Regression is to minimize this error by finding the optimal values of the parameters:
            </p>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 pl-4">
                <li>→ <strong className="text-gray-900 dark:text-white">β₀</strong> (intercept)</li>
                <li>→ <strong className="text-gray-900 dark:text-white">β₁</strong> (slope)</li>
            </ul>
         </div>
       </Card>

       {/* Module 5: OLS */}
       <Card title="5. Ordinary Least Square (OLS)">
         <p className="mb-4 text-gray-700 dark:text-gray-300">
            OLS is a <span className="font-bold text-blue-500">closed-form analytical solution</span> derived by differentiating the cost function.
         </p>
         <MathBlock formula="\beta_1 = \frac{\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n}(x_i - \bar{x})^2} = \frac{Cov(x,y)}{Var(x)}" />
         <MathBlock formula="\beta_0 = \bar{y} - \beta_1 \bar{x}" />
         
         <p className="text-gray-700 dark:text-gray-300">where and y are the means of the x and y values respectively.</p>
         <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-green-50 p-5 border border-green-200 dark:bg-green-500/10 dark:border-green-500/20">
                <h5 className="mb-3 flex items-center gap-2 font-bold text-green-700 dark:text-green-400">💡 Pros:</h5>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2"><Check size={16} className="mt-0.5 text-green-600"/> Fast and exact</li>
                    <li className="flex gap-2"><Check size={16} className="mt-0.5 text-green-600"/> Best for small to medium datasets</li>
                </ul>
            </div>
            <div className="rounded-lg bg-red-50 p-5 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20">
                <h5 className="mb-3 flex items-center gap-2 font-bold text-red-700 dark:text-red-400">⚠️ Cons:</h5>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2"><X size={16} className="mt-0.5 text-red-600"/> Not ideal for high-dimensional data</li>
                    <li className="flex gap-2"><X size={16} className="mt-0.5 text-red-600"/> Becomes computationally expensive when data is very large</li>
                </ul>
            </div>
         </div>
       </Card>

       {/* Module 6: Gradient Descent */}
       <Card title="6. Gradient Descent">
         <p className="mb-4 text-gray-700 dark:text-gray-300">
            Gradient Descent is an <span className="font-bold text-blue-500">iterative optimization algorithm</span>. It starts with random initial values for <span className="font-mono">β₀</span> and <span className="font-mono">β₁</span>, and gradually updates them to minimize the cost.
         </p>
         <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">The update rules are:</p>
         
         {/* Update Rules from Screenshot e35453.png */}
         <MathBlock formula="\beta_1 := \beta_1 - \alpha \frac{\partial J}{\partial \beta_1} = \beta_1 - \alpha \frac{1}{m} \sum_{i=1}^{m} (\hat{y}_i - y_i) \cdot x_i" />
         <MathBlock formula="\beta_0 := \beta_0 - \alpha \frac{\partial J}{\partial \beta_0} = \beta_0 - \alpha \frac{1}{m} \sum_{i=1}^{m} (\hat{y}_i - y_i)" />
         
         {/* Variable Definitions from Screenshot e3541a.png */}
         <div className="mt-6 space-y-3">
             <p className="font-bold text-gray-900 dark:text-white">Where:</p>
             <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">α</strong> is the learning rate (step size)</span></li>
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">m</strong> is the number of training examples</span></li>
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">ŷᵢ</strong> is the predicted value for the i-th example</span></li>
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">yᵢ</strong> is the actual value for the i-th example</span></li>
                <li className="flex gap-2"><span className="text-gray-400">→</span> <span><strong className="text-gray-900 dark:text-white">xᵢ</strong> is the feature value for the i-th example</span></li>
             </ul>
         </div>

         {/* Pros & Cons from Screenshot e3541a.png */}
         <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Pros */}
            <div className="rounded-lg bg-green-50 p-5 border border-green-200 dark:bg-green-500/10 dark:border-green-500/20">
                <h5 className="mb-3 flex items-center gap-2 font-bold text-green-700 dark:text-green-400">💡 Pros:</h5>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2"><Check size={16} className="mt-0.5 text-green-600"/> Scales well to large datasets and high dimensions</li>
                    <li className="flex gap-2"><Check size={16} className="mt-0.5 text-green-600"/> Allows for online learning (data coming in streams)</li>
                </ul>
            </div>
            {/* Cons */}
            <div className="rounded-lg bg-red-50 p-5 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20">
                <h5 className="mb-3 flex items-center gap-2 font-bold text-red-700 dark:text-red-400">⚠️ Cons:</h5>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2"><X size={16} className="mt-0.5 text-red-600"/> Requires tuning of learning rate</li>
                    <li className="flex gap-2"><X size={16} className="mt-0.5 text-red-600"/> May get stuck in local minima (though MSE has a convex surface, so for linear regression, this is less of a problem)</li>
                </ul>
            </div>
         </div>
       </Card>

       {/* Module 7: Visual Representation */}
       <Card title="7. Visual Representation">
         <p className="mb-6 text-gray-700 dark:text-gray-300">Let's explore how changing the intercept and slope affects our regression line:</p>
         <ManualRegression />
       </Card>

       {/* Footer */}
       <div className="rounded-xl p-8 shadow-2xl transition-colors duration-300 bg-[#2e1065] text-white dark:bg-[#1e1b2e]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="text-left">
                <p className="text-sm font-bold uppercase tracking-widest text-pink-500 mb-2">Coming Up Next:</p>
                <h2 className="text-3xl font-bold mb-2">Build a Linear Regression Model</h2>
                <p className="text-purple-200 max-w-xl">Now that the theory is clear, build an interactive model.</p>
             </div>
             
             <Link href="/build" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 px-8 py-3 font-bold text-white transition-transform hover:scale-105 hover:shadow-lg">
                Continue <ArrowRight size={20} />
             </Link>
          </div>
       </div>
    </main>
  );
}