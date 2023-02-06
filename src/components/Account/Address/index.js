import ChangeBarInformation from "../GeneralLayout/ChangeBarInformation";
import HeaderBar from "../../StoreOtherComponent/HeaderBar";
const Address = (props) =>{
    return (
        <div>
            <HeaderBar name1="Home .Account" name2=" . Address"/>
            <div className="flex justify-center">
                <div className=" w-1200px h-full flex flex-row ">
                    <ChangeBarInformation id={props.id}/>
                </div>
            </div>
        </div>
    )
    
};

export default Address;