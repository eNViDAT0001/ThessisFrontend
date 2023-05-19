import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Paper, TableHead } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Button, Autocomplete, TextField } from "@mui/material";
import "react-toastify/ReactToastify.min.css";
import TablePagination from "@mui/material/TablePagination";

import {
  checkObjectEmpty,
  convertDate,
  convertObjectToStringQuery,
} from "../../app/hook/CommonHook";
import { useDispatch } from "react-redux";
import {
  useFetchListBrandInAdmin,
  useFilterInShopInAdmin,
  useListBrandInAdmin,
  useMetaInShopInAdmin,
} from "../../app/hook/BrandHook";
import { Link } from "react-router-dom";
import {
  setLimitInFilterShopTabAdmin,
  setPageInFilterShopTabAdmin,
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&$hover:hover": {
    backgroundColor: "#F1F5F8",
  },
}));

export const BrandTab = () => {
  const dispatch = useDispatch();

  const listBrands = useListBrandInAdmin() || [];
  const metaInBrandInAdmin = useMetaInShopInAdmin() || {};
  const filterInBrandInAdmin = useFilterInShopInAdmin() || {};
  const [page, setPage] = useState(0);

  const handleChangePage = (e, newPage) => {
    const nextPage = newPage;
    setPage(nextPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setPage(0);
    dispatch(setPageInFilterShopTabAdmin(1));
    dispatch(setLimitInFilterShopTabAdmin(e.target.value));
  };

  useEffect(() => {
    dispatch(setPageInFilterShopTabAdmin(page + 1));
  }, [page, dispatch]);

  useFetchListBrandInAdmin(convertObjectToStringQuery(filterInBrandInAdmin));

  return (
    <div className="p-6 space-y-5">
      <h1 class=" text-lg font-bold">List brands: </h1>
      <ToastContainer position="top-right" newestOnTop />
      {listBrands.length === 0 ? (
        <div>
          <h1>Don't have any provider</h1>
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
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Created at</StyledTableCell>
                <StyledTableCell align="left">Updated at</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listBrands.map((row) => (
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
                    {row.image_path ? (
                      <Link to={`/brand-detail/${row.id}`}>
                        <img
                          src={row.image_path}
                          alt="avatar"
                          className="w-[55px] h-[55px] rounded-full"
                        ></img>
                      </Link>
                    ) : (
                      <AccountCircleIcon sx={{ width: 55, height: 55 }} />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Link to={`/brand-detail/${row.id}`}>
                      <h1 className=" hover:text-pink-500 hover:underline">
                        {row.name}
                      </h1>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {convertDate(row.created_at)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {convertDate(row.updated_at)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!checkObjectEmpty(metaInBrandInAdmin) && (
        <TablePagination
          rowsPerPageOptions={[4, 8, 12, 16, 20]}
          component="div"
          count={metaInBrandInAdmin.paging.Count}
          rowsPerPage={metaInBrandInAdmin.paging.PerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};
