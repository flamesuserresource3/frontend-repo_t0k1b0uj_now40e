function calcBMR({ sex, age, height, weight }) {
  if (!sex || !age || !height || !weight) return null;
  if (sex === "male") return 10 * weight + 6.25 * height - 5 * age + 5;
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

function activityFactor(level) {
  switch (level) {
    case "sedentary":
      return 1.2;
    case "light":
      return 1.375;
    case "moderate":
      return 1.55;
    case "very":
      return 1.725;
    default:
      return 1.2;
  }
}

function macroSplit(goal) {
  // returns [carbs, protein, fats]
  switch (goal) {
    case "lose":
      return [0.35, 0.35, 0.30];
    case "gain":
      return [0.45, 0.30, 0.25];
    default:
      return [0.45, 0.30, 0.25];
  }
}

function kcalAdjustment(goal) {
  if (goal === "lose") return -400;
  if (goal === "gain") return 300;
  return 0;
}

function gramsFromSplit(kcal, [c, p, f]) {
  return {
    carbs: Math.round((kcal * c) / 4),
    protein: Math.round((kcal * p) / 4),
    fats: Math.round((kcal * f) / 9),
  };
}

function buildMeals(meals, prefs) {
  const base = [
    {
      name: "Breakfast",
      items: ["Greek yogurt with berries", "Oats", "Chia seeds"],
    },
    { name: "Lunch", items: ["Grilled chicken", "Quinoa", "Mixed greens"] },
    { name: "Snack", items: ["Apple", "Peanut butter", "Almonds"] },
    { name: "Dinner", items: ["Salmon", "Sweet potato", "Broccoli"] },
  ];

  // simple filtering by preferences
  const avoid = (prefs.allergies || "").toLowerCase();
  const diet = prefs.diet || "balanced";

  return base
    .slice(0, meals)
    .map((m) => ({
      ...m,
      items: m.items.filter((i) => !avoid || !i.toLowerCase().includes(avoid)).map((i) => {
        if (diet === "vegan") return i.replace(/(chicken|salmon|yogurt)/gi, "tofu");
        if (diet === "vegetarian") return i.replace(/(chicken|salmon)/gi, "paneer");
        if (diet === "keto") return i.replace(/(oats|sweet potato|quinoa)/gi, "cauli rice");
        if (diet === "low-carb") return i.replace(/(oats|quinoa)/gi, "eggs");
        return i;
      }),
    }));
}

export default function PlanSummary({ data, onReset }) {
  const bmr = calcBMR(data);
  const tdee = bmr ? Math.round(bmr * activityFactor(data.activity || "sedentary")) : null;
  const targetKcal = tdee ? Math.max(1200, tdee + kcalAdjustment(data.goal)) : null;
  const macros = targetKcal ? gramsFromSplit(targetKcal, macroSplit(data.goal)) : null;
  const meals = buildMeals(Number(data.meals || 3), data);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Your diet plan</h2>
      <p className="text-gray-600 text-sm">Generated from your answers.</p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-green-50 border border-green-100">
          <p className="text-sm text-green-700">Daily calories</p>
          <p className="text-2xl font-semibold text-green-900">{targetKcal ? `${targetKcal} kcal` : "—"}</p>
        </div>
        <div className="p-4 rounded-xl bg-green-50 border border-green-100">
          <p className="text-sm text-green-700">Macros</p>
          <p className="text-green-900">
            {macros ? `${macros.carbs}g C / ${macros.protein}g P / ${macros.fats}g F` : "—"}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-green-50 border border-green-100">
          <p className="text-sm text-green-700">Meals</p>
          <p className="text-green-900">{meals.length} per day</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {meals.map((m, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-green-100">
            <p className="font-medium text-gray-900">{m.name}</p>
            <ul className="mt-1 list-disc list-inside text-gray-700">
              {m.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={onReset} className="px-4 py-2 rounded-lg text-green-700 hover:bg-green-50">Start over</button>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Save as PDF (coming soon)
        </a>
      </div>
    </div>
  );
}
