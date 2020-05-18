import React, { useContext, useState, useEffect } from 'react';
import { HospitalsContext } from '../providers/HospitalsProvider';
import { ProductsContext } from '../providers/ProductsProvider';
import { LocaleContext } from "../providers/LocaleProvider";
import SideNav from './layout/SideNav';
import FilterListItem from './hospitals/FilterListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import HospitalsMap from './HospitalsMap';
import IosPin from 'react-ionicons/lib/IosPin';
import MdList from 'react-ionicons/lib/MdList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Container from './layout/Container';

import TextResourceHandler from "../utils/textResourceHandler";

import _ from 'lodash';

//import products from '../utils/products.js'; // replace later
import municipalities from '../utils/municipalities.js';
import HospitalsList from './HospitalsList';

const Hospitals = () => {

  const hospitals = useContext(HospitalsContext);
  const products = useContext(ProductsContext);
  const locale = useContext(LocaleContext).state;

  const [filters, setFilters] = useState([]);
  const [currentMunicipalities, setMunicipalities] = useState([]);
  const [texts, setTexts] = useState(new TextResourceHandler());
  
  useEffect(() => {
    async function getTexts() {
      const handler = new TextResourceHandler("hospitals", locale.lang);
      await handler.loadTexts();
      setTexts(handler);
    }
    getTexts();
  }, [locale.lang]);

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

    if (!(_.includes(_municipalities, municipality))) {
      _municipalities.push(municipality);
    } else {
      _.pull(_municipalities, municipality);
    }
    setMunicipalities([..._municipalities]);
  }

  let _hospitals = hospitals ? [...hospitals] : null;

  _.forEach(_hospitals, hospital => {
    let _onLocation = true;
    let _onEquipment = true; // display by default

    //console.log(hospital);

    if (filters.length) {
      _onEquipment = false;
      const { product_sums } = hospital;
      _.forEach(product_sums, product => {
        if (_.includes(filters, product.product_id)) {
          _onEquipment = true;
        }
      });
    }

    if (currentMunicipalities.length) {
      _onLocation = false;
      if (_.includes(currentMunicipalities, hospital.address.municipality)) {
        _onLocation = true;
      }

      // workaround for differences between geocoder exported address and municipalities' names
      if (_.includes(currentMunicipalities, "София") && _.includes(hospital.address.municipality, "София")) {
        _onLocation = true;
      }
    }
    hospital.isShown = (_onLocation && _onEquipment);
  });

  /*  */
  return (
    <div className="ab-hospitals has--sidenav">

      <SideNav>
        <Scrollbars style={{ height: (window.innerHeight - 90) }}>
          <div className="ab-hospitals__filters ab-filters">
            <div className="ab-filter__group ab-filter--products">
              <h6 className="ab-filter__group__title">
                {texts.get("filterHeaderProducts")}
              </h6>
              {products && products.map((product, index) => {
                const onClick = () => { toggleFilter(product.id); };
                const cls = (_.includes(filters, product.id)) ? 'is--active has--icon' : 'has--icon';
                const { display_name } = product;
                return (
                  <FilterListItem
                    key={`filter--${product.id}`}
                    cls={cls}
                    iconName={product.id}
                    text={display_name[locale.lang]}
                    onClick={onClick} />
                )
              })}
            </div>

            <div className="ab-filter__group ab-filter--products">
              <h6 className="ab-filter__group__title">Municipalities</h6>
              {municipalities && municipalities.map((municipality, index) => {
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
          <Container>
            <TabList>
              <Tab><MdList className="ab-icon ab-icon--sm" />
                <p>
                  {texts.get("listLinkText")}
                </p>
              </Tab>
              <Tab><IosPin className="ab-icon ab-icon--sm" />
                <p>
                  {texts.get("mapLinkText")}
                </p>
              </Tab>
            </TabList>
          </Container>
        </div>

        <TabPanel>
          <HospitalsList hospitals={_hospitals} />
        </TabPanel>
        <TabPanel>
          <HospitalsMap hospitals={_.filter(_hospitals, { 'isShown': true })} />
        </TabPanel>

      </Tabs>

    </div>
  )
}

export default Hospitals;
