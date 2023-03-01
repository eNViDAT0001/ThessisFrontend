import { CartShoppingApi } from "../../api/CartShopping";
import { toast } from "react-toastify";

export const addToCart = async(productID,providerID,userID,body) =>{
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