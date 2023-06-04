import React, { useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { Paper, TableHead, IconButton } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  useFetchProductInAdmin,
  useFilterInProductInAdmin,
  useListProductInAdmin,
  useMetaInProductInAdmin,
} from "../../app/hook/ProductHook";
import { useDispatch } from "react-redux";
import {
  checkObjectEmpty,
  convertObjectToStringQuery,
  currencyFormat,
} from "../../app/hook/CommonHook";
import { useState } from "react";
import {
  setLimitInFilterProductTabAdmin,
  setLimitInFilterRequestTabAdmin,
  setPageInFilterProductTabAdmin,
  setPageInFilterRequestTabAdmin,
} from "../../app/slices/QuerySlice";
import {
  useFetchRequest,
  useFilterInRequestInAdmin,
  useListRequestInAdmin,
  useMetaInRequestInAdmin,
} from "../../app/hook/AdminHook";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&$hover:hover": {
    backgroundColor: "#F1F5F8",
  },
}));

export const RequestTab = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const meta = useMetaInRequestInAdmin() || {};
  const filter = useFilterInRequestInAdmin() || {};
  const listRequestInAdmin = useListRequestInAdmin() || [];

  const handleChangePage = (e, newPage) => {
    const nextPage = newPage;
    setPage(nextPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setPage(0);
    dispatch(setPageInFilterRequestTabAdmin(1));
    dispatch(setLimitInFilterRequestTabAdmin(e.target.value));
  };

  useEffect(() => {
    dispatch(setPageInFilterRequestTabAdmin(page + 1));
  }, [page, dispatch]);
  useFetchRequest(convertObjectToStringQuery(filter));

  const handleUpdateButton = (e) => {
    window.location.replace(`/product/${e.currentTarget.id}/edit`);
  };
  return (
    <div className="p-6 space-y-5">
      <h1 class=" text-lg font-bold">List Requests: </h1>
      <ToastContainer position="top-right" newestOnTop />
      {listRequestInAdmin.length === 0 ? (
        <div>
          <h1>Don't have any request</h1>
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
                <StyledTableCell align="left">Subject</StyledTableCell>
                <StyledTableCell align="left">Content</StyledTableCell>
                <StyledTableCell align="left">Attached file</StyledTableCell>

                <StyledTableCell align="left">Type</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listRequestInAdmin.map((row) => (
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
                  <StyledTableCell align="left">{row.subject}</StyledTableCell>
                  <StyledTableCell align="left">{row.content}</StyledTableCell>
                  <StyledTableCell align="left"> {row.content}</StyledTableCell>
                  <StyledTableCell align="left">{row.type}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!checkObjectEmpty(meta) && (
        <TablePagination
          rowsPerPageOptions={[4, 8, 12, 16, 20]}
          component="div"
          count={meta.paging.Count}
          rowsPerPage={meta.paging.PerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};
