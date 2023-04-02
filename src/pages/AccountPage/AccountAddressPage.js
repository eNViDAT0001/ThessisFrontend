import { useParams } from "react-router-dom";
import { AddressList } from "../../components/Account/Address/AddressList";
import { useFetchListAddress } from "../../app/hook/AddressHook";
import ChangeBarInformation from "../../components/Account/ChangeBarInformation";
import HeaderBar from "../../components/Common/HeaderBar";

export const AccountAddressPage = () =>{
    const {id} = useParams()
    useFetchListAddress(id) 
    return (
        <div>
            <HeaderBar name1="Home . Account . Address" name2=" . Detail"/>
            <div className="flex justify-center">
                <div className="w-[85%] h-full flex flex-row ">
                    <ChangeBarInformation id={id}/>
                    <AddressList id={id}/>
                </div>
            </div>
        </div>
    )
    
};

