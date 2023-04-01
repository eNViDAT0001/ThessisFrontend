import { useSelector } from "react-redux";

export const useUserInformation = () => useSelector((state) => state.user.userInformation);
