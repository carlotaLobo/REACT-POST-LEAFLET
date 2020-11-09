import React, { Component } from 'react'

export default class Espania extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: props.info,
        }
    }

    render() {

        // genero los options con el parametro del municipio y posicion
        return (

            <option value={this.props.position} >{this.props.info.fields.municipio}</option>

        )
    }
}
