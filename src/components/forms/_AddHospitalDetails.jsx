import React, { Component } from 'react';
import LocationPicker from 'react-location-picker';
import NodeGeocoder from 'node-geocoder';
import Geocode from "react-geocode";
import _ from 'lodash';

const defaultPosition = {
  lat: 42.149210,
  lng: 24.749080
};

const options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDymEQyulbBI8LiqGfJ9YKzLUo4jNIjcW0'
};



// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(options.apiKey);

// set response language. Defaults to english.
Geocode.setLanguage("bg");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish locality.
Geocode.setRegion("bg");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

class AddHospitalDetails extends Component {

  state = {
    name: '',
    address: {
      locality: '',
      municipality: '',
      formattedAddress: '',
      position: {
        lat: 0,
        lng: 0
      }
    }
  }

  _validateOnDemand = true;

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const { name } = this._grabUserInput();
    this.setState ({ name });
  }
  validationCheck = this.validationCheck.bind(this);

  isValidated() {
    const { address } = this._grabUserInput();
    const { updateStore } = this.props;

    // before updating store, we need to geocode the address
    const onStepSubmit = ({ name, address }) => {
      updateStore({ name, address });
      return true;
    }

    let _address = this._geocode(address, onStepSubmit);
  }

  // grab and process input
  _grabUserInput() {
    return {
      name: this.refs.name.value,
      address: this.refs.address.value
    };
  }

  _geocode = (address, callback) => {
    const { name } = this.state;
    Geocode.fromAddress(address).then(
      response => {
        const res = response.results[0];
        const { lat, lng } = res.geometry.location;
        const formattedAddress = res.formatted_address;
        let locality = '';
        let municipality = '';

        console.log('res be', res);

        _.forEach(res.address_components, (comp) => {
          if (_.includes(comp.types, "locality")) {
            locality = comp.short_name;
          }
          if (_.includes(comp.types, "administrative_area_level_1")) {
            municipality = comp.short_name;
          }
        })

        const address = {
          locality: locality,
          municipality: municipality,
          formattedAddress: formattedAddress,
          position: { lat, lng }
        }

        callback({ name, address });
      },
      error => {
        console.error(error);
      }
    );
  }


  _updateAddress = (e) => {
    e.preventDefault();
    // const { address } = this.state;
    const { address } = this._grabUserInput();
    // const res = await geocoder.geocode('29 champs elysée paris');
    Geocode.fromAddress(address).then(
      response => {
        const res = response.results[0];
        const { lat, lng } = res.geometry.location;
        const formattedAddress = res.formatted_address;
        let locality = '';
        let municipality = '';

        _.forEach(res.address_components, (comp) => {
          if (_.includes(comp.types, "locality")) {
            locality = comp.short_name;
          }
          if (_.includes(comp.types, "administrative_area_level_1")) {
            municipality = comp.short_name;
          }
        })

        const address = {
          locality: locality,
          formattedAddress: formattedAddress,
          position: { lat, lng }
        }

        this.setState({ address });
      },
      error => {
        console.error(error);
      }
    );

    // console.log('address', res);
  }
  updateAddress = this._updateAddress.bind(this);

  render() {
    const { formattedAddress, locality, position } = this.state.address;

    return (
      <div className="ab-form__step">
        <form className="ab-form">

          <div className="ab-form__group">
            <label className="ab-form__label">
              Име
            </label>
            <div className="ab-form__field">
              <input
                ref="name"
                autoComplete="off"
                type="text"
                placeholder='Име'
                required
                defaultValue={this.state.name}
                onBlur={this.validationCheck} />
            </div>
          </div>

          <div className="ab-form__group">
            <label className="ab-form__label">
              Адрес
            </label>
            <div className="ab-form__field field--validate">
              <div className="wrapper">
                <input
                  ref="address"
                  autoComplete="off"
                  type="text"
                  placeholder='Адрес'
                  required
                  defaultValue={this.state.address.formattedAddress}
                  onBlur={this.updateAddress} />

                <button
                  className="address-validate ab-button ab-button--sm ab-button--default"
                  onClick={this.updateAddress} >Валидирай адрес</button>
              </div>

              { formattedAddress &&
                <div className="ab-form__field__output">
                  <h6>Result</h6>

                  <div className="ab-form__field__output__item">
                    <h6>Форматиран адрес: </h6>
                    <p>{ formattedAddress }</p>
                  </div>
                  <div className="ab-form__field__output__item">
                    <h6>Населено място: </h6>
                    <p>{ locality }</p>
                  </div>
                  <div className="ab-form__field__output__item">
                    <h6>Географска позиция: </h6>
                    <p>Lat: { position.lat }, Lng: { position.lng }</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </form>
      </div>
    )
  }

}

export default AddHospitalDetails;

/* <div className="ab-form__group">
            <label className="ab-form__label">
              Адрес
            </label>
            <div className="ab-form__field">
              <LocationPicker
                containerElement={ <div className = "ab-add-map--container" /> }
                mapElement={ <div className = "ab-add-map" /> }
                defaultPosition={defaultPosition}
                zoom={12}
                onChange={this.handleLocationChange} />
            </div>
          </div>
          */
