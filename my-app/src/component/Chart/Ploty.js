import React from 'react';
import Plot from 'react-plotly.js';

const StrategyChart = ({ pricesBySymbol }) => {
    if (!pricesBySymbol || Object.keys(pricesBySymbol).length === 0) {
        return <div>Aucune donnée disponible pour afficher le graphique.</div>;
    }

    const traces = Object.keys(pricesBySymbol).map((symbol, index) => {
        const prices = pricesBySymbol[symbol];
        return {
            x: prices.map(([time, price]) => new Date(time)),
            y: prices.map(([time, price]) => price),
            type: 'scatter',
            mode: 'lines',
            name: symbol,
        };
    });

    const layout = {
        title: 'Crypto Prices',
        xaxis: {
            title: 'Date',
            type: 'date',
        },
        yaxis: {
            title: 'Price',
        },
    };

    return (
        <Plot
            data={traces}
            layout={layout}
            config={{ responsive: true }}
        />
    );
};

export default StrategyChart;
