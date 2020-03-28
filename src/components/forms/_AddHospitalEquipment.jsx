import React, { Component } from 'react';
import products from '../../utils/products.js'; // replace later
import _ from 'lodash';


class AddHospitalEquipment extends Component {

  state = {
    equipment: []
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
    const { equipment } = this._grabUserInput();
    const { updateStore } = this.props;

    updateStore({ equipment });
  }

  // grab and process input
  _grabUserInput() {
    let equipment = [];
    _.forEach(products, product => {
      console.log(Number(this.refs[product.id].value));
      if (Number(this.refs[product.id].value) > 0) {
        equipment.push({
          productId: product.id,
          displayName: product.displayName,
          amount: Number(this.refs[product.id].value)
        })
      }
    });

    return { equipment };
  }

  // for each product,
  // generate a new field that asks for
  // number(necessity). availability na po-kysen etap

  render() {

    return (
      <div className="ab-form__step">
        <form className="ab-form">
          { products && products.map((product, index) => {
            let { id, displayName, amountType, units } = product;
            if (!units) { units = "бр." }
            return (
              <div className="ab-form__group" key={`product--${index}`}>

                <div className="ab-form__field field--units">
                  <label className="ab-form__label">
                    { displayName }
                  </label>
                  <div className="field-wrapper">
                    <input
                      ref={id}
                      autoComplete="off"
                      type="number"
                      placeholder='amount'
                      defaultValue={0} />
                    <span className="units">
                      { units }
                    </span>
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

