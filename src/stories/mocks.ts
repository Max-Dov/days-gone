import { DayBitDescriptor } from '@types';
import { ColorThemes } from '@constants/color-themes.enum';

export const dayBitDescriptorsMock: Array<DayBitDescriptor> = [{
  id: 'mood',
  displayName: 'Mood',
  question: 'How did you feel today?',
  type: 'number',
  color: ColorThemes.GAMMA
}, {
  id: 'sleep',
  displayName: 'Sleep',
  question: 'How did you sleep today?',
  type: 'number',
  color: ColorThemes.BETA
}, {
  id: 'outdoors',
  displayName: 'Outdoors',
  question: 'Did you go outdoors today?',
  type: 'boolean',
  color: ColorThemes.DELTA
}]