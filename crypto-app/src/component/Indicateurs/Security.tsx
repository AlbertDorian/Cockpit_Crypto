import React from 'react';
import "./indicator.css"


const Security: React.FC = () => {
    return (
        <div className="indicator-card">
            <div className="title-indicator">
                <h2>Sécurité</h2>
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
