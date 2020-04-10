import React, { Component } from 'react';
import _ from 'lodash';
import { firestore } from '../../utils/firebase.js';
import { collectIdsAndDocs } from '../../utils/tools.js';

const lang = 'en';

class AddHospitalEquipment extends Component {

  constructor(props) {
    super(props);

    const fields = props.getStore
    this.state = {
      ...props.getStore(),
      isAddressValidated: false,
      areProductsLoaded: true
    };

    this.products = null; // load from db

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

    return true;
  }

  // grab and process input
  _grabUserInput() {
    let request = [];
    console.log('refs', this.refs);
    this.products && this.products.map(product => {

      if (Number(this.refs[product.id].value) > 0) {
        request.push({
          product_id: product.id,
          count_requested: Number(this.refs[product.id].value)
        });
      }
    })

    return request;
  }

  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore.collection('products').onSnapshot(snapshot => {
      const products = snapshot.docs.map(collectIdsAndDocs);
      this.products = products;
      console.log('products', this.products);
      this.setState({ areProductsLoaded: true });
    });
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  // for each product,
  // generate a new field that asks for
  // number(necessity). availability later

  render() {
    return (
      <div className="ab-form__step">
        <form className="ab-form">
          { this.products && this.products.map((product, index) => {
            let { id, display_name } = product;
            return (
              <div className="ab-form__group" key={`product--${index}`}>

                <div className="ab-form__field field--units">
                  <label className="ab-form__label">
                    { display_name[lang] }
                  </label>
                  <div className="field-wrapper">
                    <input
                      ref={id}
                      autoComplete="off"
                      type="number"
                      placeholder='amount' />
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

