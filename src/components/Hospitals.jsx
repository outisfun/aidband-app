import React, { useContext, useState } from 'react';
import { HospitalsContext } from '../providers/HospitalsProvider';
import SideNav from './layout/SideNav';
import Container from './layout/Container';
import IosPinOutline from 'react-ionicons/lib/IosPinOutline';
import _ from 'lodash';

import products from '../utils/products.js'; // replace later

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

const _Hospital = ({ id, name, address, equipment, isShown }) => {
  const cls = isShown ? 'is--visible' : '';
  return (
    <div className={`ab-hospitals__list__item ab-hospital ${cls}`}>
      <div className="ab-hospital__info">
        <h3 className="ab-hospital__name">{ name }</h3>
        <div className="ab-hospital__location">
          <p className="ab-hospital__address">{address.locality}</p>
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
      </button>
    </div>
  )
}

const Hospitals = () => {
  const hospitals = useContext(HospitalsContext);
  const [filters, setFilters] = useState([]);
  console.log(hospitals);

  const toggleFilter = (filter) => {
    let _filters = filters;
    if (!(_.includes(_filters, filter))) {
      _filters.push(filter);

    } else {
      _.pull(_filters, filter);
    }
    setFilters([..._filters]);
  }

  return (

    <div className="ab-hospitals has--sidenav">
      <SideNav>
        <div className="ab-hospitals__filters ab-filters">
          <div className="ab-filter--products ab-filter__group">
            { products && products.map((product, index) => {
              const onClick = () => { toggleFilter(product.id); };
              const cls = (_.includes(filters, product.id)) ? 'is--active' : '';

              return (
                <button
                  key={`filter--${product.id}`}
                  className={`ab-filter__item ${cls}`}
                  onClick={onClick}
                  data-product={product.id}>
                    {product.displayName}
                </button>
              )
            })}
          </div>
        </div>
      </SideNav>
      <div className="ab-hospitals__list">
        <div className="ab-hospitals__list__labels">
        </div>
        <Container>
          { hospitals && hospitals.map((hospital, index) => {

            let isShown = true;
            if (filters.length > 0) {
              isShown = false;

              // start checking?
              _.forEach(hospital.equipment, item => {
                if (_.includes(filters, item.productId)) {
                  isShown=true;
                }
              });
            }
            return <_Hospital {...hospital} isShown={isShown} key={`hospital--${index}`} />

          })}
        </Container>
      </div>
    </div>
  )
}

export default Hospitals;
