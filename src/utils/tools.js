import { firestore } from './firebase.js';
import _ from 'lodash';

export const collectIdsAndDocs = doc => {
  let _u = doc ? (doc.data() ? doc.data() : {}) : {};
  _u.id = doc ? doc.id : '';
  return { ..._u };
}

export const getDocRef = (collectionId, docId) => {
  return firestore.doc(`${collectionId}/${docId}`);
}

export const formatGeocoderResponse = (response) => {
  const res = response.results[0];
  console.log('res', res);
  if (res.geometry.location_type === 'APPROXIMATE') {
    // maybe they entered a city or something,
    // and not a precise address
    return {
      address: res.formatted_address,
      status: 'APPROXIMATE'
    }
  }
  const { lat, lng } = res.geometry.location;
  const formatted_address = res.formatted_address;
  let locality = '';
  let municipality = '';

  _.forEach(res.address_components, (comp) => {
    if (_.includes(comp.types, "locality")) {
      locality = comp.short_name;
    }
    if (_.includes(comp.types, "administrative_area_level_1")) {
      municipality = comp.short_name;
    }
  });

  let address = {
    locality: locality,
    municipality: municipality,
    formatted_address: formatted_address,
    position: { lat, lng }
  };

  return address;
}
