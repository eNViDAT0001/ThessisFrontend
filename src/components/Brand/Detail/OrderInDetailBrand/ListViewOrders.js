import React from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import {
  Autocomplete,
  IconButton,
  Paper,
  TableHead,
  TextField,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { currencyFormat } from "../../../../app/hook/CommonHook";
import {
  updateStatus,
  useListOrderInProvider,
} from "../../../../app/hook/OrderHook";
import Popup from "reactjs-popup";
import { FormUpdateStatus } from "./FormUpdateStatus.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsPopUpFormUpdate } from "../../../../app/slices/BrandSlice";
import { useEffect } from "react";
import { useRef } from "react";

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

const listStatus = [
  "WAITING",
  "CONFIRMED",
  "DELIVERING",
  "DELIVERED",
  "CANCEL",
];

export const ListViewOrders = () => {
  const listOrders = useListOrderInProvider() || [];
  const isPopup = useSelector((state) => state.brand.isPopUpFormUpdate);
  const [orderID,setOrderID] = useState(null)
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const handleButtonDetail = (data) => {
    localStorage.removeItem("orderHandle");
    localStorage.setItem("orderHandle", JSON.stringify(data));
    window.location.replace(`/brand-detail/order/${data.id}`);
  };

  const handleChangeStatus = (e) => {
    const idHandle = e.currentTarget.id.split("-")[0];
    if (e.currentTarget.textContent !== "DELIVERED") {
      const body = {
        status: e.currentTarget.textContent,
      };
      updateStatus(idHandle, body);
    } else {
      dispatch(setIsPopUpFormUpdate(true));
      setOrderID(idHandle)
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      dispatch(setIsPopUpFormUpdate(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {listOrders.length == 0 ? (
        <h1 className="text-xl uppercase"> You don't have ORDER</h1>
      ) : (
        <div className="space-y-3">
          <ToastContainer position="top-right" newestOnTop />
          {isPopup && (
            <div ref={popupRef}>
              <FormUpdateStatus id={orderID}/>
            </div>
          )}
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
                    <StyledTableCell align="left">
                      {row.quantity}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {currencyFormat(row.total)}đ
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
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="px-4 py-1 border bg-[#C40201] text-white">
                        {`${row.discount}%`}
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
