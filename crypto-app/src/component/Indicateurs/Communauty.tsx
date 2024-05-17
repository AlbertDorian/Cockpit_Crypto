import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../Hooks/CryptoContext";
import useCryptoData from "../Hooks/GetDataCryptoById";
import "./indicator.css"

const Communauty: React.FC = () => {
    const navigate = useNavigate();
    const { selectedCrypto } = useCrypto();
    const { cryptoData} = useCryptoData(selectedCrypto?.id || '');


    if (!cryptoData) {
        return <div>Aucune donnée disponible</div>;
    }

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
                    <td>42</td>
                </tr>
                <tr>
                    <td>Twitter/Di.Mcap</td>
                    <td>56</td>
                </tr>
                <tr>
                    <td>Twitter/Mcap</td>
                    <td>78</td>
                </tr>
                <tr>
                    <td>Abonnés Twitter</td>
                    <td>{cryptoData.community_data.twitter_followers}</td>
                </tr>
                <tr>
                    <td>Twitter variation 30j</td>
                    <td>64</td>
                </tr>
                <tr>
                    <td>Twitter variation 90j</td>
                    <td>92</td>
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
                    <td>5432</td>
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
