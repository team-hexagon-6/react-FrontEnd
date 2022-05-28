const setAccessToken = (value) => {
  localStorage.setItem("AccessToken", value);
};

const getAccessToken = () => {
  return localStorage.getItem("AccessToken");
};

const removeAccessToken = () => {
  localStorage.removeItem("AccessToken");
}

export default {
  setAccessToken,
  getAccessToken,
  removeAccessToken
};
