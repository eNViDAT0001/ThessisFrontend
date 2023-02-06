import HeaderBar from "../../StoreOtherComponent/HeaderBar";
import ChangeBarInformation from "../GeneralLayout/ChangeBarInformation";
import { AddressList } from "./AddressList";
const AddressDetail = (props) =>{
    return (
        <div>
            <HeaderBar name1="Home . Account . Address" name2=" . Detail"/>
            <div className="flex justify-center">
                <div className="w-[85%] h-full flex flex-row ">
                    <ChangeBarInformation id={props.id}/>
                    <AddressList id={props.id}/>
                </div>
            </div>
        </div>
    )
    
};

export default AddressDetail;