const ADD_EMAIL = 'ADD_EMAIL';

export const addEmail = (email) => {
  console.log(email);
  return {
    type: ADD_EMAIL,
    email,
  };
};
