// src/components/GoogleTrendsChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
);

interface GoogleTrendsChartProps {
    trendsData: any;
}

const GoogleTrendsChart: React.FC<GoogleTrendsChartProps> = ({ trendsData }) => {
    // Vérifiez que trendsData est défini et contient les données nécessaires
    if (!trendsData || !trendsData.default || !trendsData.default.timelineData) {
        return <div>Aucune donnée disponible pour afficher le graphique.</div>;
    }

    // Préparer les données pour le graphique
    const timelineData = trendsData.default.timelineData;

    // Filtrer pour les 12 derniers mois
    const last12MonthsData = timelineData.slice(-12);

    const labels = last12MonthsData.map((data: any) => new Date(Number(data.time) * 1000));
    const values = last12MonthsData.map((data: any) => data.value[0]);

    // Vérifiez que les tableaux ne sont pas vides
    if (labels.length === 0 || values.length === 0) {
        return <div>Aucune donnée disponible pour afficher le graphique.</div>;
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Interest Over Time',
                data: values,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'month' as const,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default GoogleTrendsChart;
