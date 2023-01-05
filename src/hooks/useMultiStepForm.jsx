import { useState } from "react"

export default function useMultiStateForm({ steps }) {
    const [step, setStep] = useState(0);

    const prev = () => {
        setStep(step => step - 1);
    };

    const next = () => {
        setStep(step => step + 1);
    };

    const formSteps = steps(next, prev);

    return {
        step: formSteps[step],
        currentStep: step,
        next,
        prev       
    }
}