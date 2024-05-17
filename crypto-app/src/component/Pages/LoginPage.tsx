import React from 'react';
import {login} from "../../Logique/Logique_User";
import {useNavigate} from "react-router-dom";
const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const checkLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userElement = document.getElementById('identifier-text') as HTMLInputElement;
        const passwordElement = document.getElementById('password-text') as HTMLInputElement;

        const user = {
            mail: userElement.value,
            password: passwordElement.value,
        };

        try {
            const response = await login(user);
            if (response.status === 200) {
                navigate('/home')
            } else {
                console.log(response.message);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <form onSubmit={checkLogin}>
            <input type="email" id="identifier-text" placeholder="Email" />
            <input type="password" id="password-text" placeholder="Mot de passe" />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
