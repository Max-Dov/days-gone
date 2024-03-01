import React, { useEffect, useState } from 'react';
import { fetchDayBitsDescriptors, useDayBitsDescriptorsStore, saveDay } from '@zustand';
import { Day, DayBit } from '@types';
import { Placeholder } from '@shared';
import { Step } from './step.component';
import './day-completed-form.styles.scss';

interface DayCompletedFormProps {
  date: number;
}

/**
 * Form that collects DayBits how the day went and emits action to handle result.
 */
export const DayCompletedForm = ({
  date,
}: DayCompletedFormProps) => {
  const { dayBitsDescriptors } = useDayBitsDescriptorsStore();
  /**
   * Step iterator through DayBit descriptors array.
   */
  const [step, setStep] = useState<number>(0);
  const [day, setDay] = useState<Day>({
    date,
    bits: [],
  });

  const onStepCompleted = (dayBit: DayBit) => {
    setDay({ ...day, bits: [...day.bits, dayBit] });
    if (step === dayBitsDescriptors!.length - 1) {
      saveDay(day).catch(console.error);
    }
    setStep(step + 1);
  };

  const onBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  useEffect(() => {
    if (!dayBitsDescriptors) {
      fetchDayBitsDescriptors();
    }
  }, []);

  let content = null;
  const descriptorsLength = dayBitsDescriptors?.length;
  if (!dayBitsDescriptors) {
    content = <Placeholder>Loading questions..</Placeholder>;
  } else if (typeof descriptorsLength === 'number') {
    if (descriptorsLength === 0) {
      content = <Placeholder>No questions?</Placeholder>;
    } else if (step < descriptorsLength) {
      content = <Step
        descriptor={dayBitsDescriptors[step]}
        onComplete={onStepCompleted}
        onBack={onBack}
      />;
    } else if (step === descriptorsLength) {
       // todo add small "restart" or "back" inline button (no border, just underline)
      content = <Placeholder>Day saved! 🍀</Placeholder>;
    }
  }

  return <div className="day-completed-form">
    {content}
  </div>;
};