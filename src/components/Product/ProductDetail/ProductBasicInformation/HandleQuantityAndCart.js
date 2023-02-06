import * as React from "react";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity } from "../../../../store/slices/ProductSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { CartShoppingApi } from "../../../../api/CartShopping";
const AddToCartButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#D0011B"),
  backgroundColor: "#D0011B",
  "&:hover": {
    backgroundColor: "#D0011B",
  },
}));
/*
toast("Bạn đánh giá thành công", {
  type: "success",
  autoClose: 1000,
  onClose: setTimeout(() => {
    window.location.reload();
  }, 1000),
});*/

const HandleQuantityAndCart = (props) => {
  const dispatch = useDispatch()

  const quantity = useSelector(state=>state.product.Quantity)
  const idOptionSelected = useSelector(state=>state.product.OptionIdSelected)
  const product = useSelector(state=>state.product.ProductDetail)

  console.log(product)



  const AddToCart = async(productID,providerID,userID,body) =>{
    await CartShoppingApi.AddNewCartShopping(productID,providerID,userID,body)
    .then(res=>{
      toast("Add to Cart Success", {
        type: "success",
        autoClose: 2000,
        onClose: setTimeout(() => {
          window.location.reload();
        }, 2000)
      })
    })
  }
  const handleAddToCart = (e) =>{
    if(idOptionSelected==-1){
      toast("You have not selected the option", {
        type: "warning",
        autoClose: 1000,
      })
    }else{
      const productID = props.id 
      const providerID = product.data.data.ProviderID
      const userID = localStorage.getItem("UserID")

      const body={
        "product_option_id": idOptionSelected,
        "quantity" : quantity
      }
      AddToCart(productID,providerID,userID,body)
    }
  }
  return (
    <div>
      <div className="flex flex-col space-y-6 mt-10">
        <div className="flex flex-row ">
          <div className="flex flex-row items-center">
            <h1 className="text-[#929292] text-lg mr-6">Quantity :</h1>
            <button
              className="px-2 border"
              onClick={() => {
                dispatch(setQuantity(Math.max(quantity - 1, 1)));
              }}
            >
              -
            </button>
            <Paper variant="outlined" sx={{ width: 40, textAlign: "center" }}>
              {quantity}
            </Paper>

            <button
              className="border px-2"
              onClick={() => {
                dispatch(setQuantity(quantity + 1));
              }}
            >
              +
            </button>
          </div>

          <div className="w-[40%] ml-6">
            <AddToCartButton
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
            >
              Add to cart
            </AddToCartButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HandleQuantityAndCart;
