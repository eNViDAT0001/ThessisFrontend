import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

import {
  useListItemsInOrder,
  useOrderHandleDetail,
} from "../../../app/hook/OrderHook";
import { Button } from "@mui/material";
import { currencyFormat } from "../../../app/hook/CommonHook";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export const OrderItems = (props) => {
  const type = props.type;
  const listItems = useListItemsInOrder() || [];
  const orderHandleDetail = useOrderHandleDetail() || {};

  const handleButtonDetail = (e) => {
    window.location.replace(`/product/${e.currentTarget.id}`);
  };

  const handleButtonAddComment = (e) => {
    window.location.replace(`/comment/${e.currentTarget.id}`);
  };
  return (
    <div>
      <ToastContainer position="top-right" newestOnTop />
      {listItems.length == 0 ? (
        <div>YOU DON'T HAVE ITEMS</div>
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Image</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="left">Option</StyledTableCell>
                  <StyledTableCell align="left">Quantity</StyledTableCell>
                  <StyledTableCell align="left">Discount</StyledTableCell>
                  {!(
                    type !== "user" || orderHandleDetail.status !== "DELIVERED"
                  ) && <StyledTableCell align="left">Comment</StyledTableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {listItems &&
                  listItems.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        <img
                          id={row.product_id}
                          onClick={handleButtonDetail}
                          src={row.image}
                          alt="item"
                          className="w-[55px] h-[55px] cursor-pointer"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div
                          id={row.product_id}
                          onClick={handleButtonDetail}
                          className=" hover:text-pink-500 hover:underline"
                        >
                          {row.name}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {currencyFormat(row.price)}đ
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.option}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.discount}%
                      </StyledTableCell>
                      {!(
                        type !== "user" ||
                        orderHandleDetail.status !== "DELIVERED"
                      ) && (
                        <StyledTableCell align="left">
                          <Button
                            id={row.product_id}
                            variant="contained"
                            onClick={handleButtonAddComment}
                          >
                            + Add Your Comment
                          </Button>
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};
