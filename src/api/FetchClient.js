const baseURL = "http://localhost:8082/api/v1";

const fetchClient = (url, options = {}) => {
  const token = localStorage.getItem("AccessToken");
  const expireAccessToken = parseInt(localStorage.getItem("AccessTokenExpiry"));
  const expireRefreshToken = parseInt(localStorage.getItem("RefreshTokenExpiry"));
  const now = Date.now() / 1000;

  if (now > expireRefreshToken) {
    console.log("Da het han refresh token");
    localStorage.clear();
    window.location.replace("/login");
    return Promise.reject("Token expired");
  } else if (now > expireAccessToken) {
    console.log("Da het han AccessToken");
    return fetch(`${baseURL}/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        refresh_token: localStorage.getItem("RefreshToken"),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          localStorage.clear();
          window.location.replace("/login");
          return Promise.reject("Token expired");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.removeItem("AccessToken");
        localStorage.setItem("AccessToken", data.data.access_token);
        localStorage.removeItem("AccessTokenExpiry");
        localStorage.setItem("AccessTokenExpiry", data.data.access_token_expiry);
        localStorage.removeItem("RefreshToken");
        localStorage.setItem("RefreshToken", data.data.refresh_token);
        localStorage.removeItem("RefreshTokenExpiry");
        localStorage.setItem("RefreshTokenExpiry", data.data.refresh_token_expiry);

        const headers = {
          Authorization: `Bearer ${data.data.access_token}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        };
        return fetch(`${baseURL}${url}`, { ...options, headers });
      });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "*/*",
  };
  return fetch(`${baseURL}${url}`, { ...options, headers });
};

export default fetchClient;