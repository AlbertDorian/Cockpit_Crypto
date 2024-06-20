import { useState, useEffect } from 'react';

interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    [key: string]: any; // Utilise le type `any` pour les autres champs que tu n'as pas besoin de typer précisément
}

const useDataProtocol = (slug: string) => {
    const [protocolData, setCryptoData] = useState<CryptoData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCryptoData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.llama.fi/protocol/${slug}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                setCryptoData(data);
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

        if (slug) {
            fetchCryptoData();
        }
    }, [slug]);

    return { protocolData, loading, error };
};

export default useDataProtocol;
