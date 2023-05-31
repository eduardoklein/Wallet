// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  STORE_FETCHED_CURRENCIES,
  EXPENSE_ARRAY,
  ATT_TOTAL,
  DELETE_EXPENSE,
  SHOW_EDIT_FORM,
  ID_TO_EDIT,
  HANDLE_EDIT } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: '0',
  showEditForm: false,
  idToEdit: '',
};

const handleExpenseArray = (state, action) => ({
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
});

const editObj = (state, action) => {
  const newExpenses = state.expenses.map((el) => {
    if (el.id === action.expense.id) {
      return {
        ...el,
        value: action.expense.value.toString(),
        description: action.expense.description,
        currency: action.expense.currency,
        method: action.expense.method,
        tag: action.expense.tag,
      };
    }
    return el;
  });
  return {
    ...state,
    expenses: newExpenses,
  };
};

export const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case STORE_FETCHED_CURRENCIES:
    return {
      ...state,
      currencies: action.currenciesData,
    };
  case EXPENSE_ARRAY:
    return handleExpenseArray(state, action);
  case ATT_TOTAL: {
    console.log(state.expenses);
    const newTotal = state.expenses.reduce((initialValue, newValue) => {
      console.log(newValue);
      return initialValue
      + (Number(newValue.value)
      * Number(newValue.exchangeRates[newValue.currency].ask));
    }, 0);
    return {
      ...state,
      totalExpenses: newTotal.toFixed(2),
    };
  }
  case DELETE_EXPENSE: {
    const newTotalExpenses = Number(state.totalExpenses) - Number(action.value);
    const arrayAfterDeletion = state.expenses.filter((exp) => exp.id !== action.id);
    return {
      ...state,
      expenses: arrayAfterDeletion,
      totalExpenses: newTotalExpenses.toFixed(2),
    };
  }
  case SHOW_EDIT_FORM: {
    return {
      ...state,
      showEditForm: action.boolean,
    };
  }
  case ID_TO_EDIT: {
    return {
      ...state,
      idToEdit: action.id,
    };
  }
  case HANDLE_EDIT: {
    return editObj(state, action);
  }
  default:
    return state;
  }
};
