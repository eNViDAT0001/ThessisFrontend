import React from "react";
import { useListItemInCartSelected } from "../../../app/hook/CartHook";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import {  Paper, TableHead } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export const ItemTab = () => {
  const listItem = useListItemInCartSelected();
  console.log(listItem);
  return (
    <div className="w-full">
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
            </TableRow>
          </TableHead>
          <TableBody>
            {listItem.map((row) => (
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
                <StyledTableCell align="center" sx={{ width: 100, padding: 1 }}>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {currencyFormat(row.price)}
                </StyledTableCell>
                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
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
                    (row.quantity * row.price * (100 - row.discount)) / 100
                  )}{" "}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
