import ModuleHeader from "@/components/layout/ModuleHeader"; // Assume simple header
import TrainingSim from "@/components/visuals/TrainingSim";

export default function BuildPage() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto">
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-brand-text mb-2">Build A Linear Regression Model</h1>
            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-gradient-to-r from-orange-500 to-red-500"></div>
            </div>
        </div>

        <div className="space-y-8">
            <div className="rounded-xl bg-[#2e1065] p-6 border border-white/5">
                <h2 className="text-xl font-bold text-brand-accent mb-4">1. Let's Build The Model</h2>
                <p className="text-gray-300">
                    In this interactive module, select a dataset and watch how the model converges as you navigate through the training process.
                </p>
            </div>

            {/* The Main Simulation Component */}
            <TrainingSim />
        </div>
    </main>
  );
}