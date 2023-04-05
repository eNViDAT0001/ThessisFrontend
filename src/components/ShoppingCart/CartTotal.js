
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useEffect, useState } from "react";
import { addCartToOrder, getCostFromListCart, useListCart } from "../../app/hook/CartHook";
import { currencyFormat } from "../../app/hook/CommonHook";
import { useUserID } from "../../app/hook/UserHook";

const CartTotal = () => {
  const userID = useUserID()
  const listCart = useListCart()

  const [totalPrice,setTotalPrice] = useState(0)

  useEffect(()=>{
    const sum = getCostFromListCart(listCart)
    setTotalPrice(sum)
  },[listCart])

  const handleClickButtonProcessToCheckout = (e) =>{
    if(totalPrice==0){
      toast("You don't select any item", {
        type: "warning",
        autoClose: 2000,
      });
    }
    else addCartToOrder(listCart,userID)
  }
  return (
    <div className="w-[30%] border flex flex-col px-[40px] pt-[30px] pb-[40px]">
      <h1 className=" text-xl font-extrabold">CART TOTALS</h1>
      <ToastContainer position="top-right" newestOnTop />

      <div className="flex flex-row mt-8 ">
        <h1 className="text-sm">Subtotal: </h1>
        <h1 className=" text-lg ml-8 mt-[-4px]"> 0đ</h1>
      </div>
      <div className="border-t-2 border-b-2 border-dashed mt-6">
        <div className="flex flex-row mt-6 mb-6">
          <h1 className="text-sm "> Shipping: </h1>
          <div className="flex flex-col ml-8 space-y-5">
            <h1 className="text-[#333] font-thin text-sm">
              There are no shipping methods available. Please double check your
              address, or contact us if you need any help.
            </h1>
            <h1 className="mt-2 text-sm">CALCULATE SHIPPING</h1>

            <select className=" w-[90%] h-7 border text-center text-xs text-gray-text-in-select">
              <option value="0">USA</option>
              <option value="1">UK</option>
            </select>
            <input
              type="text"
              className="text-center w-[90%] h-25px border "
              placeholder="State/country"
            ></input>
            <input
              type="text"
              className="text-center w-[90%] h-25px border "
              placeholder="Postcode/Zip"
            ></input>

            <button className="w-[95%] border h-[45px] rounded-3xl bg-[#e6e6e6] hover:bg-[#717fe0] hover:text-white">
              UPDATE TOTALS
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-row">
        <h1>Total</h1>
        <h1 className="ml-8">
          {currencyFormat(totalPrice)}đ
        </h1>
      </div>
      <button
        onClick={handleClickButtonProcessToCheckout}
        className="mt-8 w-[100%] h-[45px] bg-[#212529] text-white rounded-3xl"
      >
        PROCESS TO CHECKOUT
      </button>
    </div>
  );
};

export default CartTotal;
