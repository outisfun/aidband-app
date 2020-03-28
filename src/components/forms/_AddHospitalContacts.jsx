import React, { Component } from 'react';


class AddHospitalContacts extends Component {

  state = {
    contact: [
      {
        name: '',
        email: '',
        phoneNumber: ''
      }
    ]
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
                defaultValue={this.state.contact && this.state.contact[0].name}
                onBlur={this.validationCheck} />
            </div>
          </div>

          <div className="ab-form__group">
            <label className="ab-form__label">
              Email
            </label>
            <div className="ab-form__field">
              <input
                ref="email"
                autoComplete="off"
                type="text"
                placeholder='Име'
                required
                defaultValue={this.state.contact && this.state.contact[0].email}
                onBlur={this.validationCheck} />
            </div>
          </div>

          <div className="ab-form__group">
            <label className="ab-form__label">
              Телефон
            </label>
            <div className="ab-form__field">
              <input
                ref="phone"
                autoComplete="off"
                type="text"
                placeholder='Име'
                required
                defaultValue={this.state.contact && this.state.contact[0].phoneNumber}
                onBlur={this.validationCheck} />
            </div>
          </div>

        </form>
      </div>
    )
  }
}

export default AddHospitalContacts;

