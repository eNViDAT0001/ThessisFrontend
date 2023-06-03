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
  setPageInFilterProductTabAdmin,
} from "../../app/slices/QuerySlice";

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

export const ProductTab = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const meta = useMetaInProductInAdmin() || {};
  const filter = useFilterInProductInAdmin() || {};
  const listProducts = useListProductInAdmin() || [];

  const handleChangePage = (e, newPage) => {
    const nextPage = newPage;
    setPage(nextPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setPage(0);
    dispatch(setPageInFilterProductTabAdmin(1));
    dispatch(setLimitInFilterProductTabAdmin(e.target.value));
  };

  useEffect(() => {
    dispatch(setPageInFilterProductTabAdmin(page + 1));
  }, [page, dispatch]);
  useFetchProductInAdmin(convertObjectToStringQuery(filter));

  const handleUpdateButton = (e) => {
    window.location.replace(`/product/${e.currentTarget.id}/edit`);
  };
  return (
    <div className="p-6 space-y-5">
      <h1 class=" text-lg font-bold">List products: </h1>
      <ToastContainer position="top-right" newestOnTop />
      {listProducts.length === 0 ? (
        <div>
          <h1>Don't have any product</h1>
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
                <StyledTableCell align="left">Id</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Option</StyledTableCell>

                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">Discount</StyledTableCell>
                <StyledTableCell align="left">Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProducts.map((row) => (
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
                  <StyledTableCell align="left">{row.id}</StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="space-y-2 ">
                      {row.options.map((data) => (
                        <div
                          key={data.name}
                          className="px-2 py-1 bg-[#FF9062] shadow-md rounded-sm w-[50%]"
                        >
                          <h1 className="text-white">{data.name}</h1>
                        </div>
                      ))}
                    </div>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {currencyFormat(row.price)}đ
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.discount}%
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton
                      id={row.id}
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      onClick={handleUpdateButton}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </StyledTableCell>
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
