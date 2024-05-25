// src/contexts/IndicatorsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface IndicatorsContextProps {
    overallPercentage: number;
    updateIndicatorScore: (indicator: string, score: number) => void;
}

interface IndicatorsProviderProps {
    children: ReactNode;
}

const IndicatorsContext = createContext<IndicatorsContextProps | undefined>(undefined);

export const IndicatorsProvider: React.FC<IndicatorsProviderProps> = ({ children }) => {
    const [scores, setScores] = useState<{ [key: string]: number }>({});
    const [overallPercentage, setOverallPercentage] = useState<number>(0);

    const updateIndicatorScore = (indicator: string, score: number) => {
        setScores((prevScores) => {
            const newScores = { ...prevScores, [indicator]: score };
            const total = Object.values(newScores).reduce((acc, curr) => acc + curr, 0);
            const average = total / Object.values(newScores).length;
            setOverallPercentage(average);
            return newScores;
        });
    };

    return (
        <IndicatorsContext.Provider value={{ overallPercentage, updateIndicatorScore }}>
            {children}
        </IndicatorsContext.Provider>
    );
};

export const useIndicators = () => {
    const context = useContext(IndicatorsContext);
    if (context === undefined) {
        throw new Error('useIndicators must be used within an IndicatorsProvider');
    }
    return context;
};
