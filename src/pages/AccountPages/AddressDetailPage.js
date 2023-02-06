import { useParams } from "react-router-dom";
import AddressDetail from "../../components/Account/AddressDetail";

const AddressDetailPage = () => {
    const {id} = useParams()
    return(
        <AddressDetail id={id}/>
    )
}

export default AddressDetailPage