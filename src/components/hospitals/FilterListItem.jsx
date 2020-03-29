import React from 'react';

const FilterListItem = ({ text, cls, onClick }) => {

  return (
    <button
      className={`ab-filter__item ${cls}`}
      onClick={onClick}>
        {text}
    </button>
  )
}

export default FilterListItem;
