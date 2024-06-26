// src/hooks/useGoogleTrends.ts
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const useGoogleTrends = (keyword: string) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/google/api/trends/${keyword}`);
                setData(response.data);
            } catch (err) {
                setError('Erreur lors de la récupération des tendances Google');
            }
        };

        fetchTrends();
    }, [keyword]);

    return { data, error };
};

export default useGoogleTrends;
