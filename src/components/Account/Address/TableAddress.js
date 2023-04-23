import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { IconButton } from "@mui/material";
import {
  selectAddress,
  useListAddress,
} from "../../../app/hook/AddressHook";
import Checkbox from "@mui/material/Checkbox";
import { setUserAddress } from "../../../app/slices/AddressSlice";
import { useDispatch } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FB2E86",
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

export const TableAddress = (props) => {
  const addressSave = useListAddress();
  const dispatch = useDispatch();

  const handleButtonFix = (e) => {
    window.location.replace(`/account-address/${e.currentTarget.id}/edit`);
  };

  const handleCheckAddress = (addressID) => {
    const newAddress = selectAddress(addressSave, addressID);
    dispatch(setUserAddress(newAddress));
  };
  return (
    <div>
      <ToastContainer position="top-right" newestOnTop />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Select</StyledTableCell>
              <StyledTableCell>Full name</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Province</StyledTableCell>
              <StyledTableCell align="right">District</StyledTableCell>
              <StyledTableCell align="right">Phone number</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!addressSave ? (
              <div></div>
            ) : (
              addressSave.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell id={row.id} align="center">
                    <Checkbox
                      id={row.id}
                      checked={row.isSelected}
                      onClick={() => handleCheckAddress(row.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.street}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.province}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.district}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.phone}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      id={row.id}
                      aria-label="fix"
                      size="small"
                      onClick={handleButtonFix}
                    >
                      <SettingsRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
