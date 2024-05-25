import React, { useEffect } from 'react';
import "./indicator.css";
import useHistoryData from "../Hooks/UseHistoryData";
import GetProtocolBySymbol from "../Hooks/GetProtocolByCrytpo";
import GetDataProtocol from "../Hooks/GetDataProtocol";
import ProgressBar from "../ProgressBar";
import { useIndicators } from "../../contexts/IndicatorsContext";

const Momentum: React.FC<{ cryptoData: any }> = ({ cryptoData }) => {
    const { cryptoDataHistory: cryptoDataHistory7d } = useHistoryData(cryptoData?.id || '', 7);
    const { cryptoDataHistory: cryptoDataHistory30d } = useHistoryData(cryptoData?.id || '', 30);
    const { ProtocolBySymbol: protocolBySymbol } = GetProtocolBySymbol(cryptoData?.symbol || '');
    const { protocolData: protocolData } = GetDataProtocol(protocolBySymbol?.slug || '');
    const { updateIndicatorScore } = useIndicators();

    useEffect(() => {
        if (cryptoData) {
            const momentumScore = 45; // Remplacer par le calcul réel si nécessaire
            updateIndicatorScore('momentum', momentumScore);
        }
    }, [cryptoData, updateIndicatorScore]);

    if (!cryptoData || !cryptoDataHistory7d || !cryptoDataHistory30d || !protocolData || !protocolBySymbol) {
        return <div>Aucune donnée disponible</div>;
    }

    const calculatePercentageChange = (current: number, previous: number) => {
        if (previous === 0) return 'N/A';
        return ((current - previous) / previous * 100).toFixed(2);
    };

    const getUnixTimestampDaysAgo = (daysAgo: number): number => {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        date.setUTCHours(0, 0, 0, 0);
        return Math.floor(date.getTime() / 1000);
    };

    const findLiquidityAtTimestamp = (daysAgo: number): number => {
        const formattedDate = getUnixTimestampDaysAgo(daysAgo);
        const filteredData = protocolData.tvl.find((item: any) => {
            const itemDateUnix = Math.floor(new Date(item.date * 1000).getTime() / 1000);
            return itemDateUnix === formattedDate;
        });
        return filteredData ? filteredData.totalLiquidityUSD : 0;
    };

    return (
        <div className="indicator-card">
            <div className="title-indicator">
                <h2>Momentum</h2>
                <ProgressBar percentage={45} />
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
                    <td className="valid">{calculatePercentageChange(cryptoDataHistory7d.market_data.current_price.usd, cryptoData.market_data.current_price.usd)}%</td>
                </tr>
                <tr>
                    <td>Écart prix 30j</td>
                    <td className="valid">{calculatePercentageChange(cryptoDataHistory30d.market_data.current_price.usd, cryptoData.market_data.current_price.usd)}%</td>
                </tr>
                <tr>
                    <td>Écart TVL 7j</td>
                    <td className="valid">{calculatePercentageChange(findLiquidityAtTimestamp(7), protocolBySymbol.tvl)}%</td>
                </tr>
                <tr>
                    <td>Écart TVL 30j</td>
                    <td className="valid">{calculatePercentageChange(findLiquidityAtTimestamp(30), protocolBySymbol.tvl)}%</td>
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
