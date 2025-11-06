import { useEffect } from "react";

export default function QuestionStep({ step, data, onChange, onNext, onBack, isLast }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const fieldClass = "mt-2 w-full rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-3 outline-none";

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Basic details</h2>
          <p className="text-gray-600 text-sm">Tell us about yourself.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Age</label>
              <input type="number" min="1" value={data.age || ""} onChange={(e) => onChange({ age: Number(e.target.value) })} className={fieldClass} placeholder="e.g., 29" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Sex</label>
              <select value={data.sex || ""} onChange={(e) => onChange({ sex: e.target.value })} className={fieldClass}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700">Height (cm)</label>
              <input type="number" min="50" value={data.height || ""} onChange={(e) => onChange({ height: Number(e.target.value) })} className={fieldClass} placeholder="e.g., 175" />
            </div>
            <div>
              <label className="text-sm text-gray-700">Weight (kg)</label>
              <input type="number" min="20" value={data.weight || ""} onChange={(e) => onChange({ weight: Number(e.target.value) })} className={fieldClass} placeholder="e.g., 70" />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Goals & activity</h2>
          <p className="text-gray-600 text-sm">Choose what you want to achieve.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Primary goal</label>
              <select value={data.goal || ""} onChange={(e) => onChange({ goal: e.target.value })} className={fieldClass}>
                <option value="">Select</option>
                <option value="lose">Lose fat</option>
                <option value="maintain">Maintain</option>
                <option value="gain">Gain muscle</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700">Activity level</label>
              <select value={data.activity || ""} onChange={(e) => onChange({ activity: e.target.value })} className={fieldClass}>
                <option value="">Select</option>
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly active</option>
                <option value="moderate">Moderately active</option>
                <option value="very">Very active</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Diet preferences</h2>
          <p className="text-gray-600 text-sm">We’ll tailor your plan to your tastes.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Diet type</label>
              <select value={data.diet || ""} onChange={(e) => onChange({ diet: e.target.value })} className={fieldClass}>
                <option value="">No preference</option>
                <option value="balanced">Balanced</option>
                <option value="keto">Keto</option>
                <option value="low-carb">Low carb</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700">Allergies / avoid</label>
              <input type="text" value={data.allergies || ""} onChange={(e) => onChange({ allergies: e.target.value })} className={fieldClass} placeholder="e.g., peanuts, dairy" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-700">Budget per day ($)</label>
              <input type="number" min="0" value={data.budget || ""} onChange={(e) => onChange({ budget: Number(e.target.value) })} className={fieldClass} placeholder="e.g., 15" />
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Meal timing</h2>
          <p className="text-gray-600 text-sm">When do you like to eat?</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-700">Meals per day</label>
              <select value={data.meals || ""} onChange={(e) => onChange({ meals: Number(e.target.value) })} className={fieldClass}>
                <option value="">Select</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700">Breakfast time</label>
              <input type="time" value={data.breakfast || ""} onChange={(e) => onChange({ breakfast: e.target.value })} className={fieldClass} />
            </div>
            <div>
              <label className="text-sm text-gray-700">Dinner time</label>
              <input type="time" value={data.dinner || ""} onChange={(e) => onChange({ dinner: e.target.value })} className={fieldClass} />
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button onClick={onBack} disabled={step === 1} className="px-4 py-2 rounded-lg text-green-700 hover:bg-green-50 disabled:opacity-40">Back</button>
        <button onClick={onNext} className="px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700">
          {isLast ? "Generate plan" : "Next"}
        </button>
      </div>
    </div>
  );
}
