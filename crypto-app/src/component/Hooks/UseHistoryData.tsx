import { useState, useEffect } from 'react';

// Fonction pour obtenir la date au format YYYY-MM-DD un certain nombre de jours avant aujourd'hui
const getDateDaysAgo = (daysAgo: number) => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysAgo);

    const year = pastDate.getFullYear();
    const month = String(pastDate.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
    const day = String(pastDate.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
};

interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    community_data: {
        twitter_followers: number;
        telegram_channel_user_count: number;
    };
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    [key: string]: any; // Utilise le type `any` pour les autres champs que tu n'as pas besoin de typer précisément
}

const useHistoryData = (idCrypto: string, daysAgo: number) => {
    const [cryptoDataHistory, setCryptoDataHistory] = useState<CryptoData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const historyDate = getDateDaysAgo(daysAgo); // Utilise la fonction pour obtenir la date

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-WLB6YqysuiVhreBQWnNtcVT4'}
        };

        const fetchCryptoData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${idCrypto}/history?date=${historyDate}&localization=true`, options);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                setCryptoDataHistory(data);
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

        if (idCrypto) {
            fetchCryptoData();
        }
    }, [idCrypto, historyDate]);

    return { cryptoDataHistory, loading, error };
};

export default useHistoryData;
