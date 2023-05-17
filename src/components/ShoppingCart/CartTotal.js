import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useEffect, useState } from "react";
import {
  addCartToOrder,
  getCostFromListCart,
  useListCart,
} from "../../app/hook/CartHook";
import { currencyFormat } from "../../app/hook/CommonHook";
import { useUserID } from "../../app/hook/UserHook";

const CartTotal = () => {
  const userID = useUserID();
  const listCart = useListCart();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const sum = getCostFromListCart(listCart);
    setTotalPrice(sum);
  }, [listCart]);

  const handleClickButtonProcessToCheckout = (e) => {
    if (totalPrice == 0) {
      toast("You don't select any item", {
        type: "warning",
        autoClose: 2000,
      });
    } else addCartToOrder(listCart, totalPrice, userID);
  };
  return (
    <div className="w-[30%] border flex flex-col px-[40px] pt-[30px] pb-[40px]">
      <h1 className=" text-xl font-extrabold">CART TOTALS</h1>
      <ToastContainer position="top-right" newestOnTop />
      <div className="border-t-2 border-b-2 border-dashed mt-6">
        <div className="flex flex-row mt-6 mb-6">
          <h1 className="text-sm "> Shipping: </h1>
          <div className="flex flex-col ml-8 space-y-5">
            <h1 className="text-[#333] font-thin text-sm">
              There are no shipping methods available. Please double check your
              address, or contact us if you need any help.
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-row">
        <h1>Total</h1>
        <h1 className="ml-8">{currencyFormat(totalPrice)}đ</h1>
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
