import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./indicator.css";
import { useCrypto } from "../Hooks/CryptoContext";
import useHistoryData from "../Hooks/UseHistoryData";
import GetProtocolBySymbol from "../Hooks/GetProtocolByCrytpo";
import ProgressBar from "../ProgressBar";
import { useIndicators } from "../../contexts/IndicatorsContext";

const Liquidity: React.FC<{ cryptoData: any }> = ({ cryptoData }) => {
    const navigate = useNavigate();
    const { selectedCrypto } = useCrypto();
    const { cryptoDataHistory: cryptoDataHistory1d } = useHistoryData(selectedCrypto?.id || '', 1);
    const { ProtocolBySymbol: ProtocolBySymbol } = GetProtocolBySymbol(cryptoData?.symbol || '');
    const { updateIndicatorScore } = useIndicators();

    useEffect(() => {
        if (cryptoData) {
            const liquidityScore = 55; // Remplacer par le calcul réel si nécessaire
            updateIndicatorScore('liquidity', liquidityScore);
        }
    }, [cryptoData, updateIndicatorScore]);

    if (!cryptoData || !ProtocolBySymbol) {
        return <div>Aucune donnée disponible</div>;
    }

    const calculatePercentageChange = (current: number, previous: number) => {
        if (previous === 0) return 'N/A';
        return ((current / previous) * 100).toFixed(2);
    };

    return (
        <div className="indicator-card">
            <div className="title-indicator">
                <h2>Liquidité</h2>
                <ProgressBar percentage={55} />
            </div>
            <table>
                <thead>
                <tr>
                    <th>Indicateur</th>
                    <th>Valeur</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Volume 24h</td>
                    <td className="valid">{cryptoData.market_data.total_volume.usd}</td>
                </tr>
                <tr>
                    <td>Volume/mcap</td>
                    <td className="valid">{calculatePercentageChange(cryptoData.market_data.total_volume.usd, cryptoData.market_data.market_cap.usd)}</td>
                </tr>
                <tr>
                    <td>Tvl/mcap</td>
                    <td className="valid">{calculatePercentageChange(cryptoData.market_data.total_volume.usd, ProtocolBySymbol.tvl)}</td>
                </tr>
                <tr>
                    <td>Paires Spot</td>
                    <td>123</td>
                </tr>
                <tr>
                    <td>Dérivés 1 paires</td>
                    <td>45</td>
                </tr>
                <tr>
                    <td>Dérivés /mcap</td>
                    <td>0.67</td>
                </tr>
                <tr>
                    <td>Dérivés /spot</td>
                    <td>1.23</td>
                </tr>
                <tr>
                    <td>Stack liq score</td>
                    <td>8.9</td>
                </tr>
                <tr>
                    <td>Stack variation 7jours</td>
                    <td>5.6</td>
                </tr>
                <tr>
                    <td>Stack variation 30jours</td>
                    <td>7.8</td>
                </tr>
                <tr>
                    <td>Stack variation 90jours</td>
                    <td>9.1</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Liquidity;
