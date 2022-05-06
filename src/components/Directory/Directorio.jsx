/* @DIRECTORIO */

//Imports
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

//Archivo de configuracion
import { environment } from '../../config/settings';

//Iconos
import { FaUserTie } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEnvelopeFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";

//Componentes
import Modal from './Modal.jsx';
import Digital from "../Correspondence/Formato/Digital";

class Directorio extends Component {
    //CONSTRUCTOR DEL COMPONENTE
    constructor() {
        super();
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    //FUNCIONES PARA EL CONTROL DE VENTANA MODAL
    showModal = (dato) => {
        this.setState({ show: true });
        axios.get(`${environment.urlServer}/user/getuser/${dato}`).then(res => {
            this.setState({
                idUsuario: res.data.idusuario,
                fkdependencia: res.data.iddependencia,
                fkdpto: res.data.Departamento,
                name: res.data.UserName,
                email: res.data.email,
                depa: res.data.cargo,
                phone: res.data.telefono
            });
        }).catch(error => {
            console.log(error.message);
        });
    };

    hideModal = () => {
        this.setState({ show: false });
    };
    //=============================================================

    //ARREGLO DE ESTADO, CONTIENE LAS VARIABLES Y ARREGLOS UTILIZADOS EN EL COMPONENTE
    state = {
        data: [],
        data2: [],
        dependencias: [],
        keyword: '',
        form: {
            idUsuario: '',
            fkdpto: '',
            name: '',
            lastNameP: '',
            lastNameM: '',
            email: '',
            depa: '',
            phone: '',
        },
        show: false,
    }

    componentDidMount() { //Se ejecutará al momento de montar el componente
        this.getUser();
        this.getDependencies();
    }

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async (event) => {
        await this.setState({ keyword: event.target.value });
        this.state.data = this.state.data2.filter(user => user.nombre.toLowerCase().includes(this.state.keyword.toLowerCase()));
        this.getDependencies();
    }

    getUser = () => { //Consulta todos los usuarios de la BD
        axios.get(`${environment.urlServer}/user/getuser`).then(res => {
            this.setState({ data: res.data });
            this.setState({ data2: res.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    getDependencies = () => { //Consulta todas las dependencias de la BD
        axios.get(`${environment.urlServer}/dependence/getdependence`).then(res => {
            this.setState({ dependencias: res.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    change = (event) => { //Al cambiar el combobox consulta los usuarios filtrados por dependencia
        document.getElementById("keyword").value = "";
        axios.get(`${environment.urlServer}/user/getUserByDep/${event.target.value}`).then(res => {
            if (res.data === 'Sin resultados') {
                Swal.fire({
                    title: 'Ups!',
                    text: 'No hay usuarios registrados en esta dependencia',
                    icon: 'warning',
                    showConfirmButton: true
                })
                this.setState({ data: [] });
                this.setState({ data2: [] });
            } else {
                this.setState({ data: res.data });
                this.setState({ data2: res.data });
            }
        }).catch(error => {
            console.log(error.message);
        });
    }

    handleWriteTo = async (event) => {
        ReactDOM.render(<Digital data={event} />, document.getElementById('root'));
    }

    render() { //Renderiza los elementos gráficos del componente
        return (
            <div className="main">
                <div className="contentDirectory">
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <div className="modalContent">
                            <div className="modalName">
                                <p>{this.state.name}</p>
                                <BsFillPersonFill />
                            </div>
                            <p><b>Departamento:</b> {this.state.fkdpto}</p>
                            <div className="modalEmail">
                                <BsEnvelopeFill />
                                <p>{this.state.email}</p>
                            </div>
                            <div className="modalPos">
                                <MdWork />
                                <p>{this.state.depa}</p>
                            </div>
                            <div className="modalPhone">
                                <AiFillPhone />
                                <p>{this.state.phone}</p>
                            </div>
                            <div className='modalButton'>
                                <button type="button" onClick={() => this.handleWriteTo({ usuario: this.state.idUsuario, dependencia: this.state.fkdependencia })}>
                                    Escribir
                                </button>
                            </div>
                        </div>
                    </Modal>

                    <div className="direction">
                        <div className="headerDirectory">
                            <div className="buttonBack">
                                <p className="TitlePage">Directorio</p>
                            </div>

                            <div className="Search">
                                <input type='text' placeholder="Busqueda..." name="keyword" id="keyword" onChange={this.handleChange}></input>
                                <div className="icon-search"> <AiOutlineSearch /> </div>
                            </div>
                        </div>

                        <div className='directorio'>

                            <div className="filter">
                                <p className="filter-text">Dependencia: </p>
                                <select name="deps" id="depselect" onChange={this.change}>
                                    <option value="iddpto">Selecciona Dependencia</option>
                                    {this.state.dependencias.map(elemento => (
                                        <option onChange={this.change} key={elemento.iddependencia} value={elemento.iddependencia}>{elemento.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <br />

                            {this.state.data.map(user => {
                                return (
                                    <div className='Tarjeta'>

                                        <div className="img-contact">
                                            <FaUserTie />
                                        </div>

                                        <div className="info-contact">
                                            <div className="name-contact">
                                                <p><b>{user.nombre} {user.apMaterno} {user.apPaterno}</b></p>
                                            </div>

                                            <div className="email-contact">
                                                <p>{user.email}</p>
                                            </div>
                                        </div>

                                        <div className="img-message" onClick={() => this.showModal(user.idusuario)}> <MdEmail /></div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Directorio;