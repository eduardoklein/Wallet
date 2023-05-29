// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  STORE_FETCHED_CURRENCIES,
  EXPENSE_ARRAY,
  ATT_TOTAL } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalExpenses: '0',
};

export const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case STORE_FETCHED_CURRENCIES:
    return {
      ...state,
      currencies: action.currenciesData,
    };
  case EXPENSE_ARRAY:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        value: action.arrayInfo.value.toString(),
        description: action.arrayInfo.description,
        currency: action.arrayInfo.currency,
        method: action.arrayInfo.method,
        tag: action.arrayInfo.tag,
        exchangeRates: action.arrayInfo.exchangeRates,
      }],
    };
  case ATT_TOTAL: {
    const newTotalExpenses = Number(state.totalExpenses) + Number(action.value);
    return {
      ...state,
      totalExpenses: newTotalExpenses.toFixed(2),
    };
  }
  default:
    return state;
  }
};
