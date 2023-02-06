import { useParams } from "react-router-dom"
import Address from "../../components/Account/Address"
const AddressPage = () =>{
    const {id} = useParams()
    return(
        <Address id={id}/>
    )
}

export default AddressPage