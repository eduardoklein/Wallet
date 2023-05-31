import {
  ADD_EMAIL,
  STORE_FETCHED_CURRENCIES,
  EXPENSE_ARRAY,
  ATT_TOTAL,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SHOW_EDIT_FORM,
  ID_TO_EDIT,
  HANDLE_EDIT } from './actionTypes';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const fetchCurrencies = (currenciesData) => ({
  type: STORE_FETCHED_CURRENCIES,
  currenciesData,
});

export const expenseArray = (arrayInfo) => ({
  type: EXPENSE_ARRAY,
  arrayInfo,
});

export const attTotal = () => ({
  type: ATT_TOTAL,
});

export const deleteExpense = (id, value) => ({
  type: DELETE_EXPENSE,
  id,
  value,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const showEditForm = (boolean) => ({
  type: SHOW_EDIT_FORM,
  boolean,
});

export const idToEdit = (id) => ({
  type: ID_TO_EDIT,
  id,
});

export const handleEdit = (expense) => ({
  type: HANDLE_EDIT,
  expense,
});

export const fetchExchangeRate = (value) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    value.exchangeRates = data;
    dispatch(expenseArray(value));
  } catch (error) {
    console.error('Um erro aconteceu na requisicão', error);
  }
};
