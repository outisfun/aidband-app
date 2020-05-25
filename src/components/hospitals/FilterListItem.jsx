import React from 'react';
import Icon from '../elements/Icon';

const FilterListItem = ({ text, cls, onClick, iconName }) => {
  return (
    <button
      className={`ab-filter__item ${cls}`}
      onClick={onClick}>
        {iconName && <Icon name={iconName} />}
        <small>{text}</small>
    </button>
  )
}

export default FilterListItem;
