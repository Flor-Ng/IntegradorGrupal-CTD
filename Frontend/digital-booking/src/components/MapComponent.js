import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Component } from 'react';
 
export class MapComponent extends Component {
  render() {
    const latitud = this.props.latitud
    const longitud = this.props.longitud

    return (
      <div style={{height: '500px', width: '100%', position: 'relative'}}>
        <Map
         google={this.props.google} 
         zoom={14} 
         style={{width: '100%', height: '100%', position: 'relative'}}
         initialCenter={{
          lat: latitud,
          lng: longitud
        }}
        >
        <Marker onClick={this.onMarkerClick}
                  name={'Current location'} /> 
        </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
})(MapComponent)