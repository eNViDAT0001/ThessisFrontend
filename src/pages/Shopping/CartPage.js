import React from "react";
import { useParams } from "react-router-dom";
import ListCart from "../../components/ShoppingCart/ListCart";
import CartTotal from "../../components/ShoppingCart/CartTotal";
import { useFetchListCart } from "../../app/hook/CartHook";
import HeaderBar from "../../components/Common/HeaderBar";
export const CartPage = () => {
  const { id } = useParams();
  useFetchListCart(id);
  return (
    <div>
      <HeaderBar name1="Home" name2=" . Cart" />
      <div className="mb-20">
        <div className="flex justify-center mt-10 font-['Josefin_Sans']">
          <div className="w-[80%] flex justify-start flex-col">
            <div className="flex flex-row justify-between mt-14">
              <ListCart />
              <CartTotal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
