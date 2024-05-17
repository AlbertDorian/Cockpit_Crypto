export const getCryptoBySearch = async (search: string) => {
    console.log('data')

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data)

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
export const getPictureCryptoById = async(idCrypto : string)=>{
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
    } catch (error){
        console.error("Erreur lors de la récupération de l'image")
    }
};

