import React, { Component } from 'react';

import HospitalListItem from './hospitals/HospitalListItem';
import FilterListItem from './hospitals/FilterListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import GoogleMapReact from 'google-map-react';
import IosPin from 'react-ionicons/lib/IosPin';
import IosClose from 'react-ionicons/lib/IosClose';
import IosPinOutline from 'react-ionicons/lib/IosPinOutline';
import IosEyeOutline from 'react-ionicons/lib/IosEyeOutline';

import _ from 'lodash';

import products from '../utils/products.js'; // replace later
import municipalities from '../utils/municipalities.js';

const BarMarker = ({ isActive, name, equipment, address, onClose }) => {
  const cls = isActive ? 'is--active' : '';

  return (
    <div className = {`fb-marker ${cls}`}>
      <IosPin
        color ={isActive ? '#4C52E0' : 'black'}
        fontSize = {isActive ? '54px' : '42px'}
      />
      <div className="fb-marker__window">
        <div className="fb-marker__window__header">
          <h5>{ name }</h5>
          <IosClose onClick={onClose} />
        </div>
        <div className="fb-marker__window__content">
          <div className="ab-equipments">
            { equipment && equipment.map((item) => {
              return (
                <div className="ab-equipment__item">
                  <span className="ab-equipment__item__name">{item.displayName}</span>
                  <span className="ab-equipment__item__amount">{item.amount}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}


class HospitalsMap extends Component {
  static defaultProps = {
    zoom: 8 ,
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

  createMapOptions = (maps) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      clickableIcons: false,
      styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    }
  }

  updateActiveMarker = (index) => {
    this.activeMarker = index;
  }

  _onMarkerClick = (index, props) => {
    this.updateActiveMarker(Number(index));
    const { lat, lng, id } = props;

    //enterBar(id);
    this.setState({
      center: {
        lat: lat,
        lng: lng
      }
    })
  }

  render() {
    const { hospitals } = this.props;
    return (
      <div className="ab-hospitals__map">
        <div style={{ height: 'calc(100vh - 100px)', width: '100%', position: 'relative' }}>
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
              let onClose= () => {
                this.updateActiveMarker(null);
                this.setState({
                  center: {
                    lat: 42.149210,
                    lng: 24.749080
                  }
                });
              }
              return(
                <BarMarker
                  {...hospital}
                  id={hospital.id}
                  key={index}
                  lat={address.position.lat}
                  lng={address.position.lng}
                  onClose={onClose}
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

export default HospitalsMap;
