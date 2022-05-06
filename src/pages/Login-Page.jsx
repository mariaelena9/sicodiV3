//Imports
import React from "react";

//Recursos
import LogoNay from "../assets/nayaritLogo.png";

//Componentes
import NewLogin from '../components/Log In/Login';

function LoginPage() {
    return (
        <div className="container">
            <div className="leftSide">
                <img className="nayaritLogo" src={LogoNay} alt="LogotipoNayarit" />
            </div>

            <div className="rightSide">
                <NewLogin />
            </div>
        </div>
    );
}

export default LoginPage;