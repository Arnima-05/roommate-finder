// src/utils.js
export const hasSubmittedForm = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user !== null;
};
