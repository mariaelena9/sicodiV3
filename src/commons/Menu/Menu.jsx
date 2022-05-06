//Imports
import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

//Iconos
import * as ImIcons from 'react-icons/im';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

//Componentes
import Directorio from "../../components/Directory/Directorio";
import Correspondence from "../../components/Correspondence/Correspondence";
import Inicio from "../../components/Home/Inicio";
import Loader from "../Loader/Loader";
import Sent from "../../components/Sent/Sent";
import Received from "../../components/Received/Received";

class Menu extends Component {

    //Función para controlar el funcionamiento del menú
    handleMenu(e) {
        e.preventDefault();
        if (e.target.id === '/home') {
            ReactDOM.render(<Inicio page="Inicio" />, document.getElementById('root'));
        } else if (e.target.id === '/directory') {
            ReactDOM.render(<Directorio />, document.getElementById('root'));
        } else if (e.target.id === '/correspondence') {
            ReactDOM.render(<Correspondence />, document.getElementById('root'));
        } else if (e.target.id === '/sent') {
            ReactDOM.render(<Sent />, document.getElementById('root'));
        } else if (e.target.id === '/receipt') {
            ReactDOM.render(<Received />, document.getElementById('root'));
        } else if (e.target.id === '/history') {
            ReactDOM.render(<Inicio page="Historico" />, document.getElementById('root'));
        } else if (e.target.id === '/report') {
            ReactDOM.render(<Inicio page="Reportes" />, document.getElementById('root'));
        } else if (e.target.id === '/salir') {
            localStorage.clear();
            ReactDOM.render("", document.getElementById('menu'));
            ReactDOM.render(<Loader texto1="Cerrando sesión" type="logout" />, document.getElementById('root'));
        }
    }

    render() {
        return (
            <Router className="contenido">
                <div className="principal">
                    <div className="navegacion">
                        <nav className="nav__bar">
                            <ul className="menuss">
                                <li id="/home" onClick={this.handleMenu}>
                                    <a id="/home">
                                        <span><AiIcons.AiFillHome /></span>
                                        <span className="menuText" id="/home">Inicio</span>
                                    </a>
                                </li>

                                <li id="/directory" onClick={this.handleMenu}>
                                    <a id="/directory">
                                        <span><MdIcons.MdImportContacts /></span>
                                        <span className="menuText" id="/directory">Directorio</span>
                                    </a>
                                </li>

                                <li id="/correspondence" onClick={this.handleMenu}>
                                    <a id="/correspondence">
                                        <span><ImIcons.ImFileText2 /></span>
                                        <span className="menuText" id="/correspondence">Correspondencia</span>
                                    </a>
                                </li>

                                <li id="/sent" onClick={this.handleMenu}>
                                    <a id="/sent">
                                        <span><ImIcons.ImBoxRemove /></span>
                                        <span className="menuText" id="/sent">Enviados</span>
                                    </a>
                                </li>

                                <li id="/receipt" onClick={this.handleMenu}>
                                    <a id="/receipt">
                                        <span><ImIcons.ImBoxAdd /></span>
                                        <span className="menuText" id="/receipt">Recibidos</span>
                                    </a>
                                </li>

                                <li id="/history" onClick={this.handleMenu}>
                                    <a id="/history">
                                        <span><ImIcons.ImHistory /></span>
                                        <span className="menuText" id="/history">Historico</span>
                                    </a>
                                </li>

                                {/* <li id="/report" onClick={this.handleMenu}>
                                <a>
                                    <span><ImIcons.ImStatsDots/></span>
                                    <span>Reportes</span>
                                </a>
                            </li> */}

                                <li key="exit" id="/salir" onClick={this.handleMenu}>
                                    <a id="/salir" >
                                        <span id="/salir"><ImIcons.ImExit /></span>
                                        <span className="menuText" id="/salir">Salir</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Menu;