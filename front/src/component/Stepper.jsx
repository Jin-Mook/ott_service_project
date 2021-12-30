import React, { useState } from "react";

export default function Stepper({ children, step, onNext, onPrev }) {
  return React.cloneElement(children[step], {
    onNext,
    onPrev,
  });
}

export function useStepper() {
  const [step, setStep] = useState(0);
  const increaseStep = () => setStep((s) => s + 1);
  const decreaseStep = () => setStep((s) => s - 1);

  const register = () => ({
    step,
    onNext: increaseStep,
    onPrev: decreaseStep,
  });

  return register;
}
