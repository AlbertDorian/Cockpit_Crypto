import React from 'react';

const LoginPage: React.FC = () => {

    const checkLogin = async(event) =>{
        event.preventDefault();
        const user = document.getElementById('identifier-text').value
        const password = document.getElementById('password-text').value

        console.log(user, password)

    }

    return (
       <div className="loginForm">
           <form id="login-form" onSubmit={checkLogin}>
                <input type="text" id="identifier-text" placeholder="Pseudo/Email"/>
                <input type="text" id="password-text" placeholder="Mot de passe"/>
                <input type="submit" className="button" id="button-submit"/>
           </form>
       </div>
    );
};

export default LoginPage;
