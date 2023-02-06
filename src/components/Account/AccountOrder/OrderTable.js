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

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import {
  Divider,
  IconButton,
  Pagination,
  Paper,
  TableHead,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchOrderInUser,
  resetOrder,
} from "../../../store/slices/OrderSlice";
import { OrderApi } from "../../../api/OrderApi";

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

const ListStatus = ["WAITING","CANCEL"];

export const OrderTable = (props) => {
  const id = localStorage.getItem("UserID");
  const dispatch = useDispatch();
  const listOrders = useSelector((state) => state.order.OrderAccount);
  const nameSearch = useSelector((state) => state.order.nameSearch);
  const [filter, setFilter] = useState({
    "search[]": nameSearch == "" ? "" : `name_${nameSearch}`,
    "fields[]": props.status === "ALL" ? "" : `status_${props.status}`,
  });

  const loadOrder = useCallback(async () => {
    await dispatch(FetchOrderInUser(id, filter));
  });

  useEffect(
    () => () => {
      dispatch(resetOrder());
    },
    [dispatch]
  );

  useLayoutEffect(() => {
    if (listOrders.status != 200 && listOrders.status != 204) {
      loadOrder();
    }
  }, [loadOrder, dispatch, listOrders]);
  const handleButtonDetail = (e) => {
    window.location.replace(`/order/detail/${e.currentTarget.id}`);
  };
  const orderEmpty = () => {
    return listOrders.status == 204 || listOrders.status != 200;
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
                <ToastContainer position="top-right" newestOnTop />

      {orderEmpty() ? (
        <div>
          <h1>Order not availale</h1>
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
              {listOrders.data.data.map((row) => (
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
                  <StyledTableCell sx={{ width: 0.2 }} align="left">
                    {row.Quantity}{" "}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.Total} </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Status === "WAITING" ? (
                      <div>
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
                      />
                      </div>
                    ) : (
                      <div>{row.Status}</div>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div className="px-3 py-1 border border-[#00F700] text-[#00F700]">
                      {`${row.Discount}%`}
                    </div>
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
