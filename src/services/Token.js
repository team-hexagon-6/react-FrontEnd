const setAccessToken = (value) => {
  localStorage.setItem("AccessToken", value);
};

const getAccessToken = () => {
  localStorage.getItem("AccessToken");
};

export default {
  setAccessToken,
  getAccessToken,
};
