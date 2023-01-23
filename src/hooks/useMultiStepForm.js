import { useState } from "react";

const useMultiStepForm = (initialState) => {
    const [step, setStep] = useState(0);
    const [formState, setFormState] = useState(initialState);

    const next = () => {
        setStep(step => step + 1);
    };

    const prev = () => {
        setStep(step => step - 1);
    };

    const onChange = e => {
        setFormState(formState => ({ ...formState, [e.target.name]: e.target.value }));
    };

    return {
        currentStep: step,
        setStep,
        next,
        prev,
        formState,
        onChange
    }
};

export default useMultiStepForm;