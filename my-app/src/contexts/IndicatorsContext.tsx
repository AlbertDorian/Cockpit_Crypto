import React, { createContext, useContext, useState, useEffect } from 'react';
import { debounce } from 'lodash';

interface IndicatorContextProps {
    overallPercentage: number;
    updateIndicatorScore: (indicator: string, score: number) => void;
}

const IndicatorsContext = createContext<IndicatorContextProps | undefined>(undefined);

export const IndicatorsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [scores, setScores] = useState<{ [key: string]: number }>({});
    const [overallPercentage, setOverallPercentage] = useState(0);

    const updateIndicatorScore = debounce((indicator: string, score: number) => {
        setScores((prevScores) => ({
            ...prevScores,
            [indicator]: score,
        }));
    }, 300);

    useEffect(() => {
        const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
        const averageScore = Object.keys(scores).length > 0 ? totalScore / Object.keys(scores).length : 0;
        setOverallPercentage(averageScore);
    }, [scores]);

    return (
        <IndicatorsContext.Provider value={{ overallPercentage, updateIndicatorScore }}>
            {children}
        </IndicatorsContext.Provider>
    );
};

export const useIndicators = (): IndicatorContextProps => {
    const context = useContext(IndicatorsContext);
    if (!context) {
        throw new Error('useIndicators must be used within an IndicatorsProvider');
    }
    return context;
};
