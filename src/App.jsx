import { useMemo, useState } from "react";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import QuestionStep from "./components/QuestionStep";
import PlanSummary from "./components/PlanSummary";

const TOTAL_STEPS = 4;

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const [generated, setGenerated] = useState(false);

  const canProceed = useMemo(() => {
    if (step === 1) return form.age && form.sex && form.height && form.weight;
    if (step === 2) return form.goal && form.activity;
    if (step === 3) return true;
    if (step === 4) return form.meals && form.breakfast && form.dinner;
    return false;
  }, [step, form]);

  const onChange = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onNext = () => {
    if (!canProceed) return;
    if (step < TOTAL_STEPS) setStep(step + 1);
    else setGenerated(true);
  };

  const onBack = () => setStep((s) => Math.max(1, s - 1));

  const onReset = () => {
    setForm({});
    setStep(1);
    setGenerated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-green-100">
      <Header />

      <main className="max-w-4xl mx-auto px-6 pb-16">
        <div className="sticky top-0 z-10 bg-gradient-to-b from-green-50 via-emerald-50 to-transparent pt-4 pb-6">
          <ProgressBar current={generated ? TOTAL_STEPS : step} total={TOTAL_STEPS} />
          <div className="mt-2 text-sm text-gray-600">
            Step {generated ? TOTAL_STEPS : step} of {TOTAL_STEPS}
          </div>
        </div>

        {!generated ? (
          <div className="mt-4">
            <QuestionStep
              step={step}
              data={form}
              onChange={onChange}
              onNext={onNext}
              onBack={onBack}
              isLast={step === TOTAL_STEPS}
            />
            {!canProceed && (
              <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-3">
                Please complete the required fields to continue.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-6">
            <PlanSummary data={form} onReset={onReset} />
          </div>
        )}
      </main>

      <footer className="py-10 text-center text-xs text-gray-500">
        Built with care. This is not medical advice; consult a professional for personalized guidance.
      </footer>
    </div>
  );
}
