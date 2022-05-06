//@En este archivo [App.js] descansarán los archivos que se mostrarán en la página principal (one page):

//Imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Hojas de estilo
import './App.css'
import './commons/Header/Header.css';
import './commons/Loader/Loader.css'
import './commons/Menu/Menu.css';
import './components/Correspondence/Correspondence.css';
import './components/Directory/Directorio.css'
import './components/Directory/Modal.css';
import './components/Home/Inicio.css'
import './components/Log In/Login.css';
import './components/Sent/Sent.css';
import './components/Details/Details.css';
import './components/Tracking/Tracking.css'
import './pages/Login-Page.css'

//Componentes
import LoginPage from './pages/Login-Page';
import Home from './components/Home/Inicio';
import Header from './commons/Header/Header';
import Menu from './commons/Menu/Menu';

class App extends Component {
    componentDidMount(){
        if(localStorage.getItem('auth')==="true"){
            ReactDOM.render(<Header/>, document.getElementById('header'));
            ReactDOM.render(<Menu/>, document.getElementById('menu'));
            ReactDOM.render(<Home page={"Inicio"}/>, document.getElementById('root'));
        } else {
            ReactDOM.render(<Header/>, document.getElementById('header'));
            ReactDOM.render("", document.getElementById('menu'));
            ReactDOM.render(<LoginPage/>, document.getElementById('root'));
        }
    }

    render(){
        return("Aplicación funcionando.");
    }
}

export default App;