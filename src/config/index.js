const PORT = 8082;
const state = process.env.REACT_APP_STATE;

export const API_BASE_URL_DEV = `http://localhost:${PORT}/api/v1`;
export const API_BASE_URL_SUT = `http://server:${PORT}/api/v1`;
export const API_BASE_URL_PRO = `http://ecommerce-service:${PORT}/api/v1`;

export const API_BASE_URL_WEBSOCKET = "ws://localhost:8082/api/v1/";

const baseURL = host => `http://${host}:${PORT}/api/v1`
const baseWebsocket = host => `ws://${host}:${PORT}/api/v1`
export const domain = () => {
  console.log("state:", state)
  console.log("env:", process.env)
  switch (state) {
    case "DEV":
      return baseURL("localhost");
    case "SUT":
      return baseURL("server");
    case "PRO":
      return baseURL("ecommerce");
    default:
      return baseURL("localhost");
  }
};
export const webSocket = () => {
  console.log("env:", process.env)
  switch (state) {
    case "DEV":
      return baseWebsocket("localhost");
    case "SUT":
      return baseWebsocket("server");
    case "PRO":
      return baseWebsocket("ecommerce");
    default:
      return baseWebsocket("localhost");
  }
};