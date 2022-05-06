//Imports
import React, { Component } from "react";
import ReactDOM from 'react-dom';

//Iconos
import { IoChevronBackOutline } from "react-icons/io5";
import { ImPencil2 } from "react-icons/im";
import { ImDisplay } from "react-icons/im";

//Componentes
import Digital from "./Formato/Digital";
import Fisica from "./Formato/Fisica"

class Correspondence extends Component {
    state = {
        showDigital: false,
        showFisica: false,
    }

    componentDidMount() {
        this.setState({ show1: false });
        this.setState({ show2: false });
    }

    async hideComponent(name) {
        switch (name) {
            case "showDigital":
                ReactDOM.render(<Digital/>, document.getElementById('root'));
                break;
            case "showFisica":
                ReactDOM.render(<Fisica/>, document.getElementById('root'));
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="body">
                <div className="correspondencecontent">
                    <div className="buttonBack">
                        {/* <i><IoChevronBackOutline /></i> */}
                        <p className="TitlePage">Nueva Correspondencia</p>
                    </div>
                    <br />

                    <div className="formatodiv">

                        <button className="btnFisica" onClick={() => this.hideComponent("showFisica")}>
                            <ImPencil2/>
                            Física
                        </button>

                        <button className="btnDigital" onClick={() => this.hideComponent("showDigital")}>
                            <ImDisplay/>
                            Digital
                        </button>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Correspondence;