const PORT = 8082;
const state = () => process.env.REACT_APP_STATE;
const proHost = () => process.env.REACT_APP_PRO_HOST;

export const API_BASE_URL_WEBSOCKET = "ws://localhost:8082/api/v1/";

const baseURL = host => `http://${host}:${PORT}/api/v1`
const baseWebsocket = host => `ws://${host}:${PORT}/api/v1`

export const domain = () => {
  console.log("now", process.env)
  console.log("state:", state())
  console.log("proHost:", proHost())

  const now = state();
  switch (now) {
    case "dev":
      return baseURL("localhost");
    case "test":
      return baseWebsocket("localhost");
    case "production":
      return `http://${proHost()}/api/v1`;
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
      return baseWebsocket("localhost");
    case "production":
      return `ws://${proHost()}/api/v1`;
    default:
      return baseWebsocket("localhost");
  }
};