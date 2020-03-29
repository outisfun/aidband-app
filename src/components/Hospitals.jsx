import React, { useContext, useEffect, useState } from 'react';
import { HospitalsContext } from '../providers/HospitalsProvider';
import SideNav from './layout/SideNav';
import Container from './layout/Container';
import HospitalListItem from './hospitals/HospitalListItem';
import FilterListItem from './hospitals/FilterListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import HospitalsMap from './HospitalsMap';
import IosPin from 'react-ionicons/lib/IosPin';
import IosList from 'react-ionicons/lib/IosList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import _ from 'lodash';

import products from '../utils/products.js'; // replace later
import municipalities from '../utils/municipalities.js';


const Hospitals = () => {

  const hospitals = useContext(HospitalsContext);

  const [currentHospitals, setCurrentHospitals] = useState([]);
  const [filters, setFilters] = useState([]);
  const [currentMunicipalities, setMunicipalities] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API
    console.log('use effect');
  });

  const toggleFilter = (filter) => {
    let _filters = filters;
    if (!(_.includes(_filters, filter))) {
      _filters.push(filter);
    } else {
      _.pull(_filters, filter);
    }
    setFilters([..._filters]);
  }

  const toggleMunicipality = (municipality) => {
    let _municipalities = currentMunicipalities;
    console.log('filter', municipality, currentMunicipalities);

    if (!(_.includes(_municipalities, municipality))) {
      _municipalities.push(municipality);
    } else {
      _.pull(_municipalities, municipality);
    }
    console.log(municipality, _municipalities);
    setMunicipalities([..._municipalities]);
  }

  // hospitals && setCurrentHospitals([...hospitals]);



  let _hospitals = hospitals ? [...hospitals] : null;


  _.forEach(_hospitals, hospital => {

    let __onLocation = true;
    let __onEquipment = true; // display by default

    if (filters.length) {
      __onEquipment = false;

      console.log('whaat', _hospitals, hospital, hospital && hospital.equipment);
      if (hospital) {
          _.forEach(hospital.equipment, (item) => {
          if (_.includes(filters, item.productId)) {
            __onEquipment = true;
          }
        });
      }

    }

    if (currentMunicipalities.length) {
      __onLocation = false;

      if (hospital) {
        if (_.includes(currentMunicipalities, hospital.address.municipality)) {
          __onLocation = true;
        }

        if (_.includes(currentMunicipalities, "София") && _.includes(hospital.address.municipality, "София")) {
          __onLocation = true;
        }
      }
    }

    const isShown = (__onLocation && __onEquipment);

    hospital.isShown = isShown;
    // console.log('is it shown ', isShown, __onLocation, __onEquipment, hospital);
    // (!isShown) && _.pull(_hospitals, hospital);
    // (isShown && (!_.includes(_hospitals, hospital))) && _hospitals.push(hospital);
  });

  return (

    <div className="ab-hospitals has--sidenav">
      <SideNav>
        <Scrollbars style={{ height: (window.innerHeight - 90) }}>
          <div className="ab-hospitals__filters ab-filters">
            <div className="ab-filter--products ab-filter__group">
              <h6 className="ab-filter__group__title">Продукти</h6>
              { products && products.map((product, index) => {
                const onClick = () => { toggleFilter(product.id); };
                const cls = (_.includes(filters, product.id)) ? 'is--active' : '';

                return (
                  <FilterListItem
                    key={`filter--${product.id}`}
                    cls={cls}
                    text={product.displayName}
                    onClick={onClick} />
                )
              })}
            </div>

            <div className="ab-filter--products ab-filter__group">
              <h6 className="ab-filter__group__title">Области</h6>
              { municipalities && municipalities.map((municipality, index) => {
                const onClick = () => { toggleMunicipality(municipality); };
                const cls = (_.includes(currentMunicipalities, municipality)) ? 'is--active' : '';

                return (
                  <FilterListItem
                    key={`filter--${municipality}`}
                    cls={cls}
                    text={municipality}
                    onClick={onClick} />
                )
              })}
            </div>
          </div>
        </Scrollbars>
      </SideNav>

        <Tabs onSelect={(val) => {
          }}>
          <div className="ab-tablist">
            <TabList>
              <Tab><IosList className="ab-icon ab-icon--sm" /><small>Списък</small></Tab>
              <Tab><IosPin className="ab-icon ab-icon--sm" /><small>Карта</small></Tab>
            </TabList>
          </div>

          <TabPanel>
            <div className="ab-hospitals__list">
              <Container>
                <div className="ab-hospitals__list__labels">
                  <h6 className="ab-list__label ab-h6 label--1">
                    Здравно заведение
                  </h6>
                  <h6 className="ab-list__label ab-h6 label--2">
                    Нужди
                  </h6>
                  <h6 className="ab-list__label ab-h6 label--120">
                    Контакти
                  </h6>
                </div>
                { _hospitals && _.filter(_hospitals, { 'isShown': true }).map((hospital, index) => {
                  return <HospitalListItem {...hospital} key={`hospital--${index}`} />
                })}
              </Container>
            </div>
          </TabPanel>
          <TabPanel>
            <HospitalsMap hospitals={_.filter(_hospitals, { 'isShown': true })} />
          </TabPanel>

        </Tabs>

    </div>
  )
}

export default Hospitals;
