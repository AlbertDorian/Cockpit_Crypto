import fetch from 'node-fetch';

export const getCryptoBySearch = async (search: string) => {
    console.log('Fetching crypto list...');

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        // Filtrer les résultats par la variable de recherche
        const filteredData = data.filter((crypto: { id: string, symbol: string, name: string }) =>
            crypto.id.toLowerCase().includes(search.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(search.toLowerCase()) ||
            crypto.name.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 10); // Prendre seulement les 10 premiers résultats

        return filteredData;
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

export const getPictureCryptoById = async (idCrypto: string) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${idCrypto}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        const linkPicture = data.image.small;
        return linkPicture;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'image:", error);
        return null;
    }
};

interface PriceData {
    prices: Array<[number, number]>;
    market_caps: Array<[number, number]>;
    total_volumes: Array<[number, number]>;
}
// src/Logique/Logic_Crypto.ts
export const getDataPriceChatById = async (idCrypto: string, days: string): Promise<PriceData> => {
    const url = `https://api.coingecko.com/api/v3/coins/${idCrypto}/market_chart?vs_currency=usd&days=${days}&interval=daily&precision=2`;
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-VLb7kertnZ6gBPeV5HDKD2H4' }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: PriceData = await response.json();
        return data;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};

