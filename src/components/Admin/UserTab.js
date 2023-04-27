import React, { useEffect, useMemo, useState } from "react";
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
import { Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import "react-toastify/ReactToastify.min.css";
import {
  banListUser,
  selectUser,
  useFetchListUser,
  useListUser,
} from "../../app/hook/UserHook";
import { convertDate, getSelectedIds } from "../../app/hook/CommonHook";
import { useDispatch } from "react-redux";
import { setListUserInAdmin } from "../../app/slices/UserSlice";

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

export const UserTab = () => {
  const dispatch = useDispatch();

  const listUsers = useListUser() || [];
  useFetchListUser();

  const [disableButtonDelete, setDisableButtonDelete] = useState(true);

  const handleCheckUser = (userID) => {
    const newUser = selectUser(listUsers, userID);
    dispatch(setListUserInAdmin(newUser));
  };

  const handleBanListUser = (e) => {
    const listSelect = getSelectedIds(listUsers);
    const body = {
      ids: listSelect,
    };
    dispatch(banListUser(body))
  };

  useEffect(() => {
    if (getSelectedIds(listUsers).length === 0) setDisableButtonDelete(true);
    else setDisableButtonDelete(false);
  }, [listUsers]);
  return (
    <div className="p-6 space-y-5">
      <div>
        <Button
          disabled={disableButtonDelete}
          variant="outlined"
          startIcon={<BlockIcon />}
          onClick={handleBanListUser}
        >
          Ban User
        </Button>
      </div>
      <h1 class=" text-lg font-bold">List users: </h1>
      <ToastContainer position="top-right" newestOnTop />
      {listUsers.length === 0 ? (
        <div>
          <h1>Don't have any user</h1>
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
                <StyledTableCell align="left">Select</StyledTableCell>
                <StyledTableCell align="left">Avatar</StyledTableCell>
                <StyledTableCell align="left">Username</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Birthday</StyledTableCell>
                <StyledTableCell align="left">Gender</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Phone</StyledTableCell>
                <StyledTableCell align="left">Type</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listUsers.map((row) => (
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
                    <Checkbox
                      id={row.id}
                      checked={row.isSelected}
                      onClick={() => handleCheckUser(row.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.avatar ? (
                      <img
                        src={row.avatar}
                        alt="avatar"
                        className="w-[55px] h-[55px] rounded-full"
                      ></img>
                    ) : (
                      <AccountCircleIcon sx={{ width: 55, height: 55 }} />
                    )}
                  </StyledTableCell>

                  <StyledTableCell align="left">{row.username}</StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">
                    {convertDate(row.birthday)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.gender ? "Male" : "Female"}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.email} </StyledTableCell>
                  <StyledTableCell align="left">{row.phone}</StyledTableCell>
                  <StyledTableCell align="left">{row.type}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
