const PORT = 8082;

export const API_BASE_URL_DEV = `http://localhost:${PORT}/api/v1`;
export const API_BASE_URL_SUT = `http://server:${PORT}/api/v1`;
export const API_BASE_URL_PRO = `http://ecommerce-service:${PORT}/api/v1`;

export const API_BASE_URL_WEBSOCKET = "ws://localhost:8082/api/v1/";

export const domain = () => {
  const state = process.env.STATE || "DEV";

  switch (state) {
    case "DEV":
      return API_BASE_URL_DEV;
    case "SUT":
      return API_BASE_URL_SUT;
    case "PRO":
      return API_BASE_URL_PRO;
    default:
      return API_BASE_URL_DEV;
  }
};
