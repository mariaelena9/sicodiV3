import { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

//Iconos
import { AiOutlineSearch } from "react-icons/ai";

//Componentes
import Details from "../Details/Details"

//Archivo de configuración
import { environment } from '../../config/settings';

class Sent extends Component {

    state = {
        correspondencias: [],
        dependencias: [],
        corresFiltradas: [],
        keyword: ''
    }

    componentDidMount() {
        this.getSentCorrespondence();
    }

    getSentCorrespondence() {
        axios.get(`${environment.urlServer}/correspondence/getSent/${localStorage.getItem("idusuario")}`).then(res => {
            this.setState({ correspondencias: res.data });
            this.setState({ corresFiltradas: res.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    seeDetails = (id) => {
        ReactDOM.render(<Details idcor={id} tipo={1} />, document.getElementById('root'));
    }

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async (event) => {
        await this.setState({ keyword: event.target.value });
        let filtro = this.state.corresFiltradas.filter(user => user.usuarioD.toLowerCase().includes(this.state.keyword.toLowerCase()));
        this.state.correspondencias = filtro;
        this.getDependencies();
    }

    handleFilter = (event) => {
        document.getElementById("keyword").value = "";
        if (event.target.value === "0") {
            this.getSentCorrespondence();
            return;
        }
        axios.get(`${environment.urlServer}/correspondence/filterSent/${event.target.value}/${localStorage.getItem("idusuario")}`).then(res => {
            this.setState({ correspondencias: res.data });
            this.setState({ corresFiltradas: res.data });
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

    render() {
        return (
            <div className="sentcontent">
                <div className="sentsearch">
                    <div className="icon-search"> <AiOutlineSearch /> </div>
                    <input type='text' placeholder="Buscar en toda la correspondencia" name="keyword" id="keyword" onChange={this.handleChange}></input>
                </div>

                <br />

                {/* <div className="filtersDiv">
                    <div className="filterInd">
                        <label>Filtrar por dependencia</label>
                        <select name="deps" id="dependencia" onChange={this.handleFilter}>
                            <option value="fk_DependenciaO">Selecciona Dependencia</option>
                            {this.state.dependencias.map(elemento => (
                                <option onChange={this.change} key={elemento.iddependencia} value={elemento.iddependencia}>{elemento.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filterInd">
                        <label>Filtrar por fecha de emisión</label>
                        <input type="date" id="fecha" label="Filtrar por fecha" onChange={this.handleFilter}></input>
                    </div>
                </div>

                <div className="filtersbtn">
                    <button value="fk_TipoCo" id="tipo" className="btnall" onClick={this.handleFilter}>Todos</button>
                    <button value="1" id="tipo" className="btnproc" onClick={this.handleFilter}>Informativos</button>
                    <button value="2" id="tipo" className="btnsent" onClick={this.handleFilter}>Requerimentos</button>
                    <button value="3" id="tipo" className="btnstore" onClick={this.handleFilter}>Copias</button>
                </div> */}

                <br />

                <div className="filtersbtn">
                    <button value="0" className="btnall" onClick={this.handleFilter}>Todos</button>
                    <button value="1" className="btnproc" onClick={this.handleFilter}>Proceso</button>
                    <button value="2" className="btnsent" onClick={this.handleFilter}>Enviado</button>
                    <button value="3" className="btnstore" onClick={this.handleFilter}>Archivado</button>
                </div>

                <br />

                {this.state.correspondencias.length === 0 ? <h2>Sin enviados</h2> : ""}

                <table>
                    <tbody>
                        {this.state.correspondencias.map(elemento => (
                            <tr className="sentrow" onClick={() => this.seeDetails(elemento.id_Correspondencia)}>
                                <td>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <p><b>Para: </b>{elemento.usuarioD}</p>
                                        <p><b>Fecha: </b>{new Date(elemento.fechaEmisión).getUTCDate()}/{new Date(elemento.fechaEmisión).toLocaleString('default', { month: 'long' })}/{new Date(elemento.fechaEmisión).getFullYear()}</p>
                                    </div>
                                    <p><b>Asunto: </b>{elemento.asunto}</p>
                                    <p>{elemento.descripción}</p>
                                </td>
                                <td style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <p>{elemento.estatus}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Sent;