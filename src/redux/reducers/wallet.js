// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { STORE_FETCHED_CURRENCIES } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case STORE_FETCHED_CURRENCIES:
    return {
      ...state,
      currencies: action.currenciesData,
    };
  default:
    return state;
  }
};
