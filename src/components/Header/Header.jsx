import { HeaderMain } from "./HeaderMain";
import { HeaderUser } from "./HeaderUser";
const Header = (props) => {
  return (
    <div>
      <HeaderMain />
      {localStorage.getItem("Role") === "ADMIN" ? <div></div> : <HeaderUser />}
    </div>
  );
};

export default Header;
