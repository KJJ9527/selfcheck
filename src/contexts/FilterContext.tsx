import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

interface FilterContextType {
  keyword: string;
  scene: string[];
  setKeyword: (keyword: string) => void;
  setScene: (scene: string[]) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [keyword, setKeyword] = useState('');
  const [scene, setScene] = useState<string[]>([]);

  return (
    <FilterContext.Provider value={{ keyword, scene, setKeyword, setScene }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};