import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Crypto {
    id: string;
    symbol: string;
    name: string;
}

interface CryptoListContextProps {
    cryptoList: Crypto[];
    loading: boolean;
    error: string | null;
}

const CryptoListContext = createContext<CryptoListContextProps | undefined>(undefined);

export const CryptoListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cryptoList, setCryptoList] = useState<Crypto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCryptoList = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                setCryptoList(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Une erreur inconnue est survenue');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCryptoList();
    }, []);

    return (
        <CryptoListContext.Provider value={{ cryptoList, loading, error }}>
            {children}
        </CryptoListContext.Provider>
    );
};

export const useCryptoList = (): CryptoListContextProps => {
    const context = useContext(CryptoListContext);
    if (!context) {
        throw new Error('useCryptoList must be used within a CryptoListProvider');
    }
    return context;
};
