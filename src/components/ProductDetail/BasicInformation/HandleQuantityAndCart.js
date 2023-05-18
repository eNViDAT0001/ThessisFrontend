import * as React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import "react-toastify/ReactToastify.min.css";
import "react-toastify/ReactToastify.min.css";
import {
  useOptionHandle,
  useProductDetail,
} from "../../../app/hook/ProductHook";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { ToastContainer } from "react-toastify";
import { addToCart } from "../../../app/hook/CartHook";
import { useUserID } from "../../../app/hook/UserHook";

const AddToCartButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#D0011B"),
  backgroundColor: "#D0011B",
  "&:hover": {
    backgroundColor: "#D0011B",
  },
}));
export const HandleQuantityAndCart = (props) => {
  const productID = props.id;
  const userID = useUserID();
  const [quantity, setQuantity] = React.useState(1);

  const productDetail = useProductDetail();
  const optionHandle = useOptionHandle();

  const handleAddToCart = (e) => {
    const body = {
      product_option_id: optionHandle.id,
      quantity: quantity,
    };
    addToCart(productID, productDetail.provider_id, userID, body, optionHandle,0);
  };

  const handleBuyNow = (e) => {
    const body = {
      product_option_id: optionHandle.id,
      quantity: quantity,
    };
    addToCart(productID, productDetail.provider_id, userID, body, 1);
  };

  return (
    <div>
      <div className="flex flex-col space-y-6 ">
        <ToastContainer position="top-right" newestOnTop />

        <div className="flex flex-row ">
          <div className="flex flex-row items-center">
            <h1 className="text-[#929292] text-lg mr-6">Quantity :</h1>
            <button
              className="px-2 border"
              onClick={(e) => {
                setQuantity(Math.max(quantity - 1, 1));
              }}
            >
              -
            </button>
            <Paper variant="outlined" sx={{ width: 40, textAlign: "center" }}>
              {quantity}
            </Paper>
            <button
              className="border px-2"
              onClick={(e) => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-[40%] ">
            <AddToCartButton
              variant="outlined"
              startIcon={<ShoppingBasketIcon />}
              onClick={handleAddToCart}
            >
              Add to cart
            </AddToCartButton>
          </div>
          <div className="w-[40%] ">
            <AddToCartButton
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
              onClick={handleBuyNow}
            >
              Buy now
            </AddToCartButton>
          </div>
        </div>
      </div>
    </div>
  );
};
