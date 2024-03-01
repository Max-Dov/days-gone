import { DayBit, DayBitDescriptor } from '@types';
import React from 'react';
import classNames from 'classnames';

interface StepProps {
  descriptor: DayBitDescriptor;
  onComplete: (value: DayBit) => void;
  onBack: () => void;
}

export const Step = ({ descriptor, onComplete, onBack }: StepProps) => {
  const { question, color, id } = descriptor;

  return <div className={classNames('step-container', color)}>
    {question}
    <div className="action-buttons-row">
      <button className={color} onClick={onBack}>Prev</button>
      <button className={color} onClick={() => onComplete({ id, value: 1 })}>Next</button>
    </div>
  </div>;
};