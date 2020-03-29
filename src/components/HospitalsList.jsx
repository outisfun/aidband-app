import React, { Component } from 'react';
import { HospitalsContext } from '../providers/HospitalsProvider';
import SideNav from './layout/SideNav';
import Container from './layout/Container';
import IosPinOutline from 'react-ionicons/lib/IosPinOutline';
import HospitalListItem from './hospitals/HospitalListItem';
import FilterListItem from './hospitals/FilterListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import GoogleMapReact from 'google-map-react';
import MdPin from 'react-ionicons/lib/MdPin';
import MdClose from 'react-ionicons/lib/MdClose';

import _ from 'lodash';

import products from '../utils/products.js'; // replace later
import municipalities from '../utils/municipalities.js';

const BarMarker = ({ isActive, itemIndex, name, onEnter }) => {
  const cls = isActive ? 'is--active' : '';

  return (
    <div className = {`fb-marker ${cls}`}>
      <MdPin
        color ={isActive ? 'black' : 'black'}
        fontSize = {isActive ? '54px' : '42px'}
      />
      <div className="fb-marker__window">
        <button onClick={onEnter} className="bh-btn bh-btn--full bh-btn--enter">enter</button>
      </div>
    </div>
  )
}


class HospitalsList extends Component {
  static defaultProps = {
    zoom: 12 ,
    center: {
      lat: 42.149210,
      lng: 24.749080
    }
  };

  state = {
    activeMarker: null,
    center: {
      lat: 42.149210,
      lng: 24.749080
    }
  }

  _onMarkerClick = (index, props) => {
    // this.isMarkerChanged = true;
    // this.updateActiveMarker(Number(index));
    // const { lat, lng, id } = props;
    // const { user, enterBar } = this.props;

    // //enterBar(id);
    // this.setState({
    //   activeMarker: Number(index),
    //   center: {
    //     lat: lat,
    //     lng: lng
    //   }
    // })
  }

  render() {
    const { hospitals } = this.props;

    return (
      <div className="ab-hospitals__map">
        <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDLJR14hApMiSCahjE4iiDZkhrHbLZGhm4' }}
            defaultCenter={this.props.center}
            center={this.state.center}
            defaultZoom={this.props.zoom}
            options = {this.createMapOptions}
            onChildClick = {this._onMarkerClick}
          >
            { hospitals && hospitals.map((hospital, index) => {
              const { address } = hospital;
              let onEnter = () => {
                console.log(hospital.id);
                // this.onEnterClick(hospital.id);
              }
              return(
                <BarMarker
                  name={hospital.name}
                  id={hospital.id}
                  key={index}
                  lat={address.position.lat}
                  lng={address.position.lng}
                  itemIndex = {index}
                  onEnter={onEnter}
                  isActive={(this.activeMarker === Number(index)) ? true : false}
                />
              )
            }) }
          </GoogleMapReact>
        </div>
      </div>
    )
  }

}

export default HospitalsList;
