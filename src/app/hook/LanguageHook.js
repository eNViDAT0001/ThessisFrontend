import { useDispatch, useSelector } from "react-redux";


export const useLanguage = () =>
  useSelector((state) => state.webSocket.language);
