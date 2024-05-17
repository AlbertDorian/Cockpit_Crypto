import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import Communauty from '../Indicateurs/Communauty';
import Liquidity from '../Indicateurs/Liquidity';
import Momentum from '../Indicateurs/Momentum';
import Security from '../Indicateurs/Security';
import Technologie from '../Indicateurs/Technologie';
import Tockenomics from '../Indicateurs/Tockenomics';
import { useCrypto } from '../Hooks/CryptoContext';
import { getPictureCryptoById } from '../../Logique/Logic_Crypto';
import './HomePage.css';
import useCryptoData from "../Hooks/GetDataCryptoById";

const HomePageContent: React.FC = () => {
    const { selectedCrypto } = useCrypto();
    const [cryptoPicture, setCryptoPicture] = useState<string | null>(null);
    const { cryptoData} = useCryptoData(selectedCrypto?.id || '');

    useEffect(() => {
        const fetchCryptoPicture = async () => {
            if (selectedCrypto !== null) {
                const picture = await getPictureCryptoById(selectedCrypto.id);
                setCryptoPicture(picture);
            }
        };
        fetchCryptoPicture();
    }, [selectedCrypto]);

    if (!selectedCrypto) {
        return <div>Aucune cryptomonnaie sélectionnée</div>;
    }

    if (!cryptoData) {
        return <div>Aucune donnée disponible</div>;
    }

    return (
        <div className="main">
            <div className="information-crytpo">
                {cryptoPicture && (
                  <div className="crypto-picture">
                        <img src={cryptoPicture} alt={`${selectedCrypto.name} logo`} />
                   </div>
                )}
                <h2><strong>{selectedCrypto.name}</strong> ({selectedCrypto.id})</h2>

                <h2>${cryptoData.market_data.current_price.usd} $ </h2>
            </div>
            <div className="indicator-list">
                <Communauty />
                <Liquidity />
                <Momentum />
                <Technologie />
                <Security />
                <Tockenomics />
            </div>
        </div>
    );
};

const HomePage: React.FC = () => {
    return (
        <Layout>
            <HomePageContent />
        </Layout>
    );
};

export default HomePage;
