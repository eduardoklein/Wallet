import { ADD_EMAIL } from './actionTypes';

export const addEmail = (email) => {
  console.log(email);
  return {
    type: ADD_EMAIL,
    email,
  };
};
