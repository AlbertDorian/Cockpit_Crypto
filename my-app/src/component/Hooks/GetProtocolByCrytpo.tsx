import { useState, useEffect } from 'react';

interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    image?: {
        thumb?: string;
        small?: string;
        large?: string;
    };
    [key: string]: any; // Utilise le type `any` pour les autres champs que tu n'as pas besoin de typer précisément
}

const GetProtocolBySymbol = (symbol: string) => {
    const [ProtocolBySymbol, setProtocolBySymbol] = useState<CryptoData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCryptoData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.llama.fi/protocols`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data: CryptoData[] = await response.json();
                const crypto = data.find((item) => item.symbol.toLowerCase() === symbol.toLowerCase());
                if (!crypto) {
                    throw new Error('Crypto non trouvée');
                }
                setProtocolBySymbol(crypto);
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

        if (symbol) {
            fetchCryptoData();
        }
    }, [symbol]);

    return { ProtocolBySymbol, loading, error };
};

export default GetProtocolBySymbol;
