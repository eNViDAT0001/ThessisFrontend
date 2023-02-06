import React from 'react'
import HeaderBarBig from '../../components/StoreOtherComponent/HeaderBarBig';
import { VectorForOrderCompleted } from '../../components/StoreOtherComponent/OrderCompleted/VectorForOrderCompleted'
import Book from '../../components/StoreOtherComponent/OrderCompleted/asset/book.svg'
import Clock from '../../components/StoreOtherComponent/OrderCompleted/asset/clock.svg'
import listLogo from '../../components/StoreOtherComponent/OrderCompleted/asset/listLogo.png'


const OrderCompletedPage = () => {
  return (
    <div className="font-['Josefin_Sans']">
        <HeaderBarBig nameTitle="Order Completed" name1= "Home . Pages" name2= " . OrderCompleted"/>
        <div className='flex justify-center'>
            <div className='w-[85%] flex items-center flex-col mt-24'>
                <div className='flex flex-row'>
                  <img src={Clock} alt="anh dong ho" className="w-[20%] h-[20%] mr-20"></img>
                  <VectorForOrderCompleted />
                  <img src={Book} alt="image book" className='w-[20%] h-[20%] flex self-end ml-20'></img>
                </div>
                <button className="w-[15%] h-[50px] bg-[#FF1788] text-white  mt-20 mb-20"> Continue Shopping </button>     
                <img className='w-[85%] h-[121px]' src={listLogo} alt= "anh logo"></img>
            </div>
            
        </div>
        
    </div>
  )
}

export default OrderCompletedPage

