import React from 'react';
import IosPinOutline from 'react-ionicons/lib/IosPinOutline';
import IosEyeOutline from 'react-ionicons/lib/IosEyeOutline';
import _ from 'lodash';

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

const HospitalListItem = ({ id, name, address, product_sums, isShown }) => {
  // don't show municipality if it's the same as the locality
  // for example, no need to say Plovdiv, Plovdiv :)
  let displayAddress = "";
  if (address) {
    displayAddress = (!(_.includes(address.municipality, address.locality))) ? `${address.locality}, ${address.municipality}` : address.locality;
  } else {
    displayAddress = "No Address Specified";
  }

  const cls = isShown ? 'is--visible' : 'is--hidden';

  return (
    <div className={`ab-hospitals__list__item ab-hospital ${cls}`}>
      <div className="ab-hospital__info">
        <div className="sorts">
          <span className="name">{name}</span>
          <span className="number">{name.length}</span>
        </div>
        <h4 className="ab-hospital__name">{ name }</h4>
        <div className="ab-hospital__location">
          <p className="ab-hospital__address">{ displayAddress }</p>
          {address ? <GmapsLink {...address?.position} /> : "Coordinates missing"}
        </div>
      </div>
      <div className="ab-hospital__equipment ab-equipment">
        {
          product_sums && product_sums.map((product, index) => {
            return (
              <div className="ab-equipment__item" key={`item--${id}--${index}`}>
                <span className="ab-equipment__item__name">{product.product_id}</span>
                <span className="ab-equipment__item__amount">{product.sum_requested}</span>

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
