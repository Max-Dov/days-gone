import { DayBit, DayBitDescriptor } from '@types';
import React, { useEffect } from 'react';

interface StepProps {
  descriptor: DayBitDescriptor;
  onComplete: (value: DayBit) => void;
}

export const Step = ({ descriptor, onComplete }: StepProps) => {
  const { question, color, id } = descriptor;

  useEffect(() => {
    document.documentElement.style.setProperty('--current-step-color', color);
  }, [color]);

  return <div className="step-container">
    {question}
    <button onClick={() => onComplete({ id, value: 1 })}>Complete</button>
  </div>;
};