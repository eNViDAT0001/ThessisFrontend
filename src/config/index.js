const PORT = 8082;
const state = () => process.env.REACT_APP_STATE;
const proHost = () => "thesis.id.vn";

export const API_BASE_URL_WEBSOCKET = "ws://localhost:8082/api/v1/";

const baseURL = host => `http://${host}:${PORT}/api/v1`
const baseWebsocket = host => `ws://${host}:${PORT}/api/v1`

export const domain = () => `http://thesis.id.vn/api/v1`;

export const webSocket = () => `ws://thesis.id.vn/api/v1`;