import React from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import { Paper, TableHead } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { convertDate } from "../../app/hook/CommonHook";
import {
  useFetchProductInAdmin,
  useListProductInAdmin,
} from "../../app/hook/ProductHook";

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
  "&$hover:hover": {
    backgroundColor: "#F1F5F8",
  },
}));

export const ProductTab = () => {
  useFetchProductInAdmin();

  const listProducts = useListProductInAdmin() || [];
    console.log(listProducts)
  return (
    <div className="p-6 space-y-5">
      <h1 class=" text-lg font-bold">List products: </h1>
      <ToastContainer position="top-right" newestOnTop />
      {listProducts.length === 0 ? (
        <div>
          <h1>Don't have any product</h1>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{
              maxWidth: 2000,
              width: 1.0,
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Id</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">Discount</StyledTableCell>
                <StyledTableCell align="left">Created at</StyledTableCell>
                <StyledTableCell align="left">Updated at</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProducts.map((row) => (
                <StyledTableRow
                  className={{
                    hover: {
                      "&$hover:hover": {
                        backgroundColor: "#49bb7b",
                      },
                    },
                  }}
                  hover
                  key={row.id}
                >

                  <StyledTableCell align="left">{row.id}</StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.price}</StyledTableCell>
                  <StyledTableCell align="left">{row.discount}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.created_at}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.updated_at}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
