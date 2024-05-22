import React from 'react';
import {useCrypto} from "../Hooks/CryptoContext";
import useCryptoData from "../Hooks/GetDataCryptoById";
import "./indicator.css"


const Tokenomics: React.FC<{ cryptoData: any }> = ({ cryptoData }) => {

    const { selectedCrypto } = useCrypto();



    if (!cryptoData) {
        return <div>Aucune donnée disponible</div>;
    }

    return (
        <div className="indicator-card">
            <div className="title-indicator">
                <h2>Tokenomics</h2>
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
                    <td>% déjà distribué</td>
                    <td className="valid">
                        {((cryptoData.market_data.circulating_supply / cryptoData.market_data.total_supply) * 100).toFixed(2)} %
                    </td>



                </tr>
                <tr>
                    <td>Niveau record (ATH)</td>
                    <td className="valid">{cryptoData.market_data.ath.usd} $</td>
                </tr>
                <tr>
                    <td>ATH</td>
                    <td>
                        {new Date(cryptoData.market_data.ath_date.usd).toISOString().split('T')[0]}
                    </td>
                </tr>
                <tr>
                    <td>Diff supply ATH</td>
                    <td className="valid">{cryptoData.market_data.ath_change_percentage.usd.toFixed(2)} %</td>
                </tr>
                <tr>
                    <td>Diff supply 30j</td>
                    <td className="valid">{cryptoData.market_data.price_change_percentage_30d.toFixed(2)} %</td>
                </tr>
                <tr>
                    <td>Skynet gouvemance</td>
                    <td>80</td>
                </tr>
                <tr>
                    <td>Adr. 1 an/Mcap</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>Adr. 1 an/dil.Mcap</td>
                    <td>35</td>
                </tr>
                <tr>
                    <td>Dérivés 1 paires</td>
                    <td>40</td>
                </tr>
                <tr>
                    <td>Détention moyenne</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>Courbe prix depuis</td>
                    <td>75</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Tokenomics;
