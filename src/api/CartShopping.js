import axiosClient from "./Client";
export const CartShoppingApi = {
  AddNewCartShopping: (productID,providerID,userID,body) => {
    const url = `carts/product/${productID}/provider/${providerID}/user/${userID}`;
    return axiosClient.post(url,body);
  },
  GetCartFromUser: (userID) => {
    const url = `carts/user/${userID}`;
    return axiosClient.get(url);
  },
  DeleteItemInCart:(cartID,cartItemID)=>{
    const url=`carts/${cartID}/items/${cartItemID}`
    return axiosClient.delete(url)
  },
  UpdateCartQuantity:(cartID,cartItemID,body)=>{
    const url = `carts/${cartID}/items/${cartItemID}`
    return axiosClient.patch(url,body)
  }

};
