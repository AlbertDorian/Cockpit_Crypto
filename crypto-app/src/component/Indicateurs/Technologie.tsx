import React from 'react';
import "./indicator.css";

const Technologie: React.FC<{ cryptoData: any }> = ({ cryptoData }) => {
    if (!cryptoData) {
        return <div>Aucune donnée disponible</div>;
    }

    return (
        <div className="indicator-card">
            <div className="title-indicator">
                <h2>Technologie</h2>
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
                    <td>Github 1er commit</td>
                    <td>123</td>
                </tr>
                <tr>
                    <td>Github dernier commit</td>
                    <td>456</td>
                </tr>
                <tr>
                    <td>Github évolution 7j</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>Github évolution 30j</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>Github commits 1 an</td>
                    <td>300</td>
                </tr>
                <tr>
                    <td>Github étoiles</td>
                    <td className="valid">{cryptoData.developer_data.stars}</td>
                </tr>
                <tr>
                    <td>Github abonnés</td>
                    <td className="valid">{cryptoData.developer_data.subscribers}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Technologie;
