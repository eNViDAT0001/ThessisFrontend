const PORT = 8082;
const state = () => process.env.NODE_ENV;

export const API_BASE_URL_WEBSOCKET = "ws://localhost:8082/api/v1/";

const baseURL = host => `http://${host}:${PORT}/api/v1`
const baseWebsocket = host => `ws://${host}:${PORT}/api/v1`
export const domain = () => {
  console.log("now", "REACT_APP_STATE")
  console.log("state:", state())
  console.log("env:", process.env)

  const now = state();
  switch (now) {
    case "dev":
      return baseURL("localhost");
    case "test":
      return baseURL("server");
    case "production":
      return "http://thesis.info/api/v1";
    default:
      return baseURL("localhost");
  }
};

export const webSocket = () => {
  const now = state();
  switch (now) {
    case "dev":
      return baseWebsocket("localhost");
    case "test":
      return baseWebsocket("server");
    case "production":
      return "http://thesis.info/api/v1";
    default:
      return baseWebsocket("localhost");
  }
};