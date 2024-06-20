import React from 'react';
import Layout from '../Layout/Layout';
import { IndicatorsProvider } from '../../contexts/IndicatorsContext';
import HomePageContent from './HomePageContent';

const HomePage: React.FC = () => {
    console.log("Rendering HomePage");

    return (
        <Layout>
            <IndicatorsProvider>
                <HomePageContent />
            </IndicatorsProvider>
        </Layout>
    );
};

export default React.memo(HomePage);
