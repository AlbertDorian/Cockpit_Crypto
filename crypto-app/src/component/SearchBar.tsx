import React, { useState, ChangeEvent } from 'react';
import {useCryptoList} from "./Hooks/CryptoListContext";
import { useCrypto } from './Hooks/CryptoContext';
import './SearchBar.css';

interface Crypto {
    id: string;
    symbol: string;
    name: string;
}

const SearchBar: React.FC = () => {
    const [searchResults, setSearchResults] = useState<Crypto[]>([]);
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
    const { setSelectedCrypto } = useCrypto();
    const { cryptoList, loading, error } = useCryptoList();

    const SearchCrypto = (event: ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.currentTarget.value;
        setSearchPerformed(true);
        if (searchValue) {
            const results = cryptoList.filter((crypto) =>
                crypto.id.toLowerCase().includes(searchValue.toLowerCase()) ||
                crypto.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
                crypto.name.toLowerCase().includes(searchValue.toLowerCase())
            ).slice(0, 10); // Prendre seulement les 10 premiers résultats
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectCrypto = (crypto: Crypto) => {
        setSelectedCrypto(crypto);
        setSearchResults([]); // Clear the search results after selection
        setSearchPerformed(false); // Reset search performed
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    return (
        <div className="search-bar">
            <input
                id="input-search"
                className="InputS"
                placeholder="Rechercher une cryptomonnaie"
                onChange={SearchCrypto}
            />
            <div className="search-results">
                <ul>
                    {searchPerformed && searchResults.length === 0 ? (
                        <li>Aucun résultat trouvé</li>
                    ) : (
                        searchResults.map((crypto) => (
                            <li  key={crypto.id} onClick={() => handleSelectCrypto(crypto)}>
                                <strong>{crypto.name}</strong> ({crypto.id})
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SearchBar;
