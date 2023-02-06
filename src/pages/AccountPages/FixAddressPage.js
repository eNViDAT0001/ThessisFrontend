import React from 'react'
import { useParams } from 'react-router-dom'
import { FixAddressForm } from '../../components/Account/AddressDetail/FixAddressForm'
import ChangeBarInformation from '../../components/Account/GeneralLayout/ChangeBarInformation'
import HeaderBar from '../../components/StoreOtherComponent/HeaderBar'
export const FixAddressPage = () => {
    const userID = localStorage.getItem("UserID")
    const idAddress = useParams()
   return (
    <div>
        <HeaderBar name1="Home . Account . Address" name2=" . Detail"/>
            <div className="flex justify-center">
                <div className="w-[85%] h-full flex flex-row ">
                    <ChangeBarInformation id={localStorage.getItem("UserID")} />
                    <FixAddressForm userID={userID} addressID={idAddress} />
                </div>
            </div>
    </div>
  )
}
