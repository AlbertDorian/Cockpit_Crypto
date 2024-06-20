// src/components/WalletStrategy.tsx
import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../Layout/Layout';
import { Table } from 'antd';
import useFetchStrategiesByIdUser from "../Hooks/useFetchStrategiesByIdUser";
import Cookies from "js-cookie";
import useCryptoData from "../Hooks/GetDataCryptoById";
import { updateCryptoWatchList } from "../../Logique/Logique_User";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import StrategyChart from "../Chart/StrategyChart";
import { useNavigate } from "react-router-dom";
import { getDataPriceChatById } from "../../Logique/Logic_Crypto";

interface PriceData {
    prices: Array<[number, number]>;
    market_caps: Array<[number, number]>;
    total_volumes: Array<[number, number]>;
}

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
};

const WalletStrategy: React.FC = () => {
    const userCookie = Cookies.get('user');
    const [userId, setUserId] = useState<string | null>(null);
    const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1); // Example quantity, adjust as needed
    const [pricesBySymbol, setPricesBySymbol] = useState<{ [key: string]: Array<[number, number]> }>({});
    const [selectedPeriod, setSelectedPeriod] = useState<string>('1d'); // Default to 1 day
    const navigate = useNavigate();

    useEffect(() => {
        if (userCookie) {
            const user = JSON.parse(userCookie);
            setUserId(user.idUser);
        }
    }, [userCookie]);

    const { data: strategies, loading, error, fetchStrategies } = useFetchStrategiesByIdUser(userId);
    const { cryptoData, loading: cryptoLoading, error: cryptoError } = useCryptoData(selectedSymbol || '');

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: 'ATH',
            dataIndex: 'ATH',
            key: 'ATH',
        },
        {
            title: 'ATL',
            dataIndex: 'ATL',
            key: 'ATL',
        },
        {
            title: 'Date ATH',
            dataIndex: 'date_ath',
            key: 'date_ath',
            render: (text: string) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Date ATL',
            dataIndex: 'date_atl',
            key: 'date_atl',
            render: (text: string) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Différence ATL (%)',
            key: 'diff_atl',
            render: (text: string, record: any) => {
                const diff = ((record.last_price - record.ATL) / record.ATL) * 100;
                return diff.toFixed(2) + '%';
            },
        },
        {
            title: 'Différence ATH (%)',
            key: 'diff_ath',
            render: (text: string, record: any) => {
                const diff = ((record.last_price - record.ATH) / record.ATH) * 100;
                return diff.toFixed(2) + '%';
            },
        },
        {
            title: 'Dernier prix',
            dataIndex: 'last_price',
            key: 'last_price',
        },
        {
            title: 'Detention',
            dataIndex: 'nb_detention',
            key: 'nb_detention',
        },
    ];

    const handleRowClick = useCallback((record: any) => {
        if (window.confirm("Voulez-vous rafraîchir les données ?")) {
            setSelectedSymbol(record.symbol);
        }
    }, []);

    useEffect(() => {
        if (cryptoData) {
            const data = {
                cryptoId: selectedSymbol,
                ATH: cryptoData.market_data.ath.usd,
                ATL: cryptoData.market_data.atl.usd,
                nb_detention: quantity,
                date_ath: formatDate(cryptoData.market_data.ath_date.usd),
                date_atl: formatDate(cryptoData.market_data.atl_date.usd),
                idUser: userId,
                price: cryptoData.market_data.current_price.usd, // Assuming this is the recent price
            };
            console.log(data);
            updateCryptoWatchList(data);
        }
    }, [cryptoData, selectedSymbol, quantity, userId]);

    useEffect(() => {
        if (strategies) {
            const fetchPrices = async () => {
                const prices: { [key: string]: Array<[number, number]> } = {};
                for (const strategy of strategies) {
                    try {
                        const dataPrice: PriceData = await getDataPriceChatById(strategy.symbol, selectedPeriod);
                        if (dataPrice && dataPrice.prices) {
                            prices[strategy.symbol] = dataPrice.prices;
                        }
                    } catch (error) {
                        console.error('Error fetching price data for symbol:', strategy.symbol, error);
                    }
                }
                setPricesBySymbol(prices);
                console.log("Prices by Symbol:", prices); // Log the final object
            };
            fetchPrices();
        }
    }, [strategies, selectedPeriod]);

    const navigateBack = async () => {
        navigate('/home');
    };

    const periods = [

        { label: '7d', value: '7' },      // 7 days
        { label: '14d', value: '14' },      // 7 days

        { label: '1M', value: '30' },     // 1 month
        { label: '6M', value: '180' },    // 6 months
    ];

    return (
        <Layout>
            <div className="main-strategy">
                <div>
                    <h3 onClick={navigateBack}>
                        <IoChevronBackCircleSharp />
                    </h3>
                    <h2>Ma stratégie de vente</h2>
                </div>



                {loading && <p>Chargement...</p>}
                {error && <p>{error}</p>}
                {strategies && (
                    <>
                        <Table
                            columns={columns}
                            dataSource={strategies}
                            rowKey="id"
                            onRow={(record) => ({
                                onClick: () => handleRowClick(record),
                            })}
                        />
                        <div>
                            {periods.map((period) => (
                                <button
                                    key={period.value}
                                    onClick={() => setSelectedPeriod(period.value)}
                                    style={{ marginRight: '5px' }}
                                >
                                    {period.label}
                                </button>
                            ))}
                        </div>
                        <StrategyChart pricesBySymbol={pricesBySymbol} />
                    </>
                )}
            </div>
        </Layout>
    );
};

export default React.memo(WalletStrategy);
