import React, { useContext, useState, useEffect } from 'react';
import { HospitalsContext } from '../providers/HospitalsProvider';

const Hospitals = () => {
  const hospitals = useContext(HospitalsContext);

  return (
    <div>Hospitals!</div>
  )
}

export default Hospitals;
