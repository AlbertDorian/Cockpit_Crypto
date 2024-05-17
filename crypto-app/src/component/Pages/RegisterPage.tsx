import React, { useState } from 'react';
import {register} from "../../Logique/Logique_User";

const RegisterPage: React.FC = () => {
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


    return (
        <div className="registerForm">
            <form id="register-form" onSubmit={createUser}>
                <div className="name">
                    <label>Nom: </label>
                    <input type="text" id="name-text" />
                </div>
                <div className="firstname">
                    <label>Prénom: </label>
                    <input type="text" id="firstname-text" />
                </div>
                <div className="mail">
                    <label>Email: </label>
                    <input type="email" id="identifier-text" />
                </div>
                <div className="password">
                    <label>Mot de passe: </label>
                    <input
                        type="password"
                        id="password-text"
                        placeholder="Au moins 8 caractères"
                        onFocus={handlePasswordFocus}
                        onInput={handlePasswordChange}
                    />
                    {showPasswordRequirements && (
                        <ul className="password-requirements">
                            <li style={{ color: passwordValidation.length ? 'black' : 'red' }}>
                                Le mot de passe doit contenir au moins 8 caractères
                            </li>
                            <li style={{ color: passwordValidation.number ? 'black' : 'red' }}>
                                Le mot de passe doit contenir au moins 1 chiffre
                            </li>
                            <li style={{ color: passwordValidation.specialChar ? 'black' : 'red' }}>
                                Le mot de passe doit contenir au moins 1 caractère spécial
                            </li>
                            <li style={{ color: passwordValidation.uppercase ? 'black' : 'red' }}>
                                Le mot de passe doit contenir au moins 1 majuscule
                            </li>
                        </ul>
                    )}
                </div>
                <div className="password-Verif">
                    <label>Confirmer le mot de passe: </label>
                    <input
                        type="password"
                        id="password-text-check"
                    />
                </div>
                <input type="submit" className="button" id="button-submit" />
            </form>
        </div>
    );
};

export default RegisterPage;
