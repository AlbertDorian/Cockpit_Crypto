import React from 'react';
import {login} from "../../Logique/Logique_User";
import {useNavigate} from "react-router-dom";
import "./LoginPage.css"
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

    const navigateRegister = async () =>{

        navigate('/register')
    }

    return (
        <div className="main">
            <div className="login-form">
                <h2>Connexion</h2>
                <form onSubmit={checkLogin}>
                    <div className="email">
                        <h3>
                            Email
                        </h3>
                        <input type="email" id="identifier-text" placeholder="Email" />
                    </div>
                    <div className="password">
                        <h3>
                            Mot de Passe
                        </h3>
                        <input type="password" id="password-text" placeholder="Mot de passe" />
                    </div>

                    <div className="bottom-form">
                        <button className="btn-form" type="submit">Login</button>
                        <button className="btn-register" type="button" onClick={navigateRegister}>Créer un compte</button>
                    </div>


                </form>
            </div>
        </div>


    );
};

export default LoginPage;
