import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../Hooks/CryptoContext";
import useCryptoData from "../Hooks/GetDataCryptoById";
import "./indicator.css";
import useHistoryData from "../Hooks/UseHistoryData";

const Communauty: React.FC<{ cryptoData: any }> = ({ cryptoData }) => {
    const navigate = useNavigate();
    const { selectedCrypto } = useCrypto();
    const { cryptoDataHistory: cryptoDataHistory7d } = useHistoryData(selectedCrypto?.id || '', 7);
    const { cryptoDataHistory: cryptoDataHistory30d } = useHistoryData(selectedCrypto?.id || '', 30);
    const { cryptoDataHistory: cryptoDataHistory90d } = useHistoryData(selectedCrypto?.id || '', 90);

    if (!cryptoData || !cryptoDataHistory7d || !cryptoDataHistory30d || !cryptoDataHistory90d) {
        return <div>Aucune donnée disponible</div>;
    }

    console.log("cc",cryptoDataHistory7d)
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
                    <td>Twitter/Di.Mcap</td>
                    <td>56</td>
                </tr>
                <tr>
                    <td>Twitter/Mcap</td>
                    <td className="valid" >{calculatePercentageChangeNoFix( cryptoData.market_data.market_cap.usd,cryptoData.community_data.twitter_followers )}</td>
                </tr>
                <tr>
                    <td>Abonnés Twitter</td>
                    <td className="valid" >{cryptoData.community_data.twitter_followers}</td>
                </tr>
                <tr>
                    <td>Twitter variation 30j</td>
                    <td className="valid" >{calculatePercentageChange(cryptoData.community_data.twitter_followers, cryptoDataHistory30d.community_data.twitter_followers)}%</td>
                </tr>
                <tr>
                    <td>Twitter variation 90j</td>
                    <td className="valid" >{calculatePercentageChange(cryptoData.community_data.twitter_followers, cryptoDataHistory90d.community_data.twitter_followers)}%</td>
                </tr>
                <tr>
                    <td>Dernier tweet sur X</td>
                    <td>15</td>
                </tr>
                <tr>
                    <td>Sentiment summary</td>
                    <td>75</td>
                </tr>
                <tr>
                    <td>Transactions en Asie</td>
                    <td>87</td>
                </tr>
                <tr>
                    <td>Communauté télégram</td>
                    <td className="valid" >{cryptoData.community_data.telegram_channel_user_count || 'indisponible'}</td>
                </tr>
                <tr>
                    <td>Communauté discord</td>
                    <td>6789</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Communauty;
