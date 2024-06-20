// src/components/StrategyChart.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

interface PriceData {
    [symbol: string]: Array<[number, number]>;
}

interface StrategyChartProps {
    pricesBySymbol: PriceData;
}

const StrategyChart: React.FC<StrategyChartProps> = ({ pricesBySymbol }) => {
    if (!pricesBySymbol || Object.keys(pricesBySymbol).length === 0) {
        return <div>Aucune donnée disponible pour afficher le graphique.</div>;
    }

    const series = Object.keys(pricesBySymbol).map((symbol) => {
        const prices = pricesBySymbol[symbol];
        return {
            name: symbol,
            type: 'line',
            data: prices.map(([time, price]) => [new Date(time), price]),
        };
    });

    const options = {
        title: {
            text: 'Crypto Prices',
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'time',
            name: 'Date',
        },
        yAxis: {
            type: 'value',
            name: 'Price',
        },
        series: series,
        dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 0,
            },
            {
                type: 'inside',
                xAxisIndex: 0,
            },
            {
                type: 'slider',
                yAxisIndex: 0,
            },
            {
                type: 'inside',
                yAxisIndex: 0,
            },
        ],
    };

    return <ReactECharts option={options} style={{ height: '600px', width: '100%' }} />;
};

export default StrategyChart;
