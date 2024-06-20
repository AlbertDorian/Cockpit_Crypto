// src/Indicateurs/Communauty.tsx
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./indicator.css";
import { useCrypto } from "../Hooks/CryptoContext";
import useHistoryData from "../Hooks/UseHistoryData";
import ProgressBar from "../ProgressBar";
import { useIndicators } from "../../contexts/IndicatorsContext";

const Communauty: React.FC<{ cryptoData: any }> = ({ cryptoData }) => {
    const navigate = useNavigate();
    const { selectedCrypto } = useCrypto();
    const { cryptoDataHistory: cryptoDataHistory7d } = useHistoryData(selectedCrypto?.id || '', 7);
    const { cryptoDataHistory: cryptoDataHistory30d } = useHistoryData(selectedCrypto?.id || '', 30);
    const { cryptoDataHistory: cryptoDataHistory90d } = useHistoryData(selectedCrypto?.id || '', 90);
    /**const { updateIndicatorScore } = useIndicators();

    useEffect(() => {
        if (cryptoData) {
            const communityScore = 80; // Remplacer par le calcul réel si nécessaire
            updateIndicatorScore('community', communityScore);
        }
    }, [cryptoData, updateIndicatorScore]);
**/
    if (!cryptoData || !cryptoDataHistory7d || !cryptoDataHistory30d || !cryptoDataHistory90d) {
        return <div>Aucune donnée disponible</div>;
    }

    const calculatePercentageChange = (current: number, previous: number) => {
        if (previous === 0) return 'N/A';
        return ((current - previous) / previous * 100).toFixed(2);
    };

    const calculatePercentageChangeNoFix = (current: number, previous:number) => {
        if (previous === 0) return 'N/A';
        const percentage = (current / previous) * 100;
        return percentage.toExponential(2);
    };

    return (
        <div className="indicator-card">
            <div className="title-indicator">
                <h2>Communauté</h2>
                <ProgressBar percentage={80} /> {/* Mettre à jour le pourcentage */}
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
                    <td>Twitter variation 7j</td>
                    <td className="valid">{calculatePercentageChange(cryptoData.community_data.twitter_followers, cryptoDataHistory7d.community_data.twitter_followers)}%</td>
                </tr>
                <tr>
                    <td>Abonnés Twitter</td>
                    <td className="valid">{cryptoData.community_data.twitter_followers}</td>
                </tr>
                <tr>
                    <td>Twitter variation 30j</td>
                    <td className="valid">{calculatePercentageChange(cryptoData.community_data.twitter_followers, cryptoDataHistory30d.community_data.twitter_followers)}%</td>
                </tr>
                <tr>
                    <td>Twitter variation 90j</td>
                    <td className="valid">{calculatePercentageChange(cryptoData.community_data.twitter_followers, cryptoDataHistory90d.community_data.twitter_followers)}%</td>
                </tr>
                <tr>
                    <td>Dernier tweet sur X</td>
                    <td>15</td>
                </tr>
                <tr>
                    <td>Nb tweet 30j</td>
                    <td>6789</td>
                </tr>
                <tr>
                    <td>Sentiment summary</td>
                    <td>75</td>
                </tr>

                <tr>
                    <td>Communauté télégram</td>
                    <td className="valid">{cryptoData.community_data.telegram_channel_user_count || 'indisponible'}</td>
                </tr>
                <tr>
                    <td>Communauté discord</td>
                    <td>6789</td>
                </tr>
                <tr>
                    <td>Airdrop</td>
                    <td>6789</td>
                </tr>
                <tr>
                    <td>Durée moyenne détention</td>
                    <td>6789</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Communauty;
