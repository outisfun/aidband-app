import React, { Component, createContext } from 'react';
import { firestore } from '../utils/firebase.js';
import { collectIdsAndDocs } from '../utils/tools.js';

export const HospitalsContext = createContext({ hospitals: null });

class HospitalsProvider extends Component {
  state = {
    hospitals: null
  }

  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore.collection('hospitals').onSnapshot(snapshot => {
      const hospitals = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ hospitals });
    });
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  render() {
    const { hospitals } = this.state;
    const { children } = this.props;

    return (
      <HospitalsContext.Provider value = {hospitals}>{children}</HospitalsContext.Provider>
    )
  }

}

export default HospitalsProvider;
