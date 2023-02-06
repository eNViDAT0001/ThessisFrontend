import React from 'react'
import { useParams } from 'react-router-dom'
import { OrderDetailGeneral } from '../../components/Order/OrderDetail/OrderDetailGeneral'
export const OrderDetailPages = () => {
    const {id} = useParams()

  return (
    <div className=" w-screen bg-gradient-to-r from-[#29323c] to-[#485563] p-10 ">
      <div className="flex flex-col space-y-9">
            <OrderDetailGeneral id={id}/>
        </div>
    </div>
  )
}
