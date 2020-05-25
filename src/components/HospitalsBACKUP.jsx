import React, { Component } from 'react';
import { HospitalsContext } from '../providers/HospitalsProvider';
import SideNav from './layout/SideNav';
import Container from './layout/Container';

import FilterListItem from './hospitals/FilterListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import HospitalsMap from './HospitalsMap';
import HospitalsList from './HospitalsList';
import IosPin from 'react-ionicons/lib/IosPin';
import IosList from 'react-ionicons/lib/IosList';

import { firestore } from '../utils/firebase.js';
import { collectIdsAndDocs } from '../utils/tools.js';


import _ from 'lodash';

import products from '../utils/products.js'; // replace later
import municipalities from '../utils/municipalities.js';

import Isotope from 'isotope-layout';


class Hospitals extends Component {

  state = {
    hospitals: null
  }

  iso = null;

  filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function () {
      console.log('this is ', this);
      // var number = $(this).find('.number').text();
      // return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function () {
      console.log('this is ', this);
      // var name = $(this).find('.name').text();
      // return name.match( /ium$/ );
    }
  };

  isoOptions = {
    itemSelector: '.ab-hospital',
    layoutMode: 'masonry',
    getSortData: {
      name: '.name',
      number: '.number parseInt',
      weight: function( itemElem ) {
          // var weight = $( itemElem ).find('.weight').text();
          // return parseFloat( weight.replace( /[\(\)]/g, '') );
      }
    }
  };


  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore.collection('hospitals').onSnapshot(snapshot => {
      let hospitals = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ hospitals });

      if (this.iso === null) {
        this.iso = new Isotope('.ab-hospitals__list--inner', this.isoOptions);
        this.iso.arrange();
      }
    });
  }

  _filterItems() {
    this.iso.arrange({
      filter: '.metal'
    })
  }
  filterItems = this._filterItems.bind(this);

  /*<SideNav>
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
              <HospitalsList hospitals={_.filter(_hospitals, { 'isShown': true })} />
            </TabPanel>
            <TabPanel>
              <HospitalsMap hospitals={_.filter(_hospitals, { 'isShown': true })} />
            </TabPanel>

          </Tabs>*/

  render() {
    const { hospitals } = this.state;
    console.log('hospitals', hospitals);
    return (
      <div className="ab-hospitals has--sidenav">
        <HospitalsList hospitals={hospitals} />
      </div>
    )
  }

}

export default Hospitals;
