import { DayBitDescriptor } from '@types';
import { Day, DayBit } from "@types";

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

const generateDayBit = (id: string): DayBit => ({
  id,
  value: Math.trunc(Math.random() * 5 + 1) // from 1 to 5
})

const generateDay = (date: Date): Day => ({
  date: date.getTime(),
  bits: [
    generateDayBit('mood'),
    generateDayBit('sleepQuality'),
  ]
})

const startDate = new Date(2024, 1, 1).getTime();
const msInDay = 24 * 60 * 60 * 1000;

export const historyDays: Array<Day> = new Array(600)
.fill(1)
.map((_, index) => 
  generateDay(new Date(startDate + msInDay * index))
)
