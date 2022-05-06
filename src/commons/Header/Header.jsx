/* @HEADER */

//Imports
import React from "react";
import * as ImIcons from 'react-icons/im';
import ReactDOM from 'react-dom';

//Recursos
import logoSicodi from '../../assets/SICODISinFondo.png'
import logoGob from '../../assets/logosgg.png';

function Header() {
    return (
        <div className="general">
            <div className="header">
                <div className="header__content">

                    <div className="header__content--logoIzq">
                        <img src={logoSicodi} alt="logo-sicodi" />
                    </div>

                    <div className="header__content--leyendas">
                        <p>Gobierno del estado de Nayarit  </p>
                        <p>Secretaría de Administración y Finanzas </p>
                        <p>Sistema de Correspondencia Digital</p>
                    </div>

                    <div className="header__content--logoDer">
                        <img src={logoGob} alt='logo-gobierno' />
                    </div>
                </div>
            </div>

            {
                localStorage.getItem('auth') === "true" ?
                    <div className="infocuenta__contenedor">
                        <div className="info-cuenta">
                            <ImIcons.ImUser />
                            <p className="name">{localStorage.getItem('userName')}</p>
                            <p className="rol">{localStorage.getItem('userCargo')}</p>
                        </div>
                    </div>
                    :
                    ""
            }
        </div>
    );
}

function tick() {
    ReactDOM.render(<Header/>, document.getElementById('header'));
}

setInterval(tick, 1000);

export default Header;