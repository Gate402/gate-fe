import React, { createContext, useContext, useState, ReactNode } from 'react';

type Duration = '1d' | '7d' | '30d' | '6m' | '1y';

interface FilterContextType {
  duration: Duration;
  setDuration: (duration: Duration) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [duration, setDuration] = useState<Duration>('30d');

  return (
    <FilterContext.Provider value={{ duration, setDuration }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
