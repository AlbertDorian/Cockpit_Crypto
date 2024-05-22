import React from 'react';
import {useNavigate} from "react-router-dom";
import "./indicator.css"
import {useCrypto} from "../Hooks/CryptoContext";
import useCryptoData from "../Hooks/GetDataCryptoById";
import useHistoryData from "../Hooks/UseHistoryData";

const Liquidity: React.FC<{ cryptoData: any }> = ({ cryptoData }) => {
    const navigate = useNavigate();
    const { selectedCrypto } = useCrypto();
    const { cryptoDataHistory: cryptoDataHistory1d } = useHistoryData(selectedCrypto?.id || '', 1);

    console.log(cryptoDataHistory1d)

    if (!cryptoData) {
        return <div>Aucune donnée disponible</div>;
    }
    const calculatePercentageChange = (current: number, previous: number) => {
        if (previous === 0) return 'N/A';
        return ((current / previous) * 100).toFixed(2);
    };

    const calculatePercentageChangeNoFix = (current: number, previous:number) => {
        if (previous === 0) return 'N/A';
        const percentage = (current / previous) * 100;
        return percentage.toExponential(2);
    };
    return (
        <div className="indicator-card">
            <div className="title-indicator">
                <h2>Liquidité</h2>
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
                    <td className="valid">{calculatePercentageChange(cryptoData.market_data.total_volume.usd,cryptoData.market_data.market_cap.usd)}</td>
                </tr>
                <tr>
                    <td>Tvl/mcap</td>
                    <td>0.78</td>
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



