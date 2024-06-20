import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Crypto {
    id: string;
    symbol: string;
    name: string;
}

interface CryptoContextProps {
    selectedCrypto: Crypto | null;
    setSelectedCrypto: (crypto: Crypto | null) => void;
}

const CryptoContext = createContext<CryptoContextProps | undefined>(undefined);

export const CryptoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);

    return (
        <CryptoContext.Provider value={{ selectedCrypto, setSelectedCrypto }}>
            {children}
        </CryptoContext.Provider>
    );
};

export const useCrypto = (): CryptoContextProps => {
    const context = useContext(CryptoContext);
    if (!context) {
        throw new Error('useCrypto must be used within a CryptoProvider');
    }
    return context;
};
