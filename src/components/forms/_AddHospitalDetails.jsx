import React, { Component } from 'react';
import LocationPicker from 'react-location-picker';
import NodeGeocoder from 'node-geocoder';

const defaultPosition = {
  lat: 42.149210,
  lng: 24.749080
};

const options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDymEQyulbBI8LiqGfJ9YKzLUo4jNIjcW0', // for Mapquest, OpenCage, Google Premier
  language: 'en',
  formatter: null
};

const geocoder = NodeGeocoder(options);

class AddHospitalDetails extends Component {

  state = {
    name: '',
    address: {
      city: '',
      formattedAddress: '',
      position: {
        lat: 0,
        lng: 0
      }
    }
  }

  _validateOnDemand = true;

  // grab and process input
  _grabUserInput() {
    return {
      name: this.refs.name.value,
      description: this.refs.description.value
    };
  }

  // handle location picker change
   _handleLocationChange ({ position, address, places }) {

    geocoder.reverse({lat: position.lat, lon: position.lng})
      .then((res) => {
        let { address } = this.state;
        address.formattedAddress = res[0].formattedAddress;
        address.position = position;

        this.setState({ address });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleLocationChange = this._handleLocationChange.bind(this);

  render() {

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
                defaultValue={this.state.name} />
            </div>
          </div>

          <div className="ab-form__group">
            <label className="ab-form__label">
              Адрес
            </label>
            <div className="ab-form__field">
              <LocationPicker
                containerElement={ <div className = "ab-add-map--container" /> }
                mapElement={ <div className = "ab-add-map" /> }
                defaultPosition={defaultPosition}
                zoom={17}
                onChange={this.handleLocationChange} />
            </div>
          </div>

        </form>
      </div>
    )
  }

}

export default AddHospitalDetails;
