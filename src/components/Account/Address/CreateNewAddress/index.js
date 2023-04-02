import React from 'react'
import { CreateAddressForm } from '../../components/Account/AddressDetail/CreateAddressForm'
import HeaderBar from '../../../Common/HeaderBar'
import ChangeBarInformation from '../../ChangeBarInformation'

const CreateAddressPage = () => {
  return (
    <div>
        <HeaderBar name1="Home . Account . Address" name2=" . Detail"/>
            <div className="flex justify-center">
                <div className="w-[85%] h-full flex flex-row ">
                    <ChangeBarInformation id={localStorage.getItem("UserID")} />
                    <CreateAddressForm />
                </div>
            </div>
    </div>
  )
}

export default CreateAddressPage