import React, { Component } from 'react';
import _ from 'lodash';



// pull from DB!!!
const products = [
  {
    product_id: 'GOWN',
    display_name: 'Medical gowns'
  },
  {
    product_id: 'MASK_N95',
    display_name: 'Medical gowns'
  },
  {
    product_id: 'OVERSHOES',
    display_name: 'Medical gowns'
  },
  {
    product_id: 'GLOVES',
    display_name: 'Medical gowns'
  }
];

class AddHospitalEquipment extends Component {

  constructor(props) {
    super(props);

    const fields = props.getStore
    this.state = {
      ...props.getStore(),
      isAddressValidated: false
    };

    this._validateOnDemand = false; // maybe enable later

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;
  }

  isValidated() {
    const request = this._grabUserInput();
    const { updateStore } = this.props;

    updateStore({ request });
  }

  // grab and process input
  _grabUserInput() {
    let request = [];

    _.forEach(products, product => {
      console.log(Number(this.refs[product.product_id].value));
      if (Number(this.refs[product.product_id].value) > 0) {
        request.push({
          product_id: product.product_id,
          count_requested: Number(this.refs[product.product_id].value)
        })
      }
    });

    return request;
  }

  // for each product,
  // generate a new field that asks for
  // number(necessity). availability later

  render() {
    console.log('state', this.state);
    return (
      <div className="ab-form__step">
        <form className="ab-form">
          { products && products.map((product, index) => {
            let { product_id, display_name } = product;
            return (
              <div className="ab-form__group" key={`product--${index}`}>

                <div className="ab-form__field field--units">
                  <label className="ab-form__label">
                    { display_name }
                  </label>
                  <div className="field-wrapper">
                    <input
                      ref={product_id}
                      autoComplete="off"
                      type="number"
                      placeholder='amount'
                      defaultValue={0} />
                  </div>
                </div>
              </div>
            );
          })}

        </form>
      </div>
    )
  }
}

export default AddHospitalEquipment;

