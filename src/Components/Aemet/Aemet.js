import React, { Component } from 'react';
import axios from 'axios';
import Global from './../Global';

export default class Aemet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cp: props.cp,
            status: false,
            recarga: props.recarga,

        }

    }



    //establezco el state
    state = {
        status: false,
        temperatura: {}
    }

    // cuando se crea el componente se llama a la funcion
    componentDidMount = () => {

        this.tiempoMunicipio();
    }


    //EL ERROR CREO QUE ES ESTE, PERO NO SÉ CÓMO HACERLO SI NO...
    componentDidUpdate = () => {

        this.tiempoMunicipio();
    }


    //metodo que realiza una busqeuda en la API AEMET para encontrar, mediante el CP, el tiempo en el municipio
    tiempoMunicipio = () => {


        axios.get(Global.urlAemet + '/api/prediccion/especifica/municipio/diaria/' + this.props.cp + '?api_key=' + Global.apiKeyAemet)
            .then(res => {

                return res.data.datos;

            }).then(res => {

                axios.get(res).then(res => {

                    var result = res.data[0].prediccion.dia[0].temperatura;

                   //AQUI :), DISPERSO
                     this.setState({
                         status: true,
                         temperatura: { max: result.maxima, min: result.minima }
                     })
                     
                    
                })

                

            })


    }


    render() {


        if (this.state.status) {

            return <h6>{this.state.temperatura.max}º, {this.state.temperatura.min}º</h6>

        } else if (this.state.error) {

            return <h6>cp no disponible</h6>

        } else {

            return (
                <div>

                    cargando temperatura ...

                </div>
            )
        }




    }
}
