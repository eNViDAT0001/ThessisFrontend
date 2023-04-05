import React from 'react'
import { ToastContainer } from "react-toastify";
import { Button } from "@mui/material";
import "react-toastify/ReactToastify.min.css";
import { currencyFormat } from '../../../app/hook/CommonHook';
import { useTotalPrice } from '../../../app/hook/CartHook';
export const Bill = () => {
  const totalPrice = useTotalPrice()
  const handleButtonPayment = (e) =>{

  }
  return (
    <div className=" bg-[#F4F4FC] p-6 space-y-10">
      <ToastContainer position="top-right" newestOnTop />
      <div className=" border-b-2 border-[#E8E6F1] flex justify-between">
        <h1 className=" text-[#1D3178] text-lg">Subtotal :</h1>
        <h1 className=" text-[#1D3178] text-lg">0đ</h1>
      </div>
      <div className=" border-b-2 border-[#E8E6F1] flex justify-between">
        <h1 className=" text-[#1D3178] text-lg">Total :</h1>
        <h1 className=" text-[#1D3178] text-lg">
          {currencyFormat(parseInt(totalPrice))}đ
        </h1>
      </div>
      <Button
        onClick={handleButtonPayment}
        variant="contained"
        color="success"
        className="w-full"
      >
        Process To Checkout
      </Button>
    </div>
  )
}
