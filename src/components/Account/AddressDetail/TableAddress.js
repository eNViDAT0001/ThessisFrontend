import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useEffect } from "react";
import { GetListAddress } from "../../../store/slices/AddressSlice";
import { Button, IconButton, Pagination } from "@mui/material";
import { AddressApi } from "../../../api/AddressApi";

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
  const dispatch = useDispatch();
  const addressSave = useSelector((state) => state.address.UserAddress);

  useEffect(() => {
     const result = async()=>{
      await dispatch(GetListAddress(props.id));
     }
     result()
  }, [dispatch,props.id]);

  const handleCreateNewAddress = (e) => {
    window.location.replace("/address-create");
  };

  const DeleteAddressSelect = async (addressID, userID) => {
    await AddressApi.DeleteAddress(addressID, userID)
      .then((res) => {
        toast("Delete address successful", {
          type: "success",
          autoClose: 2000,
          Close: setTimeout(
            () => window.location.reload(),
            2000
          ),
        });
      })
      .catch((error) => {
        toast("Delete address failed", {
          type: "error",
          autoClose: 2000,
        });
      });
  };
  const handleButtonDelete = (e) => {
    const addressID = e.currentTarget.id
    const userID = props.id

    DeleteAddressSelect(addressID, userID);
  };

  const SaveAddressFix = async (addressID, userID) => {
    await AddressApi.DetailByUserID(addressID, userID).then((res) => {
      localStorage.removeItem("SaveAddressFix");
      localStorage.setItem("SaveAddressFix", JSON.stringify(res.data.data));
      window.location.replace(`/address-fix/${addressID}`);
    });
  };
  const handleButtonFix = (e) => {
    SaveAddressFix(e.currentTarget.id, props.id);
  };
  return (
    <div>
      <ToastContainer position="top-right" newestOnTop />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
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
                <StyledTableRow key={row.ID}>
                  <StyledTableCell component="th" scope="row">
                    {row.Name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Street}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Province}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.District}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Phone}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      id={row.ID}
                      aria-label="fix"
                      size="small"
                      onClick={handleButtonFix}
                    >
                      <SettingsRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      id={row.ID}
                      aria-label="delete"
                      size="small "
                      onClick={handleButtonDelete}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <div className="flex justify-center my-8">
        <Pagination count={1} showFirstButton showLastButton />
      </div>
      <div className="flex flex-row-reverse mt-5">
        <Button
          variant="contained"
          size="large"
          onClick={handleCreateNewAddress}
        >
          + Add new address
        </Button>
      </div>
    </div>
  );
};
