import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { CiCircleInfo } from "react-icons/ci";
import Layout from '../Layout/Layout';
import Communauty from '../Indicateurs/Communauty';
import Liquidity from '../Indicateurs/Liquidity';
import Momentum from '../Indicateurs/Momentum';
import Security from '../Indicateurs/Security';
import Technologie from '../Indicateurs/Technologie';
import Tokenomics from '../Indicateurs/Tockenomics';
import { useCrypto } from '../Hooks/CryptoContext';
import { getPictureCryptoById } from '../../Logique/Logic_Crypto';
import './HomePage.css';
import useCryptoData from '../Hooks/GetDataCryptoById';
import ProgressBar from '../ProgressBar';
import { useIndicators } from '../../contexts/IndicatorsContext';
import TradingViewWidget from '../Chart/TradingViewWidget';
import useGoogleTrends from '../Hooks/useGoogleTrends';
import GoogleTrendsChart from '../Chart/GoogleTrendsChart';
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from '../Modal/Modal';
import Cookies from "js-cookie";
import { addWatchList } from "../../Logique/Logique_User";

const HomePageContent: React.FC = () => {
    const { selectedCrypto } = useCrypto();
    const [cryptoPicture, setCryptoPicture] = useState<string | null>(null);
    const { cryptoData } = useCryptoData(selectedCrypto?.id || '');
    const { overallPercentage } = useIndicators();
    const { data: trendsData, error: trendsError } = useGoogleTrends(selectedCrypto?.name || 'bitcoin');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState<number | string>('');
    const userCookie = Cookies.get('user');
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchCryptoPicture = async () => {
            if (selectedCrypto) {
                const picture = await getPictureCryptoById(selectedCrypto.id);
                setCryptoPicture(picture);
            }
        };
        fetchCryptoPicture();
    }, [selectedCrypto]);

    useEffect(() => {
        if (userCookie) {
            const user = JSON.parse(userCookie);
            setUserId(user.idUser);
        }
    }, [userCookie]);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const cryptoPrice = useMemo(() => cryptoData?.market_data.current_price.usd, [cryptoData]);
    const cryptoName = useMemo(() => selectedCrypto?.name, [selectedCrypto]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setQuantity(value);
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
    };

    const addNewStrategy = async () => {
        const qty = parseFloat(quantity as string);
        if (!isNaN(qty) && userId) {
            const data = {
                cryptoId: selectedCrypto?.id,
                quantity: qty,
                symbol: selectedCrypto?.symbol,
                ATH: cryptoData?.market_data.ath.usd,
                ATL: cryptoData?.market_data.atl.usd,
                nb_detention: qty,
                date_ath: formatDate(cryptoData?.market_data.ath_date.usd),
                date_atl: formatDate(cryptoData?.market_data.atl_date.usd),
                idUser: userId,
                price: cryptoPrice,

            };
            console.log('Quantité:', qty);
            console.log('ID Utilisateur:', userId);
            console.log('crypto:', cryptoData);
            try {
                await addWatchList(data);
                alert(`${selectedCrypto?.name} a été ajouté à votre liste de suivis`);
            } catch (e) {
                console.log(e);
            }
        }
        closeModal();
    };

    const totalPrice = useMemo(() => {
        const qty = parseFloat(quantity as string);
        return isNaN(qty) || !cryptoPrice ? 0 : qty * cryptoPrice;
    }, [quantity, cryptoPrice]);

    if (!selectedCrypto) {
        return <div>Aucune cryptomonnaie sélectionnée</div>;
    }

    if (!cryptoData) {
        return <div>Aucune donnée disponible</div>;
    }

    return (
        <div className="main">
            <div className="information-crypto">
                <div className="crypto-name">
                    {cryptoPicture && (
                        <div className="crypto-picture">
                            <img src={cryptoPicture} alt={`${cryptoName} logo`} />
                        </div>
                    )}
                    <h2><strong>{cryptoName}</strong> ({selectedCrypto.symbol})</h2>
                </div>
                <div className="data-price">
                    <h2>{cryptoPrice} $</h2>
                </div>
                <div className="pourcent-data">
                    {<ProgressBar percentage={overallPercentage} />}
                </div>
                <div className="specified-data">
                    <div className="categorie">
                        <h3>Catégorie <CiCircleInfo /></h3>
                        <div className="info-box">
                            {cryptoData.categories.join(', ')}
                        </div>
                    </div>
                    <div className="plateform-date">
                        <h3>Plateforme <CiCircleInfo /></h3>
                        <div className="info-box">
                            {Object.entries(cryptoData.platforms).map(([platformName]) => (
                                <div key={platformName}>{platformName}</div>
                            ))}
                        </div>
                    </div>
                    <div className="add-strategy" onClick={openModal}>
                        <FaPlusCircle size="40" />
                    </div>
                </div>
            </div>
            <div className="chart-overview">
                <TradingViewWidget symbol={cryptoData.symbol} />
                <div className="GoogleTrendsChart">
                    <GoogleTrendsChart trendsData={trendsData} />
                </div>
            </div>
            <div className="indicator-list">
                <Communauty cryptoData={cryptoData} />
                <Liquidity cryptoData={cryptoData} />
                <Momentum cryptoData={cryptoData} />
                <Technologie cryptoData={cryptoData} />
                <Security cryptoData={cryptoData} />
                <Tokenomics cryptoData={cryptoData} />
            </div>
            <Modal show={isModalOpen} onClose={closeModal}>
                <h2>Ajouter une Stratégie pour {cryptoData.name}</h2>
                <div className="form-data">
                    <div className="quantite-form">
                        <h3>Quantité: </h3>
                        <input
                            type="text"
                            className="txt-quantite"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        <h3>Total: {totalPrice.toFixed(2)} $</h3>
                    </div>
                    <div className="button-form">
                        <input type="button" className="button" value="Valider" onClick={addNewStrategy} />
                        <input type="button" className="button" value="Annuler" onClick={closeModal} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default React.memo(HomePageContent);
