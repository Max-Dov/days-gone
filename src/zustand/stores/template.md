You can use following template to create stores:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORE_VERSION } from '@constants';

interface ExampleStore {
  exampleContents: unknown;
}

export const useExampleStore = create<ExampleStore>()(persist(
  (set, _get) => ({
    
  }),
  { name: 'store-name', version: STORE_VERSION },
));
```