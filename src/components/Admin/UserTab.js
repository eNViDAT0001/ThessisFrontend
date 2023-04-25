import React from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Paper, TableHead } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useFetchListUser, useListUser } from "../../app/hook/UserHook";
import { convertDate } from "../../app/hook/CommonHook";

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
  useFetchListUser();

  const listUsers = useListUser() || [];

  return (
    <div className="p-6 space-y-5">
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
