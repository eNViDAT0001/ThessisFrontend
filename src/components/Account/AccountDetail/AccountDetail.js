import React from 'react'

import CustomerInformation from './CustomerInformation'
import PhoneAndEmail from './PhoneAndEmail'
const AccountDetail = (props) => {
  
  return (
    <div className="mt-[5%] w-full">
        <h1 className="text-xl text-[#1D1378]">Customer's Information</h1>
        <div className="bg-[#F8F8FD] mt-1 p-2 border-r flex flex-row justify-between mb-28">
            <CustomerInformation id={props.id}/>
            <PhoneAndEmail id={props.id} />
        </div>
    </div>
  )
}

export default AccountDetail
