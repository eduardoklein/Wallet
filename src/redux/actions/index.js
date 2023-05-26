import {
  ADD_EMAIL,
  STORE_FETCHED_CURRENCIES,
  EXPENSE_ARRAY,
  ATT_TOTAL } from './actionTypes';

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

export const attTotal = (value) => ({
  type: ATT_TOTAL,
  value,
});

export const fetchExchangeRate = (value) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    value.exchangeRates = data;
    const ask = data[value.currency];
    const convertion = (Number(value.value).toFixed(2)) * ask.ask;
    dispatch(attTotal(convertion));
    dispatch(expenseArray(value));
  } catch (error) {
    console.error('Um erro aconteceu na requisicão', error);
  }
};
