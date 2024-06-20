// src/Indicateurs/Security.tsx
import React, { useEffect } from 'react';
import "./indicator.css";
import { useCrypto } from "../Hooks/CryptoContext";
import ProgressBar from "../ProgressBar";
import { useIndicators } from "../../contexts/IndicatorsContext";

const Security: React.FC<{ cryptoData: any }> = ({ cryptoData }) => {
    const { selectedCrypto } = useCrypto();
   /** const { updateIndicatorScore } = useIndicators();



    useEffect(() => {
        if (cryptoData) {
            const securityScore = 100; // Remplacer par le calcul réel si nécessaire
            updateIndicatorScore('security', securityScore);
        }
    }, [cryptoData, updateIndicatorScore]);
**/
    const navigateSkynet = () => {
        window.open(`https://skynet.certik.com/projects/${selectedCrypto?.id || ''}`)
    }

    if (!cryptoData) {
        return <div>Aucune donnée disponible</div>;
    }

    return (
        <div className="indicator-card" onClick={navigateSkynet}>
            <div className="title-indicator">
                <h2>Sécurité</h2>
                <ProgressBar percentage={100} /> {/* Mettre à jour le pourcentage */}
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
                    <td>Skynet global</td>
                    <td>85</td>
                </tr>
                <tr>
                    <td>Skynet code</td>
                    <td>90</td>
                </tr>
                <tr>
                    <td>Skynet operation</td>
                    <td>80</td>
                </tr>
                <tr>
                    <td>De Fi score global</td>
                    <td>75</td>
                </tr>
                <tr>
                    <td>Github avant crypto</td>
                    <td>88</td>
                </tr>
                <tr>
                    <td>Version du code vs Version auditée</td>
                    <td>95</td>
                </tr>
                <tr>
                    <td>Score de SCAM</td>
                    <td>40</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Security;
