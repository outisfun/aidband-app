import React, { Component } from 'react';
import { firestore } from '../utils/firebase.js';
import StepZilla from "react-stepzilla";

// steps
import AddHospitalDetails from './forms/_AddHospitalDetails';
import AddHospitalThankYou from './forms/_AddHospitalThankYou';


const defVals = {
  name: '',
  address: {
    city: '',
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
  departments: [
    {
      name: '',
      beds: 0 // ???
    }
  ],
  equipment: [
    {
      productId: 'mask', // ref za N95 maski primerno
      available: 100,
      needed: 400 // request is posted if needed > available
    },
    // { ... } // same za ostanalite
  ]
}

class AddHospital extends Component {

  state = {
    id: null,
    currentStep: null
  }

  sampleStore = defVals;

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }

    if (this.state.currentStep === 0) {
      this.uploadToFB();
    }
  }

  uploadToFB() {
    firestore.collection('hospitals')
      .add({ })
      .then((docRef) => {
        console.log('hospital added');
        // this.setState({ id: docRef.id });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const steps = [
      {
        name: "Добави име и локация",
        component:
          <AddHospitalDetails
            getStore={() => (this.getStore())}
            updateStore={(u) => {this.updateStore(u)}} />
      },
      {
        name: "Благодарим!",
        component:
          <AddHospitalThankYou />
      }
    ]

    return (
      <div className="ab-add-hospital ab-form__steps">
        <h1>add hospital</h1>
        <StepZilla
          steps={steps}
          preventEnterSubmission={true}
          nextTextOnFinalActionStep='final!'
          prevBtnOnLastStep={false}
          stepsNavigation={false}
          onStepChange={step => {
              this.setState({ currentStep: step });
              window.sessionStorage.setItem("step", step);
            }
          }
        />
      </div>
    )
  }
}

export default AddHospital;
