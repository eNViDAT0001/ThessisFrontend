
import ChangeBarInformation from "../../components/Account/GeneralLayout/ChangeBarInformation";
import AccountDetail from "../../components/Account/AccountDetail/AccountDetail";
import HeaderBar from "../../components/StoreOtherComponent/HeaderBar";
import { useParams } from "react-router-dom";
const AccountDetailPage = () =>{
    const {id} = useParams()
        return (
            <div className="font-['Josefin_Sans']">
                <div className="flex flex-col w-full">
                    <HeaderBar name1="Home .Account" name2=" . Detail"/>
                    <div className="flex justify-center">
                        <div className=" w-[85%] h-full flex flex-row ">
                            <ChangeBarInformation id={id}/>
                            <AccountDetail id={id} />
                        </div>
                    </div>
                </div>
            </div>
        )  
};

export default AccountDetailPage;