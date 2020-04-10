import React, { Component } from 'react';
import NodeGeocoder from 'node-geocoder';
import Geocode from "react-geocode";
import _ from 'lodash';

const options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDymEQyulbBI8LiqGfJ9YKzLUo4jNIjcW0'
};

Geocode.setApiKey(options.apiKey);
Geocode.setLanguage("bg");
Geocode.setRegion("bg");
// Geocode.enableDebug();

const FormGroup = ({ label, children }) => {
  return (
    <div className="ab-form__group">
      <label className="ab-form__label">
        {label}
      </label>
      <div className="ab-form__field">
        {children}
      </div>
    </div>
  )
}

class AddHospitalDetails extends Component {

  constructor(props) {
    super(props);

    const fields = props.getStore
    this.state = {
      ...props.getStore(),
      isAddressValidated: false
    };

    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.validateAddress = this.validateAddress.bind(this);
  }

  componentDidMount() {
    const { getStore } = this.props;
    const { hospital, contact } = getStore();
    this.setState({ hospital, contact });
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput();
    const validateNewInput = this._validateData(userInput);

    let _state = this.state;
    _state.contacts[0] = userInput.contact;

    this.setState(_state);
  }

  // it's run on step submit, so this is where
  // the store in AddHospital gets updated =>
  // collect all data from user input, and display error messages
  // wherever necessary

  isValidated() {
    // FIX THIS
    return new Promise((resolve, reject) => {
      // should also be validating title though.
      const _onAddressGeocode = () => {

        if (this.state.isAddressValidated) {
          const { updateStore } = this.props;
          const { name, address, contacts } = this.state;
          updateStore({ name, address, contacts });

          resolve();
        } else {
          reject();
        }
      };

      // geocoding the address is async,
      // so make sure the promise resolves or rejects
      // only after it has been completed
      this._geocodeAddress(_onAddressGeocode);
    });
  }

  // Geocodes user input address ->
  // Sets state!!! -> accepts callback for once state is set.
  _geocodeAddress = (callback) => {

    const { address } = this._grabUserInput();

    if (address) {
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

          // FIX THIS !!!!!!!
          let _state = this.state;
          const { name } = this._grabUserInput();
          _state.address = {
            locality: locality,
            municipality: municipality,
            formatted_address: formattedAddress,
            position: { lat, lng }
          }
          _state.name = name;
          _state.isAddressValidated = true;
          this.setState(_state, callback);
        },
        error => {
          // if no response, set state to not valid address to prevent submit
          this.setState({ isAddressValidated: false });
          console.error(error);
        }
      );
    }
  }

  _grabUserInput() {
    return {
      name: this.refs.name.value,
      address: this.refs.address.value,
      contact: {
        name: this.refs.contact_name.value,
        position: this.refs.contact_position.value,
        phone: this.refs.contact_phone.value,
        email: this.refs.contact_email.value
      }
    };
  }

  _validateData(data) {
    return {
      name: (data.name !== ''), // required: anything besides N/A
      address: this.state.isAddressValidated // not sure
    };
  }




  validateAddress = (e) => {
    e.preventDefault();
    this._geocodeAddress();
  }

  render() {
    const { name, address, contacts, isAddressValidated } = this.state;
    const { getStore } = this.props;
    const cls = isAddressValidated ? '' : 'cannot-submit';

    return (
      <div className={`ab-form__step ${cls}`}>

        <form className="ab-form">
          {/* Hospital name, description, address */}
          <FormGroup label="Name">
            <input
              ref="name"
              type="text"
              placeholder='Name'
              required
              defaultValue={ name }
              onBlur={this.validationCheck} />
          </FormGroup>

          <FormGroup label="Address">
            <input
              ref="address"
              autoComplete="off"
              type="text"
              placeholder='Address'
              required
              onBlur={this.validateAddress} />

            <button
              className="address-validate ab-button ab-button--sm ab-button--default"
              onClick={this.validateAddress} >Валидирай адрес</button>

            {this.state.isAddressValidated &&
              <div className="address-preview">
                <h6>Result</h6>

                <div className="ab-form__field__output__item">
                  <h6>formatted_address: </h6>
                  <p>{ address && address.formatted_address}</p>
                </div>
                <div className="ab-form__field__output__item">
                  <h6>locality: </h6>
                  <p>{ address && address.locality}</p>
                </div>
                <div className="ab-form__field__output__item">
                  <h6>municipality: </h6>
                  <p>{ address && address.municipality}</p>
                </div>
                <div className="ab-form__field__output__item">
                  <h6>position: </h6>
                  <p>{ address && address.position.lat } { address && address.position.lng }</p>
                </div>
              </div>}
          </FormGroup>

          <h6>Contact person</h6>
          <FormGroup label="Name">
            <input
              ref="contact_name"
              type="text"
              placeholder='Name'
              onBlur={this.validationCheck} />
          </FormGroup>
          <FormGroup label="Position">
            <input
              ref="contact_position"
              type="text"
              placeholder='Position'
              onBlur={this.validationCheck} />
          </FormGroup>
          <FormGroup label="Email">
            <input
              ref="contact_email"
              type="text"
              placeholder='Email'
              onBlur={this.validationCheck} />
          </FormGroup>
          <FormGroup label="Phone number">
            <input
              ref="contact_phone"
              type="text"
              placeholder='Phone'
              onBlur={this.validationCheck} />
          </FormGroup>
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
            <div className="ab-form__field field--validate">
              <div className="wrapper">
                <input
                  ref="address"
                  autoComplete="off"
                  type="text"
                  placeholder='Адрес'
                  required
                  defaultValue={'null'}
                  onBlur={this.updateAddress} />

                <button
                  className="address-validate ab-button ab-button--sm ab-button--default"
                  onClick={this.updateAddress} >Валидирай адрес</button>
              </div>

              { this.state.hospital && this.state.hospital.address.formattedAddress &&
                <div className="ab-form__field__output">
                  <h6>Result</h6>

                  <div className="ab-form__field__output__item">
                    <h6>Форматиран адрес: </h6>
                    <p></p>
                  </div>
                  <div className="ab-form__field__output__item">
                    <h6>Населено място: </h6>
                    <p></p>
                  </div>
                  <div className="ab-form__field__output__item">
                    <h6>Географска позиция: </h6>
                    <p></p>
                  </div>
                </div>
              }
            </div>
          </div> */
