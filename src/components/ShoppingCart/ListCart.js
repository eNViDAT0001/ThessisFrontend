import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  checkObjectEmpty,
  currencyFormat,
} from "../../stogare_function/listActions";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllCartShopping,
  setCart,
  setSelectedCart,
} from "../../store/slices/CartSlice";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Button, IconButton, Paper, TableHead } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartShoppingApi } from "../../api/CartShopping";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ListCart = () => {
  const dispatch = useDispatch();
  const listCart = useSelector((state) => state.cart.listCart);
  const selectedCart = useSelector((state) => state.cart.selectedCart);

  const [optionListCart, setOptionListCart] = useState([]);
  const [isFirstRender, setIsFirseRender] = useState(true);

  const loadCart = useCallback(async () => {
    await dispatch(FetchAllCartShopping(localStorage.getItem("UserID")));
  });
  useLayoutEffect(() => {
    if (listCart.status != 200 && listCart.status != 204) {
      loadCart();
    }
    if (listCart.status == 200) {
      if (isFirstRender) {
        setIsFirseRender(false);
        const result = listCart.data.data.map(({ Name: label, ...rest }) => ({
          label,
          ...rest,
        }));
        setOptionListCart(result);
      }
    }
  }, [loadCart, listCart, isFirstRender, setOptionListCart]);

  const handleChangeComboBox = (e, value) => {
    dispatch(setSelectedCart(value));
  };

  const DeleteCartShopping = async (idCart, idItemCart) => {
    await CartShoppingApi.DeleteItemInCart(idCart, idItemCart).then((res) => {
      if (res.status == 200) {
        toast("Delete Item success", {
          type: "success",
          autoClose: 1000,
          onClose: setTimeout(() => {
            window.location.reload();
          }, 1500),
        });
      }
    });
  };

  const handleDeleteButton = (e) => {
    DeleteCartShopping(selectedCart.ID, e.currentTarget.id);
  };


  const UpdateCartQuantity = async(idCart,idItemCart,body)=>{
    console.log(body)
    await CartShoppingApi.UpdateCartQuantity(idCart,idItemCart,body)
    .then((res)=>{
    })
  }
  
  const handleDescreaseQuantity = (e) =>{
    const idHandle = parseInt(e.currentTarget.id)
    const arrayItemsHandle = [...selectedCart.Items]
    const indexCartItemFilter =  arrayItemsHandle.findIndex(object=>object.id==idHandle)
    const cartItemFilter=arrayItemsHandle[indexCartItemFilter]

    const cartID = selectedCart.ID
    const cartItemID = cartItemFilter.id
    
    const quantityDesrease = Math.max(1,cartItemFilter.quantity-1)

    const body={
      "quantity ": quantityDesrease

    }

     UpdateCartQuantity(cartID,cartItemID,body)
  }

  const handleIncreaseQuantity = (e) =>{
    const idHandle = parseInt(e.currentTarget.id)
    const arrayItemsHandle = [...selectedCart.Items]
    const indexCartItemFilter =  arrayItemsHandle.findIndex(object=>object.id==idHandle)
    const cartItemFilter=arrayItemsHandle[indexCartItemFilter]

    const cartID = selectedCart.ID
    const cartItemID = cartItemFilter.id


    const quantityIncrease = cartItemFilter.quantity+1

    const body={
      "quantity ": quantityIncrease
    }
     UpdateCartQuantity(cartID,cartItemID,body)
  }
  return (
    <div>
      <div className=" w-[65%]">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={optionListCart}
          onChange={handleChangeComboBox}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select your Provider" />
          )}
        />
      </div>
      <div>
        {!checkObjectEmpty(selectedCart) ? (
          <div className="space-y-3">
            <h1 className="font-bold text-xl my-4">Your select:</h1>
            <div>
              {/* 
              <div className="h-[100px] border flex justify-between items-center px-[10%] shadow-xl ">
                <input
                  type="text"
                  className="w-[25%] h-[45px] min-w-[50px] border rounded-3xl text-center"
                  placeholder="Coupon code"
                ></input>
                <button className="w-[25%] min-w-[50px] border h-[45px] rounded-2xl bg-[#e6e6e6] hover:bg-[#717fe0] hover:text-white">
                  APPLY COUPON
                </button>
              </div>
              */}

              <TableContainer component={Paper}>
                <ToastContainer position="top-right" newestOnTop />

                <Table sx={{ minWidth: 400 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Image</StyledTableCell>
                      <StyledTableCell align="center">Name </StyledTableCell>
                      <StyledTableCell align="center">Price</StyledTableCell>
                      <StyledTableCell align="center">Quantity</StyledTableCell>
                      <StyledTableCell align="center">Discount</StyledTableCell>
                      <StyledTableCell align="center">Option</StyledTableCell>
                      <StyledTableCell align="center">Total</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedCart.Items.length === 0 ? (
                      <div></div>
                    ) : (
                      selectedCart.Items.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            sx={{ width: 100, padding: 1 }}
                          >
                            <img
                              src={row.media_path}
                              alt="Anh san pham"
                              className="w-[100px] h-[100px]"
                            ></img>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {currencyFormat(row.price)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {/*<div className="flex flex-row">
                              <div 
                              id={row.id}
                              className="px-2 border hover:cursor-pointer"
                              onClick={handleDescreaseQuantity}
                              >-</div>
                              <div className="px-3 border">{row.quantity}</div>
                              <div
                              id={row.id}
                              className="px-2 border hover:cursor-pointer"
                              onClick={handleIncreaseQuantity}
                              >+</div>
                      </div>*/}
                                                        {row.quantity}

                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <div className="px-3 py-1 border border-[#D80001] text-[#D80001]">
                              {row.discount}%
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.option_name}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {currencyFormat(
                              (row.quantity *
                                row.price *
                                (100 - row.discount)) /
                                100
                            )}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              id={row.id}
                              color="primary"
                              aria-label="upload picture"
                              component="label"
                              onClick={handleDeleteButton}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ListCart;
