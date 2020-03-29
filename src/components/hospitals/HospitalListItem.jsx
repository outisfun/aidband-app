import React from 'react';
import IosPinOutline from 'react-ionicons/lib/IosPinOutline';
import IosEyeOutline from 'react-ionicons/lib/IosEyeOutline';

const GmapsLink = ({ lat, lng }) => {

  const href=`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <a target="_blank"
        className="ab-link ab-link--external"
        href={href}>
        <IosPinOutline className="ab-icon ab-icon--xs" />
        <small>Към карта</small>
    </a>
  )
}

const HospitalListItem = ({ id, name, address, equipment }) => {
  const displayAddress = (address.locality !== address.municipality) ? `${address.locality}, ${address.municipality}` : address.locality;

  return (
    <div className={`ab-hospitals__list__item ab-hospital`}>
      <div className="ab-hospital__info">
        <h3 className="ab-hospital__name">{ name }</h3>
        <div className="ab-hospital__location">
          <p className="ab-hospital__address">{ displayAddress }</p>
          <GmapsLink {...address.position} />
        </div>
      </div>
      <div className="ab-hospital__equipment ab-equipment">
        {
          equipment && equipment.map((item, index) => {
            return (
              <div className="ab-equipment__item">
                <span className="ab-equipment__item__name">{item.displayName}</span>
                <span className="ab-equipment__item__amount">{item.amount}</span>
              </div>
            )
          })
        }
      </div>
      <button className="ab-hospital__more">
        <IosEyeOutline fontSize="42px" />
        <span>Покажи</span>
      </button>
    </div>
  )
}

export default HospitalListItem;
