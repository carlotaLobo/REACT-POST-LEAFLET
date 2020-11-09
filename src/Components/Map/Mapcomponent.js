import React, { Component } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet-css/dist/leaflet.css';
import './Mapcomponent.css';
import Iconlocation from './../Iconlocation/Iconlocation';
import Aemet from '../Aemet/Aemet';


export default class Mapcomponent extends Component {


  constructor(props) {
    super(props);

    this.state = {
      coordenadas: this.props.coordenadas,
      zoom: 7,
      cp: this.props.cp
    }

  }

/*   componentDidMount=()=>{
    this.tiempoMunicipio()
  }
  tiempoMunicipio = () => {

     
    axios.get(Global.urlAemet + '/api/prediccion/especifica/municipio/diaria/' + this.props.cp + '?api_key=' + Global.apiKeyAemet).then(res => {

        axios.get(res.data.datos).then(resp => {

            var result = resp.data[0].prediccion.dia[0].temperatura;

            this.setState({
                status: true,
                temperatura: { max: result.maxima, min: result.minima }
            })
           
        })

    }).catch(err => {

        this.setState({
            error: true
        })

    })




} */


  render() {

    return (

    
        <MapContainer center={this.props.coordenadas} zoom={this.state.zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={this.props.coordenadas} icon={Iconlocation}>

          <Popup>
            <div className="card-body">
              <h5 className="card-title">Provincia: {this.props.provincia}</h5>
              <h5 className="card-title">Municipio: {this.props.municipio}</h5>
              <p className="">Lat: {this.props.coordenadas.lat}</p>
              <p>Long: {this.props.coordenadas.lng}</p>
              <h6>El tiempo</h6>
             <Aemet cp={this.props.cp} />
            </div>
          </Popup>

        </Marker>
      </MapContainer>
  
    
      

    )
  }
}
