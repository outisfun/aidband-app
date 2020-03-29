import React, { Component } from 'react';
import { firestore } from '../utils/firebase.js';
import StepZilla from "react-stepzilla";

import Container from "./layout/Container";

// steps
import AddHospitalDetails from './forms/_AddHospitalDetails';
import AddHospitalEquipment from './forms/_AddHospitalEquipment';
import AddHospitalThankYou from './forms/_AddHospitalThankYou';


const defVals = {
  name: '',
  address: {
    locality: '',
    formattedAddress: '',
    position: {
      lat: 0,
      lng: 0
    }
  },
  contact: [
    {
      name: '',
      email: '',
      phoneNumber: ''
    }
  ],
  equipment: []
}

class AddHospital extends Component {

  state = {
    id: null,
    currentStep: null
  }

  sampleStore = defVals;
  hasUploaded = false;

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    console.log('we get update ', update);
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }

  uploadToFB() {
    const hospital = this.sampleStore;

    firestore.collection('hospitals')
      .add(hospital)
      .then((docRef) => {
        console.log('hospital added!');
        // this.setState({ id: docRef.id });
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
                console.log('step change to ', step);
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
