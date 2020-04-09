import React, { Component } from 'react';
import { firestore } from '../utils/firebase.js';
import StepZilla from "react-stepzilla";

import Container from "./layout/Container";

// steps
import AddHospitalDetails from './forms/_AddHospitalDetails';
import AddHospitalEquipment from './forms/_AddHospitalEquipment';
import AddHospitalThankYou from './forms/_AddHospitalThankYou';

const fields_contact = {
  name: 'Д-р Куин',
  position: 'Шеф на ДКЦ',
  phone_numbers: [],
  emails: [],
  is_public_contact: true, // set by admin manually?
}

const fields_request = {
  hospital_id: '',
  created_date: null, // timestamp
  created_by: fields_contact,
  status: 'PENDING',
  products: [
    {
      product_id: 'GOWN',
      count_requested: 5
    }
  ]
}

const fields_address = {
  formatted_address: '',
  locality: '',
  municipality: '',
  position: {
    lat: 0,
    lng: 0
  }
}

const fields_timestamp = {
  created_by: '',
  created_date: null, // normal timestamp
  modified_by: '',
  modified_date: null, // normal timestamp
  modified_reason: 'INITIAL_INSERT'
}

const fields_hospital = {
  name: null,
  description: null,
  address: fields_address,

  // store sums for convenience to avoid extra requests
  product_sums: [],

  contacts: [ fields_contact ], // COLLECTION
  timestamp: fields_timestamp // COLLECTION
}

class AddHospital extends Component {

  state = {
    id: null,
    currentStep: null
  }

  sampleStore = {
    ...fields_hospital,
    request: fields_request
  }
  hasUploaded = false;

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }

  uploadToFB() {

    let { name, description, address, product_sums, contacts, timestamp, request } = this.sampleStore;

    // replace later, as hospitals have profiles and can make multiple requests
    request.map(product => {
      product_sums.push({
        product_id: product.product_id,
        sum_requested: product.count_requested,
        sum_received: 0 // for now.
      });
    });

    timestamp = {
      created_by: 'admin@aidbind.com',
      created_date: new Date(),
      modified_by: '',
      modified_date: null, // normal timestamp
      modified_reason: 'INITIAL_INSERT'
    };

    const hospital = { name, description, address, product_sums, contacts, timestamp };



    firestore.collection('hospitals')
      .add(hospital)
      .then((docRef) => {
        const id = docRef.id;
        // now add request
        let _request = {
          products: request, // rename!
          hospital_id: id,
          created_date: new Date(),
          created_by: contacts[0]
        }

        console.log(_request);
        firestore.collection('requests')
          .add(_request)
          .then(_docRef => {
            console.log('added request');
          })
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    console.log(this.sampleStore, this.currentStep);
    const steps = [
      {
        name: "Име и локация",
        component:
          <AddHospitalDetails
            getStore={() => (this.getStore())}
            updateStore={(u) => {this.updateStore(u)}} />
      },
      {
        name: "Оборудване",
        component:
          <AddHospitalEquipment
            getStore={() => (this.getStore())}
            updateStore={(u) => {this.updateStore(u)}} />
      },
      {
        name: "Изпрати",
        component:
          <AddHospitalThankYou />
      }
    ]

    return (
      <Container>
        <div className="ab-add-hospital ab-form__steps">
          <h1>Добави болница</h1>
          <StepZilla
            steps={steps}
            preventEnterSubmission={true}
            nextTextOnFinalActionStep='Изпрати'
            prevBtnOnLastStep={false}
            stepsNavigation={false}
            onStepChange={step => {
                this.setState({ currentStep: step });
                window.sessionStorage.setItem("step", step);

                if (step === 2 && !this.hasUploaded) {
                  this.hasUploaded = true;
                  this.uploadToFB();
                }
              }
            }
          />
        </div>
      </Container>
    )
  }
}

export default AddHospital;
