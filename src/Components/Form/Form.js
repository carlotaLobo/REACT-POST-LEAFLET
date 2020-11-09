import React, { Component } from 'react'
import Mapcomponent from '../Map/Mapcomponent'
import Espania from './Espania';
import axios from 'axios';
import Global from '../Global';
import Aemet from '../Aemet/Aemet';


export default class Form extends Component {

    //creo referencia al select para saber qué municipio selecciona
    provinciaseleccionada = React.createRef();

    constructor(props) {
        super(props);
    }

    //establezco el state con los campos por defecto
    state = {
        infoEspania: [],
        status: false,
        coordenadas:
            { lat: 40.59177915352818, lng: -2.786714567470296 },
        provincia: 'Guadalajara',
        municipio: 'alovera',
        cp: '19208',
  

    }

    //segun carga el componente se llama a la funcion
    componentDidMount = () => {
        this.listaEspania();
    }

    //realiza la peticion al servicio que devuelve la info del municipio
    listaEspania = () => {

        axios.get(Global.urlMinucipios).then(res => {

            this.setState({
                infoEspania: res.data.records,
                status: true
            })
        })

    }

    // cuando pulsa boton buscar, se recoge el parametro de busqueda del form y se realiza la busqueda a partir del state con los municipios
    buscarMunicipio = (e) => {

        e.preventDefault();

        var posicion = this.provinciaseleccionada.current.value;
        var result = this.state.infoEspania[posicion];

        this.setState({
            coordenadas: { lat: result.geometry.coordinates[1], lng: result.geometry.coordinates[0] },
            provincia: result.fields.provincia,
            municipio: result.fields.municipio,
            cp: result.fields.codigo_postal,

        })


    }

    render() {

        // si todavia no ha cargado los municipios en el select, se espera con un spinner
        if (this.state.status == false) {

            return <div className='row d-flex align-items-center justify-content-center my-5' >
                <div className="spinner-border my-5 text-primary" />
            </div>

        }

        return (
            // creo el formulario de busqueda
            <React.Fragment>

                <div className="jumbotron bg-primary text-white">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col">
                            <h3>Buscador de municipios</h3>
                        </div>
                        <div className="col">
                            <form onSubmit={this.buscarMunicipio}>
                                <div className="form-group">
                                    <select ref={this.provinciaseleccionada} className='custom-select' name="provinciaseleccionada" id="">

                                        {
                                            // creo los options a través del componente Espania, pasandole la posicion y el objeto entero de la busqueda
                                            this.state.status && (
                                                this.state.infoEspania.map((muni, i) => {
                                                    return <Espania key={i} position={i} info={muni} />
                                                })
                                            )
                                        }
                                    </select>

                                </div>
                                <button className='btn btn-outline-light'>buscar</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* se genera el mapa a través de componente Mapcomponent, pasandole los parametros que necesita*/}
                    <Mapcomponent provincia={this.state.provincia} cp={this.state.cp}  municipio={this.state.municipio} coordenadas={this.state.coordenadas} />
                </div>

            </React.Fragment>
        )
    }
}
