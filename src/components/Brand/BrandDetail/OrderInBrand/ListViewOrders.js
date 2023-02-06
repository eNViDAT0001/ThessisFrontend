import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { Autocomplete, Button, IconButton, Paper, TableHead, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { FetchOrderInProvider } from "../../../../store/slices/OrderSlice";
import { OrderApi } from "../../../../api/OrderApi";
import { currencyFormat } from "../../../../stogare_function/listActions";
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

export const ListViewOrders = (props) => {
  const id = props.id;
  const dispatch = useDispatch();
  const ListOrderInProvider = useSelector(
    (state) => state.order.ListOrderInProvider
  );
  const loadProductInProvider = useCallback(async () => {
    await dispatch(FetchOrderInProvider(id));
  });
  const ListStatus = ["WAITING", "CONFIRMED", "DELIVERING", "DELIVERED","CANCEL"];
  useLayoutEffect(() => {
    if (
      ListOrderInProvider.status != 200 &&
      ListOrderInProvider.status != 204
    ) {
      loadProductInProvider();
    }
  }, [dispatch, loadProductInProvider, ListOrderInProvider]);

  const orderEmpty = () => {
    return (
      ListOrderInProvider.status == 204 || ListOrderInProvider.status != 200
    );
  };

  const handleButtonDetail = (e) => {
    window.location.replace(`/order/detail/${e.currentTarget.id}`)
  };

  const UpdateStatus = async(idHandle,body)=>{
    await OrderApi.UpdateStatus(idHandle,body)
    .then(res=>{
      if(res.status==200){
        toast("Update order success", {
            type: "success",
            autoClose: 1000,
            onClose:setTimeout(()=>{
              window.location.reload()
            },1000)
          });
        }
      })
  }

  const handleChangeStatus = (e) =>{
    const idHandle = e.currentTarget.id.split("-")[0]
    const body={
      status: e.currentTarget.textContent
    }
    UpdateStatus(idHandle,body)
  }
  
  return (
    <div>
      {orderEmpty() ? (
        <h1 className="text-xl uppercase"> You don't have ORDER</h1>
      ) : (
        <div className="space-y-3">
          <ToastContainer position="top-right" newestOnTop />

          <h1 className="font-bold text-xl">Table orders:</h1>
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
                {ListOrderInProvider.data.data.map((row) => (
                  <StyledTableRow
                    className={{
                      hover: {
                        "&$hover:hover": {
                          backgroundColor: "#49bb7b",
                        },
                      },
                    }}
                    hover
                    key={row.ID}
                  >
                    <StyledTableCell align="left">
                      <IconButton
                        aria-label="delete"
                        id={row.ID}
                        onClick={handleButtonDetail}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </StyledTableCell>

                    <StyledTableCell align="left">{row.Name}</StyledTableCell>
                    <StyledTableCell align="left">{row.Phone}</StyledTableCell>
                    <StyledTableCell align="left">{`${row.Street} , ${row.Ward}, ${row.District}, ${row.Province}`}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.Quantity}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="left">{currencyFormat(row.Total)}đ</StyledTableCell>
                    <StyledTableCell align="left">
                    
                    <Autocomplete
                        id={row.ID}
                        options={ListStatus}
                        size="small"
                        defaultValue={row.Status}
                        getOptionDisabled={(option) => option === row.Status}
                        sx={{ width: 150 }}
                        onChange={handleChangeStatus}
                        renderInput={(params) => (
                          <TextField {...params} label="Status" />
                        )}
                      />{" "}                    
                      </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="px-4 py-1 border bg-[#C40201] text-white">
                        {`${row.Discount}%`}
                      </div>
                    </StyledTableCell>
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
