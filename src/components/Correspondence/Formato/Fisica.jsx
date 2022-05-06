//Imports
import { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoChevronBackOutline } from "react-icons/io5";
//Componentes
import Correspondence from '../Correspondence'

//Archivo de configuracion
import { environment } from '../../../config/settings';

//Objetos MATD
import TextField from '@mui/material/TextField';

class Fisica extends Component {
    state = {
        data: [],
        dependencias: [],
        usuariosD: [],
        usuariosO: [],
        tipos: [],
        form: {
            id_Correspondencia: '',
            numOficio: '',
            fechaEmisión: '',
            fechaRecepción: '',
            fk_DependenciaO: '',
            fk_UsuarioO: '',
            fk_DependenciaD: '',
            fk_UsuarioD: '',
            fk_TipoCo: '',
            asunto: '',
            descripción: '',
            observaciones: '',
            formato: 'Fisica',
        }
    }

    //Se ejecutará al momento de montar el componente
    componentDidMount() {
        this.getDependences();
        this.getTipoCo();
        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("fechaEmisión")[0].setAttribute('max', today);
        document.getElementsByName("fechaRecepción")[0].setAttribute('max', today);
    }

    //Función para registrar la correspondencia en la BD
    handleSubmit = (e) => {
        e.preventDefault();
        this.insertCorrespondence();
    }

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async e => {
        e.persist();
        if (e.target.name === "fk_DependenciaD") {
            this.getUsersD(e.target.value);
        }
        if (e.target.name === "fk_DependenciaO") {
            this.getUsersO(e.target.value);
        }
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    //Función para insertar en la BD la correspondencia
    //Consumo del metodo INSERT de la API
    insertCorrespondence = async () => {
        if (this.state.form.fk_DependenciaO === "invalido" || this.state.form.fk_DependenciaO === ""
            || this.state.form.fk_UsuarioO === "invalido" || this.state.form.fk_UsuarioO === ""
            || this.state.form.fk_DependenciaD === "invalido" || this.state.form.fk_DependenciaD === ""
            || this.state.form.fk_UsuarioD === "invalido" || this.state.form.fk_UsuarioD === ""
            || this.state.form.fk_TipoCo === "invalido" || this.state.form.fk_TipoCo === ""
            || this.state.form.asunto === '' || this.state.form.descripción === ''
            || this.state.form.fechaEmisión === '' || this.state.form.fechaRecepción === ""
            || this.state.form.numOficio === '') {
            Swal.fire({
                title: 'No se puede registrar',
                text: 'Porfavor complete todos los campos de forma correcta.',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        delete this.state.form.id_Correspondencia;
        await axios.post(`${environment.urlServer}/correspondence/insert`, this.state.form).then(response => {
            if (response.data === "ER_DUP_ENTRY") {
                Swal.fire({
                    title: 'No se puede registrar',
                    text: 'Se detectó una entrada duplicada "' + this.state.form.numOficio + '" para el número de oficio, por favor ingrese uno nuevo.',
                    icon: 'warning',
                    showConfirmButton: true
                })
                return;
            }

            this.insertFiles(response);
            this.state.form.fechaEmisión = '';
            this.state.form.fechaRecepción = '';
            this.state.form.fk_DependenciaO = '';
            this.state.form.fk_UsuarioO = '';
            this.state.form.fk_DependenciaD = '';
            this.state.form.fk_UsuarioD = '';
            this.state.form.fk_TipoCo = '';
            this.state.form.asunto = '';
            this.state.form.descripción = '';
            this.state.form.observaciones = '';
            this.state.form.numOficio = '';

            Swal.fire({
                title: 'Acción realizada correctamente',
                text: 'Correspondencia registrada exitosamente.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            })
            ReactDOM.render(<Correspondence />, document.getElementById('root'));
        }).catch(error => {
            console.log(error.message);
        })
    }

    insertFiles(id) {
        console.log(id.data.insertId);
    }

    //Consultar las dependencias de la BD
    getDependences() {
        axios.get(`${environment.urlServer}/dependence/getdependence`).then(Response => {
            this.setState({ dependencias: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Consultar los usuarios de la BD
    getUsersD(id) {
        axios.get(`${environment.urlServer}/user/getUserByDep/${id}`).then(Response => {
            if (Response.data === 'Sin resultados') {
                this.setState({ usuariosD: [] });
                return;
            }
            this.setState({ usuariosD: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Consultar los usuarios de la BD
    getUsersO(id) {
        axios.get(`${environment.urlServer}/user/getUserByDep/${id}`).then(Response => {
            if (Response.data === 'Sin resultados') {
                this.setState({ usuariosO: [] });
                return;
            }
            this.setState({ usuariosO: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Consultar los tipos de correspondencia de la BD
    getTipoCo() {
        axios.get(`${environment.urlServer}/typesco/gettypes`).then(Response => {
            this.setState({ tipos: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    handleClick(e) {
        e.preventDefault();
        ReactDOM.render(<Correspondence />, document.getElementById('root'));
    }

    render() {
        return (
            <div className="correspondencecontent">
                <div className="buttonBack" style={{ cursor: "pointer" }} onClick={this.handleClick}>
                    <IoChevronBackOutline />
                    <h3>Modo de correspondencia</h3>
                </div>
                <br />
                <h3>Información básica</h3>
                <form>
                    <div className="dates">
                        <TextField InputLabelProps={{ shrink: true }} name="fechaEmisión" required key="fechaEmisión" type="date" id="fechaEmisión" label="Fecha de emisión" onChange={this.handleChange} value={this.state.form ? this.state.form.fechaEmisión : ''}></TextField>
                        <TextField InputLabelProps={{ shrink: true }} name="fechaRecepción" required key="fechaRecepción" type="date" id="fechaRecepción" label="Fecha de recepción" onChange={this.handleChange} value={this.state.form ? this.state.form.fechaRecepción : ''}></TextField>
                    </div>
                    <label>Código de oficio:</label>
                    <br />
                    <TextField name="numOficio" required key="numOficio" type="text" id="numOficio" label="Oficio" onChange={this.handleChange} value={this.state.form ? this.state.form.numOficio : ''}></TextField>
                    <br />
                    <h3>Información de remitente</h3>
                    <div className="originInfo">
                        <select className="select" id="fk_DependenciaO" name="fk_DependenciaO" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_DependenciaO : ''}>
                            <option value="invalido">Elige la dependencia origen</option>
                            {this.state.dependencias.map(elemento => (
                                <option key={elemento.iddependencia} value={elemento.iddependencia}>{elemento.nombre}</option>
                            ))}
                        </select>
                        <br />
                        <select className="select" id="fk_UsuarioO" name="fk_UsuarioO" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_UsuarioO : ''}>
                            <option value="invalido">Elige un remitente</option>
                            {this.state.usuariosO.map(elemento => (
                                <option key={elemento.idusuario} value={elemento.idusuario}>{elemento.nombre} {elemento.apPaterno} {elemento.apMaterno}</option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <h3>Información de destinatario</h3>
                    <div className="originInfo">
                        <select className="select" id="fk_DependenciaD" name="fk_DependenciaD" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_DependenciaD : ''}>
                            <option value="invalido">Elige la dependencia destino</option>
                            {this.state.dependencias.map(elemento => (
                                <option key={elemento.iddependencia} value={elemento.iddependencia}>{elemento.nombre}</option>
                            ))}
                        </select>
                        <br />
                        <select className="select" id="fk_UsuarioD" name="fk_UsuarioD" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_UsuarioD : ''}>
                            <option value="invalido">Elige un destinatario</option>
                            {this.state.usuariosD.map(elemento => (
                                <option key={elemento.idusuario} value={elemento.idusuario}>{elemento.nombre} {elemento.apPaterno} {elemento.apMaterno}</option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <h3>Información de correspondencia</h3>
                    <div className="originInfo">
                        <select className="select" id="fk_TipoCo" name="fk_TipoCo" onChange={this.handleChange} value={this.state.form ? this.state.form.fk_TipoCo : ''}>
                            <option value="invalido">Elige un tipo de correspondencia</option>
                            {this.state.tipos.map(elemento => (
                                <option key={elemento.idtipo} value={elemento.idtipo}>{elemento.nombre}</option>
                            ))}
                        </select>
                        <br />
                        <TextField required name="asunto" key="asunto" id="asunto" label="Asunto:" onChange={this.handleChange} value={this.state.form ? this.state.form.asunto : ''}></TextField>
                        <br />
                        <TextField multiline name="descripción" key="descripción" rows={10} required id="descripción" label="Descripcion:" onChange={this.handleChange} value={this.state.form ? this.state.form.descripción : ''}></TextField>
                        <br />
                        <TextField multiline name="observaciones" key="observaciones" rows={5} required id="observaciones" label="Observaciones:" onChange={this.handleChange} value={this.state.form ? this.state.form.fechaobservaciones : ''}></TextField>
                        <br />
                        <p>
                            Subir archivos:
                            <br />
                            <input type="file" accept="image/png, image/jpeg" multiple></input>
                        </p>
                        <br />
                        <button type="submit" onClick={this.handleSubmit}>Enviar</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Fisica;