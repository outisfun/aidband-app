import React from 'react';
import Container from './layout/Container';
import HospitalListItem from './hospitals/HospitalListItem';

import _ from 'lodash';

const HospitalsList = ({ hospitals }) =>  {

  return (
    <div className="ab-hospitals__list">
      <Container>
        <div className="ab-hospitals__list__labels">
          <h6 className="ab-list__label ab-h6 label--1">
            Hospital name
          </h6>
          <h6 className="ab-list__label ab-h6 label--2">
            Needs
          </h6>
          <h6 className="ab-list__label ab-h6 label--120">
            Contacts
          </h6>
        </div>
        <div className="ab-hospitals__list--inner">
          { hospitals && hospitals.map((hospital, index) => {
            return <HospitalListItem {...hospital} key={`hospital--${index}`} />
          })}
        </div>
      </Container>
    </div>
  )

}

export default HospitalsList;
