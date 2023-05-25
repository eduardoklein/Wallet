import { ADD_EMAIL, STORE_FETCHED_CURRENCIES } from './actionTypes';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const fetchCurrencies = (currenciesData) => ({
  type: STORE_FETCHED_CURRENCIES,
  currenciesData,
});
