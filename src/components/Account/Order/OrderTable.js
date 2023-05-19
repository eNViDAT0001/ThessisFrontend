import React, { useLayoutEffect } from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { IconButton, Paper, TableHead } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import {
  updateStatusInAccount,
  useListOrderInAccountDetail,
  useMetaInOrderInAccount,
} from "../../../app/hook/OrderHook";
import {
  setLimitInOrderInAccount,
  setPageInOrderInAccount,
  setStatusInOrderInAccount,
} from "../../../app/slices/QuerySlice";
import { useState } from "react";
import { checkObjectEmpty, currencyFormat } from "../../../app/hook/CommonHook";

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

const ListStatus = ["WAITING", "CANCEL"];

export const OrderTable = (props) => {
  const dispatch = useDispatch();
  const listOrders = useListOrderInAccountDetail() || [];
  const metaInOrderInAccount = useMetaInOrderInAccount();
  const [page, setPage] = useState(0);

  useLayoutEffect(() => {
    dispatch(setStatusInOrderInAccount(props.status));
  }, [props, dispatch]);

  useLayoutEffect(() => {
    dispatch(setPageInOrderInAccount(page + 1));
  }, [page, dispatch]);
  const handleButtonDetail = (data) => {
    localStorage.removeItem("orderHandle");
    localStorage.setItem("orderHandle", JSON.stringify(data));
    window.location.replace(`/user/order/${data.id}`);
  };

  const handleChangeStatus = (e) => {
    const idHandle = e.currentTarget.id.split("-")[0];
    const body = {
      status: e.currentTarget.textContent,
    };

    updateStatusInAccount(idHandle, body);
  };

  const handleChangePage = (e, newPage) => {
    const nextPage = newPage;
    setPage(nextPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setPage(0);
    dispatch(setPageInOrderInAccount(1));
    dispatch(setLimitInOrderInAccount(e.target.value));
  };
  return (
    <div>
      <ToastContainer position="top-right" newestOnTop />
      {listOrders.length === 0 ? (
        <div>
          <h1>Order not available</h1>
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
                <StyledTableCell align="left">Detail</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Phone</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
                <StyledTableCell align="left">Quantity</StyledTableCell>
                <StyledTableCell align="left">TotalCost</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Discount</StyledTableCell>
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
                  <StyledTableCell align="left">
                    <IconButton
                      aria-label="delete"
                      id={row.id}
                      onClick={(e) => handleButtonDetail(row)}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </StyledTableCell>

                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.phone}</StyledTableCell>
                  <StyledTableCell align="left">{`${row.street} , ${row.ward}, ${row.district}, ${row.province}`}</StyledTableCell>
                  <StyledTableCell sx={{ width: 0.2 }} align="left">
                    {row.quantity}{" "}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {currencyFormat(row.total)}đ
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.status === "WAITING" ? (
                      <div>
                        <Autocomplete
                          id={row.id}
                          options={ListStatus}
                          size="small"
                          defaultValue={row.status}
                          getOptionDisabled={(option) => option === row.status}
                          sx={{ width: 150 }}
                          onChange={handleChangeStatus}
                          renderInput={(params) => (
                            <TextField {...params} label="Status" />
                          )}
                        />
                      </div>
                    ) : (
                      <div>{row.status}</div>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.discount}%
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!checkObjectEmpty(metaInOrderInAccount) && (
        <TablePagination
          rowsPerPageOptions={[4, 8, 12, 16, 20]}
          component="div"
          count={metaInOrderInAccount.paging.Count}
          rowsPerPage={metaInOrderInAccount.paging.PerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};
