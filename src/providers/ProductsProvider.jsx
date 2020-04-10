import React, { Component, createContext } from 'react';
import { firestore } from '../utils/firebase.js';
import { collectIdsAndDocs } from '../utils/tools.js';

export const ProductsContext = createContext({ products: null });

class ProductsProvider extends Component {
  state = {
    products: null
  }

  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore.collection('products').onSnapshot(snapshot => {
      const products = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ products });
    });
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  render() {
    const { products } = this.state;
    const { children } = this.props;

    return (
      <ProductsContext.Provider value = {products}>{children}</ProductsContext.Provider>
    )
  }

}

export default ProductsProvider;
