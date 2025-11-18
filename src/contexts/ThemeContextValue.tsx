// src/contexts/ThemeContextValue.tsx
import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface DarkModeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);
export default DarkModeContext;
