import React, { Component } from 'react';
import NodeGeocoder from 'node-geocoder';
import Geocode from 'react-geocode';
import { formatGeocoderResponse } from '../../utils/tools.js';
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

const FormGroup = ({ label, valCls, valMsg, children }) => {
  return (
    <div className={`ab-form__group ${valCls}`}>
      <label className="ab-form__label">
        {label}
      </label>
      <div className="ab-form__field">
        {children}
      </div>
      <span className="error-message">{valMsg}</span>
    </div>
  )
}

class AddHospitalDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...props.getStore(),
      isValidated: null
    };

    this._isAddressValidated = null; // then is either false or true depending on whether it validates
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this._validationErrors = null;

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
  }

  // it's run on step submit, so this is where
  // the store in AddHospital gets updated =>
  // collect all data from user input, and display error messages
  // wherever necessary
  isValidated() {
    // FIX THIS
    return new Promise((resolve, reject) => {
      // should also be validating title though.
      const userInput = this._grabUserInput();
      this._validationErrors = this._validateData(userInput);

      const _onAddressValidation = (address) => {
        console.log('address ', address);
        // address returns object or false
        if (address) {
          this._validationErrors.address = true;

          // address is ok, and so are all the other fields.
          if (!(_.includes(this._validationErrors, false))) {
            const { updateStore } = this.props;
            let hospital = {
              hospital_name: userInput.hospital_name
            }
            let contact = {
              name: userInput.contact_name,
              phone: userInput.contact_phone,
              position: userInput.contact_position,
              email: userInput.contact_email
            }
            hospital.address = address;
            hospital.contacts = [];
            hospital.contacts.push(contact);
            updateStore(hospital);

            this.setState({ isValidated: true });
            resolve();
          } else {
            this.setState({ isValidated: false });
            reject();
          }
        } else {
          this.setState({ isValidated: false });
          console.log('not happening because we got shitty address or something');
          reject();
        }
      };

      // address formatting and validation is async,
      // so make sure the promise resolves or rejects
      // only after it's done.
      this._validateAddress(_onAddressValidation);
    });
  }

  _validateData(data) {
    // data = { name: '', contact: { name, position, phone, email } }
    const { hospital_name, contact_name, contact_phone, contact_position, contact_email } = data;
    return {
      hospital_name: (hospital_name !== ''), // required: anything besides N/A
      contact_name: true, //(contact_name !== ''),
      contact_phone: true, //(contact_phone.length > 0), // can be more precise
      contact_position: true,
      contact_email: true
    };
  }

  _grabUserInput() {
    return {
      hospital_name: this.refs.hospital_name.value,
      address: this.refs.address.value,
      contact_name: this.refs.contact_name.value,
      contact_phone: this.refs.contact_phone.value, // can be more precise
      contact_position: this.refs.contact_position.value,
      contact_email: this.refs.contact_email.value
    };
  }

  // Geocodes user input address ->
  // Sets state!!! -> accepts callback for once state is set.
  _validateAddress = (callback) => {

    const { address } = this._grabUserInput();

    if (address) {
      Geocode.fromAddress(address).then(
        response => {
          const address = formatGeocoderResponse(response);
          this._isAddressValidated = true;
          callback(address);
        },
        error => {
          this._isAddressValidated = false;
          callback(false);
          console.error(error);
        }
      );
    } else {
      callback(false); // we didn't get an address
    }
  }



  validateAddress = (e) => {
    e.preventDefault();
    //this._geocodeAddress();
  }

  render() {
    const { hospital_name, address, contacts } = this.state;
    console.log('render with state', this.state);
    const cls = (this._isAddressValidated !== false) ? 'address-ok' : 'cannot-submit';

    // had at least one round of validation
    let validationClasses = false;
    console.log('val errors', this._validationErrors);
    if (this._validationErrors !== null) {
      console.log('its not null though');
      validationClasses = {};
      _.forEach(this._validationErrors, (fieldValue, key) => {
        console.log('fk', fieldValue, key);
        validationClasses[key] = fieldValue ? '' : 'is--not-validated';
      });
    }

    console.log('val classes', validationClasses);

    return (
      <div className={`ab-form__step ${cls}`}>
        <form className="ab-form">
          {/* Hospital name, description, address */}
          <FormGroup
            label="Name"
            valCls={validationClasses && validationClasses.hospital_name}
            valMsg='Please add hospital name'>
            <input
              ref="hospital_name"
              type="text"
              placeholder='Name'
              required
              defaultValue={ hospital_name }
              onBlur={this.validationCheck} />
          </FormGroup>

          <FormGroup
            label="Address"
            valCls={validationClasses && validationClasses.address}
            valMsg='Please add address'>
            <input
              ref="address"
              autoComplete="off"
              type="text"
              placeholder='Address'
              required
              onBlur={this.validateAddress} />
          </FormGroup>

          <h6>Contact person</h6>
          <FormGroup
            label="Name"
            valCls={validationClasses && validationClasses.contact_name}
            valMsg='Please add your name'>
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
          <FormGroup
            label="Phone number"
            valCls={validationClasses && validationClasses.contact_phone}
            valMsg='Please add your phone number'>
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

/*
            {this._isAddressValidated &&
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
              </div>} */

