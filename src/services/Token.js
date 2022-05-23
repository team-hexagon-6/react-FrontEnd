const setAccessToken = (value) => {
  localStorage.setItem("AccessToken", value);
};

const getAccessToken = () => {
  return localStorage.getItem("AccessToken");
};

export default {
  setAccessToken,
  getAccessToken,
};
