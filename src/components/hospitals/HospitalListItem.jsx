import React, { useContext } from 'react';
import IosPinOutline from 'react-ionicons/lib/IosPinOutline';
import IosEyeOutline from 'react-ionicons/lib/IosEyeOutline';
import _ from 'lodash';
import { ProductsContext } from '../../providers/ProductsProvider';
import Icon from '../elements/Icon';

const lang = 'en';

const GmapsLink = ({ lat, lng }) => {
  const href=`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  return (
    <a target="_blank"
        className="ab-link ab-link--external"
        href={href}>
        <IosPinOutline className="ab-icon ab-icon--xs" />
        <small>View on Google maps</small>
    </a>
  )
}

const HospitalListItem = ({ id, hospital_name, address, product_sums, isShown }) => {
  // don't show municipality if it's the same as the locality
  // for example, no need to say Plovdiv, Plovdiv :)

  let displayAddress = "";
  if (address) {
    displayAddress = (!(_.includes(address.municipality, address.locality))) ? `${address.locality}, ${address.municipality}` : address.locality;
  } else {
    displayAddress = "No Address Specified";
  }

  const cls = isShown ? 'is--visible' : ''; // hidden by default, unless isShown is true
  const products = useContext(ProductsContext);
  //console.log('hospital address', address);
  return (
    <div className={`ab-hospitals__list__item ab-hospital ${cls}`}>

      <div className="ab-hospital__info">
        <h4 className="ab-hospital__name">{ hospital_name }</h4>
        <div className="ab-hospital__location">
          <small className="ab-hospital__address ab-address">{ displayAddress }</small>
          {address ? <GmapsLink {...address.position} /> : "Coordinates missing"}
        </div>
      </div>

      <div className="ab-hospital__products">
        {
          (product_sums && products) && product_sums.map((product, index) => {
            // const _product = products[product.product_id]; // match to official product record
            const _product = _.find(products, { 'id': product.product_id });
            return (
              <div className="ab-hospital__product" key={`item--${id}--${index}`}>
                <Icon name={product.product_id} />
                <span className="ab-hospital__product__amount">{product.sum_requested}</span>
              </div>
            )
          })
        }
      </div>
      <button className="ab-hospital__more">
        <IosEyeOutline fontSize="42px" />
        <small>Покажи</small>
      </button>
    </div>
  )
}

export default HospitalListItem;
