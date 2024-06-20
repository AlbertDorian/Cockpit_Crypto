import Cookies from 'js-cookie';

export const login = async (user) => {
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (data.status === 200) {
            //save informations from User for 1 week
            Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
        }

        return data;
    } catch (error) {
        console.error('Erreur:', error);
        return { status: 500, message: 'Erreur lors de la tentative de connexion.' };
    }
};


export const register = async (user) => {
    try {
        const response = await fetch(`http://localhost:3000/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        return { status: 500, message: 'Erreur lors de la tentative de création de l\'utilisateur.' };
    }
};

export const addWatchList = async (crypto) => {
    console.log(crypto)
    try {
        const response = await fetch('http://localhost:3000/strategy/addStrategie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(crypto),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        return { status: 500, message: 'Erreur lors de la tentative de connexion.' };
    }
};

export const updateCryptoWatchList = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/strategy/updateStrategie', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update the watchlist');
        }

        alert('Watchlist updated successfully');
    } catch (error) {
        console.error('Error updating the watchlist:', error);
        alert('Error updating the watchlist');
    }
};

