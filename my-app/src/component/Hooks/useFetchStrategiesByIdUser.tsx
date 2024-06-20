import { useState, useEffect, useCallback } from 'react';

const useFetchStrategiesByIdUser = (idUser: string | null) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStrategies = useCallback(async () => {
        if (!idUser) {
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/strategy/getAllStrategyByIdUser/${idUser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setData(data.data);  // assuming your response structure has a `data` field
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur lors de la tentative de connexion.');
        } finally {
            setLoading(false);
        }
    }, [idUser]);

    useEffect(() => {
        fetchStrategies();
    }, [fetchStrategies]);

    return { data, loading, error, fetchStrategies };
};

export default useFetchStrategiesByIdUser;
