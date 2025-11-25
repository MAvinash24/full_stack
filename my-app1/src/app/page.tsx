import ModuleHeader from "@/components/layout/ModuleHeader"; // Assume you built this simple component
import Card from "@/components/ui/Card";
import MathBlock from "@/components/ui/MathBlock";
import ManualRegression from "@/components/visuals/ManualRegression";

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto space-y-12">
       {/* Module 1: Definition */}
       <Card title="1. What is Linear Regression?">
         <p className="text-gray-300 mb-6 leading-relaxed">
            Linear Regression is one of the most fundamental techniques...
            It models the relationship between a <span className="text-blue-400 font-bold">dependent variable (Y)</span> and one or more <span className="text-blue-400 font-bold">independent variables (X)</span>.
         </p>
         <div className="bg-[#3b1c6b] p-4 rounded-lg border-l-4 border-brand-accent">
            <h4 className="font-bold text-brand-accent mb-2">Definition:</h4>
            <p className="text-sm">Linear Regression is a <span className="text-blue-300">supervised learning</span> algorithm...</p>
         </div>
       </Card>

       {/* Module 2: Math */}
       <Card title="2. Mathematical Formulation">
         <p className="text-gray-300">The simplest form can be expressed as:</p>
         <MathBlock formula="Y = \beta_0 + \beta_1 X + \epsilon" />
         <ul className="space-y-2 text-sm text-gray-400 mt-4">
            <li>→ <strong className="text-white">Y</strong> is the dependent variable</li>
            <li>→ <strong className="text-white">β₀</strong> is the y-intercept</li>
            <li>→ <strong className="text-white">β₁</strong> is the slope</li>
         </ul>
       </Card>

       {/* Module 3: Visual Representation */}
       <Card title="3. Visual Representation">
         <p className="mb-6 text-gray-300">Let's explore how changing the intercept and slope affects our regression line:</p>
         <ManualRegression />
       </Card>

       {/* Module 4: Cost Function */}
       <Card title="4. Understanding the Cost Function (MSE)">
         <p className="text-gray-300">To find the best line, we minimize the error using Mean Squared Error:</p>
         <MathBlock formula="MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2" />
       </Card>
    </main>
  );
}