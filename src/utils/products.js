const products = [
  {
    id: 'mask_n95',
    displayName: 'Медицинска маска за многократна употреба',
    amountType: 'number',
    variableProps: {
      // unique for each product -> TBD later
    }
  },
  {
    id: 'faceshield',
    displayName: 'Предпазен шлем',
    amountType: 'number',
    variableProps: { }
  },
  {
    id: 'gown',
    displayName: 'Манта',
    amountType: 'number',
    variableProps: { }
  },
  {
    id: 'gloves',
    displayName: 'Ръкавици',
    amountType: 'number',
    variableProps: { }
  },
  {
    id: 'glasses',
    displayName: 'Очила',
    amountType: 'number',
    variableProps: { }
  },
  {
    id: 'disinfectant',
    displayName: 'Дезинфектант',
    amountType: 'quantity',
    units: 'ml',
    variableProps: { }
  },
  {
    id: 'spirt',
    displayName: 'Спирт',
    amountType: 'quantity',
    units: 'ml',
    variableProps: { }
  },
  {
    id: 'overshoes',
    displayName: 'Калцуни',
    amountType: 'number',
    variableProps: { }
  }
]

export default products;
