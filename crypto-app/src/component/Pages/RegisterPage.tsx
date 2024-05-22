import React, { useState } from 'react';
import {register} from "../../Logique/Logique_User";
import "./RegisterPage.css"
import {useNavigate} from "react-router-dom";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        number: false,
        specialChar: false,
        uppercase: false
    });
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;

        setPasswordValidation({
            length: password.length >= 8,
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            uppercase: /[A-Z]/.test(password)
        });
    };

    const handlePasswordFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setShowPasswordRequirements(true);
    };

    const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nameElement = document.getElementById('name-text') as HTMLInputElement;
        const firstnameElement = document.getElementById('firstname-text') as HTMLInputElement;
        const emailElement = document.getElementById('identifier-text') as HTMLInputElement;
        const passwordElement = document.getElementById('password-text') as HTMLInputElement;
        const passwordCheckElement = document.getElementById('password-text-check') as HTMLInputElement;

        const name = nameElement.value;
        const firstname = firstnameElement.value;
        const email = emailElement.value;
        const password = passwordElement.value;
        const passwordCheck = passwordCheckElement.value;

        if (password === passwordCheck) {
            const user = { name, firstname, mail: email, password };

            try {
                const response = await register(user);
                console.log(response.message);
            } catch (error) {
                console.error('Erreur:', error);
            }
        } else {
            alert("Les 2 mots de passe doivent correspondre.");
        }
    };

    const navigateLogin = async () =>{

        navigate('/login')
    }


    return (
        <div className="main-register">
            <div className="registerForm">
                <h2>Créer un compte</h2>
                <form id="register-form" onSubmit={createUser}>
                    <div className="name">
                        <h3>Nom</h3>
                        <input type="text" id="name-text" placeholder="Nom" />
                    </div>
                    <div className="firstname">
                        <h3>Prénom</h3>
                        <input type="text" id="firstname-text" placeholder="Prénom" />
                    </div>
                    <div className="mail">
                        <h3>Email</h3>
                        <input type="email" id="identifier-text" placeholder="Email" />
                    </div>
                    <div className="password">
                        <h3>Mot de passe</h3>
                        <input
                            type="password"
                            id="password-text"
                            placeholder="Au moins 8 caractères"
                            onFocus={handlePasswordFocus}
                            onInput={handlePasswordChange}
                        />
                        {showPasswordRequirements && (
                            <ul className="password-requirements">
                                <li style={{ color: passwordValidation.length ? 'white' : 'red' }}>
                                    Le mot de passe doit contenir au moins 8 caractères
                                </li>
                                <li style={{ color: passwordValidation.number ? 'white' : 'red' }}>
                                    Le mot de passe doit contenir au moins 1 chiffre
                                </li>
                                <li style={{ color: passwordValidation.specialChar ? 'white' : 'red' }}>
                                    Le mot de passe doit contenir au moins 1 caractère spécial
                                </li>
                                <li style={{ color: passwordValidation.uppercase ? 'white' : 'red' }}>
                                    Le mot de passe doit contenir au moins 1 majuscule
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="password-Verif">
                        <h3>Confirmer le mot de passe</h3>
                        <input
                            type="password"
                            id="password-text-check"
                            placeholder="Confirmer le mot de passe"
                        />
                    </div>
                    <div className="bottom-form">
                        <button className="btn-form" type="submit">Créer un compte</button>
                        <button className="btn-login" type="button" onClick={navigateLogin}>Connexion</button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default RegisterPage;
