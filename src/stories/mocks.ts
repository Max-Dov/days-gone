import { DayBitDescriptor } from '@types';

export const dayBitDescriptorsMock: Array<DayBitDescriptor> = [{
  id: 'mood',
  displayName: 'Mood',
  question: 'How did you feel today?',
  type: 'number',
  color: '#95D7AE'
}, {
  id: 'sleep',
  displayName: 'Sleep',
  question: 'How did you sleep today?',
  type: 'number',
  color: '#AB92BF'
}, {
  id: 'outdoors',
  displayName: 'Outdoors',
  question: 'Did you go outdoors today?',
  type: 'boolean',
  color: '#FFCB47'
}]