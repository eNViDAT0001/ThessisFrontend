import { useDispatch } from "react-redux";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { IconButton, Paper, TableHead } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { addSuffixToPrice, currencyFormat } from "../../app/hook/CommonHook";
import { changeListCartFromCheck, decreaseQuantity, deleteCartShopping, increaseQuantity, useListCart } from "../../app/hook/CartHook";
import { setListCart } from "../../app/slices/CartSlice";

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
  const listCart = useListCart();


  const handleDeleteButton = (e) => {
    const cartID = e.currentTarget.getAttribute("cartID");
    const itemID = e.currentTarget.id;
    deleteCartShopping(cartID, itemID);
  };

  const handleCheckProduct = (e) => {
    const id =  e.target.getAttribute("id");
    const result = changeListCartFromCheck(listCart, id);
    dispatch(setListCart(result));
  };

  const handleAddQuantity = (e) =>{
    const id = e.currentTarget.id
    const newListCart = increaseQuantity(listCart,id)
    dispatch(setListCart(newListCart));
  }

  const handleRemoveQuantity = (e) =>{
    const id = e.currentTarget.id
    const newListCart = decreaseQuantity(listCart ,id)
    dispatch(setListCart(newListCart));
  }

  return (
    <div>
      <div className=" w-full ">
        <h1 className="font-bold text-xl my-4">Your select:</h1>
        {listCart.map((data) => (
          <div key={data.id}>
            <div className="border mb-10 ">
              <div className="flex flex-row space-x-5 mx-4">
                <h1 className="font-bold text-xl my-3">{data.name}</h1>
              </div>
              <div>
                <TableContainer component={Paper}>
                  <ToastContainer position="top-right" newestOnTop />
                  <Table sx={{ minWidth: 400 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Select</StyledTableCell>
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell align="center">Name </StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        <StyledTableCell align="center">
                          Quantity
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Discount
                        </StyledTableCell>
                        <StyledTableCell align="center">Option</StyledTableCell>
                        <StyledTableCell align="center">Total</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.items.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell id={row.id} align="center">
                            <Checkbox
                              id={row.id}
                              checked={row.isSelected}
                              onClick={handleCheckProduct}
                              defaultChecked
                            />
                          </StyledTableCell>
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
                          <StyledTableCell
                            align="center"
                            sx={{ width: 100, padding: 1 }}
                          >
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {addSuffixToPrice(row.price)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                            id={row.id}
                              color="primary"
                              aria-label="upload picture"
                              component="label"
                              onClick={handleRemoveQuantity}

                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            {row.quantity}
                            <IconButton
                              id={row.id}
                              color="primary"
                              aria-label="upload picture"
                              component="label"
                              onClick={handleAddQuantity}

                            >
                              <AddIcon fontSize="small" 
                              />
                            </IconButton>
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
                              cartID={data.id}
                              color="primary"
                              aria-label="upload picture"
                              component="label"
                              onClick={handleDeleteButton}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default ListCart;
