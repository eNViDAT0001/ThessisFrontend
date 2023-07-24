import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Checkbox from "@mui/material/Checkbox";
import { IconButton, Paper, TableHead } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Button, Autocomplete, TextField } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import TablePagination from "@mui/material/TablePagination";
import SettingsIcon from "@mui/icons-material/Settings";

import "react-toastify/ReactToastify.min.css";
import {
  deleteListCoupon,
  selectCoupon,
  useListCouponInBrand,
  useMetaCouponInBrand,
} from "../../../../app/hook/CouponHook";
import { useDispatch } from "react-redux";
import {
  setLimitInCouponInBrand,
  setMarkerInCouponInBrand,
} from "../../../../app/slices/QuerySlice";
import {
  checkObjectEmpty,
  getSelectedIds,
} from "../../../../app/hook/CommonHook";
import { setListCoupon } from "../../../../app/slices/CouponSlice";
import { useLanguage } from "../../../../app/hook/LanguageHook";
import { useUserID } from "../../../../app/hook/UserHook";

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
export const ListCouponInBrand = () => {
  const dispatch = useDispatch();
  const language = useLanguage();
  const listCoupon = useListCouponInBrand() || [];
  const metaCoupon = useMetaCouponInBrand() || {};
  const userId = useUserID();

  const [page, setPage] = useState(0);
  const [disableButtonDelete, setDisableButtonDelete] = useState(true);

  const handleChangePage = (e, newPage) => {
    const nextPage = newPage;
    setPage(nextPage);
  };

  const handleUpdateButton = (e) => {
    window.location.replace(`/coupon/${e.currentTarget.id}/edit`);
  };

  const handleChangeRowsPerPage = (e) => {
    setPage(0);
    dispatch(setMarkerInCouponInBrand(1));
    dispatch(setLimitInCouponInBrand(e.target.value));
  };

  const handleDeleteCoupon = (e) => {
    const listSelect = getSelectedIds(listCoupon);
    const body = {
      ids: listSelect,
    };
    dispatch(deleteListCoupon(userId, body));
  };

  const handleCheckCoupon = (couponId) => {
    const newCoupon = selectCoupon(listCoupon, couponId);
    dispatch(setListCoupon(newCoupon));
  };

  useEffect(() => {
    if (getSelectedIds(listCoupon).length === 0) setDisableButtonDelete(true);
    else setDisableButtonDelete(false);
  }, [listCoupon]);

  useEffect(() => {
    dispatch(setMarkerInCouponInBrand(page + 1));
  }, [page, dispatch]);
  return (
    <div className="p-6 space-y-5">
      <div>
        <Button
          disabled={disableButtonDelete}
          variant="outlined"
          startIcon={<BlockIcon />}
          onClick={handleDeleteCoupon}
        >
          {language ? "Xóa" : "Delete Coupon"}
        </Button>
      </div>
      <h1 class=" text-lg font-bold">
        {language ? "Danh sách khuyến mãi: " : "List coupons: "}
      </h1>
      <ToastContainer position="top-right" newestOnTop />
      {listCoupon.length === 0 ? (
        <div>
          <h1>
            {language ? "Bạn không có khuyến mãi" : " Don't have any coupon"}
          </h1>
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
                <StyledTableCell align="left">
                  {language ? "Chọn" : "Selected"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {language ? "Mã" : "Code"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {language ? "Giá trị" : "Value"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {" "}
                  {language ? "Giảm tối đa" : "Fixed"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {language ? "Cập nhật" : "Updated"}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listCoupon.map((row) => (
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
                  <StyledTableCell id={row.id} align="left">
                    <Checkbox
                      id={row.id}
                      checked={row.isSelected}
                      onClick={() => handleCheckCoupon(row.id)}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="left">{row.code}</StyledTableCell>
                  <StyledTableCell align="left">{row.percent}%</StyledTableCell>
                  <StyledTableCell align="left">{row.fixed}</StyledTableCell>
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
      {!checkObjectEmpty(metaCoupon) && (
        <TablePagination
          rowsPerPageOptions={[4, 8, 12, 16, 20]}
          component="div"
          count={metaCoupon.paging.Count}
          rowsPerPage={metaCoupon.paging.PerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};