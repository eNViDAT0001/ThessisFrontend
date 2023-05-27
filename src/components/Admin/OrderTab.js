import React from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { Paper, TableHead, IconButton } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import "react-toastify/ReactToastify.min.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import {
  updateStatus,
  useFetchOrderInAdmin,
  useFilterInOrderInAdmin,
  useListOrderInAdmin,
  useMetaInOrderInAdmin,
} from "../../app/hook/OrderHook";
import { useUserID } from "../../app/hook/UserHook";
import {
  checkObjectEmpty,
  convertObjectToStringQuery,
  currencyFormat,
} from "../../app/hook/CommonHook";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  setLimitInFilterOrderTabAdmin,
  setPageInFilterOrderTabAdmin,
} from "../../app/slices/QuerySlice";
import { useEffect } from "react";

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
  const dispatch = useDispatch();

  const userID = useUserID();
  const listOrders = useListOrderInAdmin() || [];
  const metaInOrderInAdmin = useMetaInOrderInAdmin() || {};
  const filterInOrderInAdmin = useFilterInOrderInAdmin() || {};
  const [page, setPage] = useState(0);

  const handleChangeStatus = (e) => {
    const idHandle = e.currentTarget.id.split("-")[0];
    const body = {
      status: e.currentTarget.textContent,
    };
    updateStatus(idHandle, body);
  };

  const handleChangePage = (e, newPage) => {
    const nextPage = newPage;
    setPage(nextPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setPage(0);
    dispatch(setPageInFilterOrderTabAdmin(1));
    dispatch(setLimitInFilterOrderTabAdmin(e.target.value));
  };

  const handleButtonDetail = (data) => {
    localStorage.removeItem("orderHandle");
    localStorage.setItem("orderHandle", JSON.stringify(data));
    window.location.replace(`/admin/order/${data.id}`);
  };

  useEffect(() => {
    dispatch(setPageInFilterOrderTabAdmin(page + 1));
  }, [page, dispatch]);

  useFetchOrderInAdmin(
    userID,
    convertObjectToStringQuery(filterInOrderInAdmin)
  );

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
                <StyledTableCell align="left">Detail</StyledTableCell>
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
                  <StyledTableCell align="left">
                    <IconButton
                      aria-label="delete"
                      id={row.id}
                      onClick={(e) => handleButtonDetail(row)}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell id={row.id} align="center">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.gender ? "Male" : "Female"}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.phone}</StyledTableCell>
                  <StyledTableCell align="left">{row.province}</StyledTableCell>
                  <StyledTableCell align="left">{row.district}</StyledTableCell>
                  <StyledTableCell align="left">{row.ward}</StyledTableCell>
                  <StyledTableCell align="left">{row.street} </StyledTableCell>
                  <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                  <StyledTableCell align="left">
                    {currencyFormat(row.total)}đ
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.discount}%
                  </StyledTableCell>
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
      {!checkObjectEmpty(metaInOrderInAdmin) && (
        <TablePagination
          rowsPerPageOptions={[4, 8, 12, 16, 20]}
          component="div"
          count={metaInOrderInAdmin.paging.Count}
          rowsPerPage={metaInOrderInAdmin.paging.PerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};
