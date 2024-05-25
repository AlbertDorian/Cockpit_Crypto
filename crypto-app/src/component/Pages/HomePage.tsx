// src/components/HomePageContent.tsx
import React, { useEffect, useState } from 'react';
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
import useCryptoData from '../Hooks/GetDataCryptoById';
import ProgressBar from '../ProgressBar';
import { IndicatorsProvider, useIndicators } from '../../contexts/IndicatorsContext';
import TradingViewWidget from '../Chart/Chart';
import useGoogleTrends from '../Hooks/useGoogleTrends';
import GoogleTrendsChart from '../Chart/GoogleTrendsChart';

const HomePageContent: React.FC = () => {
    const { selectedCrypto } = useCrypto();
    const [cryptoPicture, setCryptoPicture] = useState<string | null>(null);
    const { cryptoData } = useCryptoData(selectedCrypto?.id || '');
    const { overallPercentage } = useIndicators();
    const { data: trendsData, error: trendsError } = useGoogleTrends(selectedCrypto?.name || 'bitcoin');

    useEffect(() => {
        const fetchCryptoPicture = async () => {
            if (selectedCrypto) {
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
            <div className="information-crypto">
                {cryptoPicture && (
                    <div className="crypto-picture">
                        <img src={cryptoPicture} alt={`${selectedCrypto.name} logo`} />
                    </div>
                )}
                <h2><strong>{selectedCrypto.name}</strong> ({selectedCrypto.id})</h2>
                <h2>${cryptoData.market_data.current_price.usd} $</h2>
                <ProgressBar percentage={overallPercentage} />
            </div>
            <div className="dataChart">
                <div className="card-chart">
                <TradingViewWidget idCoin={selectedCrypto.symbol} />
                </div>
                <div className="card-chart">
                    {trendsError && <div>Erreur lors de la récupération des tendances Google: {trendsError}</div>}
                    {trendsData && (
                        <div>
                            <h3>Tendances Google pour {selectedCrypto.name}</h3>
                            <GoogleTrendsChart trendsData={trendsData} />
                        </div>
                    )}
                </div>
            </div>
            <div className="indicator-list">
                <Communauty cryptoData={cryptoData} />
                <Liquidity cryptoData={cryptoData} />
                <Momentum cryptoData={cryptoData} />
                <Technologie cryptoData={cryptoData} />
                <Security cryptoData={cryptoData} />
                <Tockenomics cryptoData={cryptoData} />
            </div>
        </div>
    );
};

const HomePage: React.FC = () => {
    return (
        <Layout>
            <IndicatorsProvider>
                <HomePageContent />
            </IndicatorsProvider>
        </Layout>
    );
};

export default HomePage;
