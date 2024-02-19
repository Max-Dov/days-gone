import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DAY_BITS_DESCRIPTORS_STORE_VERSION } from '@constants';
import { DayBitDescriptor } from '@types';

interface DayBitsDescriptorsStore {
  dayBitsDescriptors?: Array<DayBitDescriptor>;
}

export const useDayBitsDescriptorsStore = create<DayBitsDescriptorsStore>()(persist(
  (set, get) => ({
    setDescriptors: (descriptors: Array<DayBitDescriptor>) => {
      set({ dayBitsDescriptors: descriptors });
    }
  }),
  { name: 'day-bits-descriptors', version: DAY_BITS_DESCRIPTORS_STORE_VERSION },
));