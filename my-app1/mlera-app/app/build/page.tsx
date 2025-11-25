import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ModuleHeader from "@/components/layout/ModuleHeader";
import Card from "@/components/ui/Card";
import BuildSimulation from "@/components/visuals/BuildSimulation";

export default function BuildPage() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto space-y-12 pb-24">
      
      {/* Header */}
      <ModuleHeader 
        title="Build A Linear Regression Model"
        currentStep={3}
        totalSteps={5}
        prevLink="/"
        breadcrumb="Build Linear Regression"
      />

      {/* Section 1: Intro */}
      <Card title="1. Lets Build The Model">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
           In this interactive module, you'll build a linear regression model using different datasets. 
           Select a dataset, adjust the learning rate and number of iterations, 
           then click "Build" to train your model. Watch how the model converges as you navigate through the training process.
        </p>
      </Card>

      {/* Simulation Component */}
      <BuildSimulation />

      {/* Footer: Quiz (Matches First Page Alignment) */}
      <div className="rounded-xl p-8 shadow-2xl transition-colors duration-300 bg-[#2e1065] text-white dark:bg-[#1e1b2e]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="text-left">
                <p className="text-sm font-bold uppercase tracking-widest text-pink-500 mb-2">Coming Up Next:</p>
                <h2 className="text-3xl font-bold mb-2">Quiz on Linear Regression</h2>
                <p className="text-purple-200 max-w-xl">Here's a short quiz to follow your interactive model page.</p>
             </div>
             
             {/* Button Aligned Right */}
             <Link href="#" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 px-8 py-3 font-bold text-white transition-transform hover:scale-105 hover:shadow-lg">
                Continue <ArrowRight size={20} />
             </Link>
          </div>
      </div>

    </main>
  );
}