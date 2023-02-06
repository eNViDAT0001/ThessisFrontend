import { useParams } from "react-router-dom";
import AccountOrder from "../../components/Account/AccountOrder";
const AccountOrderPage = () => {
    const {id} = useParams()
    return(
            <AccountOrder id={id} />
    )
}

export default AccountOrderPage