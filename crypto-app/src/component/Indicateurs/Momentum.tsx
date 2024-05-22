import React from 'react';
import "./indicator.css"


const Momentum: React.FC<{ cryptoData: any }> = ({ cryptoData }) => {
    return (
        <div className="indicator-card">
            <div className="title-indicator">
                <h2>Momentum</h2>
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
                    <td>Écart prix 7j</td>
                    <td>15</td>
                </tr>
                <tr>
                    <td>Écart prix 30j</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td>Écart TVL 7j</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>Écart TVL 30j</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>Cashtags 24h/7j</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>Cashtags 31/30j</td>
                    <td>40</td>
                </tr>
                <tr>
                    <td>Baleines top3catég 7j</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Baleines top 3catég 30j</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>Skynet marché</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td>Adr Actives 1j</td>
                    <td>18</td>
                </tr>
                <tr>
                    <td>Augm supply 7j</td>
                    <td>22</td>
                </tr>
                <tr>
                    <td>TâcheCycle low 29.03.24</td>
                    <td>35</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Momentum;
