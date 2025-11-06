import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-8">
      <div className="max-w-4xl mx-auto px-6 flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
          <Leaf className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Smart Diet Planner
          </h1>
          <p className="text-sm text-gray-600">
            Answer a few quick questions to generate a personalized diet plan.
          </p>
        </div>
      </div>
    </header>
  );
}
