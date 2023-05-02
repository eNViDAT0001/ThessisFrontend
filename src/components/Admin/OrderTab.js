import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Checkbox from "@mui/material/Checkbox";
import { Paper, TableHead } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import "react-toastify/ReactToastify.min.css";

import { convertDate, getSelectedIds } from "../../app/hook/CommonHook";
import { useDispatch } from "react-redux";
import {
  updateStatus,
  useFetchOrderInAdmin,
  useListOrderInAdmin,
} from "../../app/hook/OrderHook";
import { useUserID } from "../../app/hook/UserHook";

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

const listStatus = [
  "WAITING",
  "CONFIRMED",
  "DELIVERING",
  "DELIVERED",
  "CANCEL",
];

export const OrderTab = () => {
  const userID = useUserID();
  const listOrders = useListOrderInAdmin() || [];

  const handleChangeStatus = (e) =>{
    const idHandle = e.currentTarget.id.split("-")[0];
    const body = {
      status: e.currentTarget.textContent,
    };
    updateStatus(idHandle, body);
  }
  useFetchOrderInAdmin(userID);

  return (
    <div className="p-6 space-y-5">
      <h1 class=" text-lg font-bold">List orders: </h1>
      <ToastContainer position="top-right" newestOnTop />
      {listOrders.length === 0 ? (
        <div>
          <h1>Don't have any orders</h1>
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
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="left">Gender</StyledTableCell>
                <StyledTableCell align="left">Phone</StyledTableCell>
                <StyledTableCell align="left">Province</StyledTableCell>
                <StyledTableCell align="left">District</StyledTableCell>
                <StyledTableCell align="left">Ward</StyledTableCell>
                <StyledTableCell align="left">Street</StyledTableCell>
                <StyledTableCell align="left">Quantity</StyledTableCell>
                <StyledTableCell align="left">Total</StyledTableCell>
                <StyledTableCell align="left">Discount</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOrders.map((row) => (
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
                  <StyledTableCell id={row.id} align="center">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.gender ? "Male" : "Female"}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.phone}</StyledTableCell>
                  <StyledTableCell align="left">{row.province}</StyledTableCell>
                  <StyledTableCell align="left">{row.district}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.ward}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.street} </StyledTableCell>
                  <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                  <StyledTableCell align="left">{row.total}</StyledTableCell>
                  <StyledTableCell align="left">{row.discount}%</StyledTableCell>

                  <StyledTableCell align="left">
                  <Autocomplete
                        id={row.id}
                        options={listStatus}
                        size="small"
                        defaultValue={row.status}
                        getOptionDisabled={(option) => option === row.Status}
                        sx={{ width: 150 }}
                        onChange={handleChangeStatus}
                        renderInput={(params) => (
                          <TextField {...params} label="Status" />
                        )}
                    />
                  </StyledTableCell>{" "}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
