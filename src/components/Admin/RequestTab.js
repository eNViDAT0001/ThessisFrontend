import React, { useEffect, useRef } from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { Paper, TableHead, IconButton, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import CheckIcon from "@mui/icons-material/Check";
import CustomAlert from "./CustomAlert";
import { useDispatch } from "react-redux";
import {
  checkObjectEmpty,
  convertObjectToStringQuery,
  truncateString,
} from "../../app/hook/CommonHook";
import { useState } from "react";
import {
  setLimitInFilterRequestTabAdmin,
  setPageInFilterRequestTabAdmin,
  setTypeInFilterRequestTabAdmin,
} from "../../app/slices/QuerySlice";
import {
  updateRequest,
  useFetchRequest,
  useFilterInRequestInAdmin,
  useListRequestInAdmin,
  useMetaInRequestInAdmin,
} from "../../app/hook/AdminHook";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
  const [showAlert, setShowAlert] = useState(false);
  const popupRef = useRef(null);

  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePage = (e, newPage) => {
    const nextPage = newPage;
    setPage(nextPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setPage(0);
    dispatch(setPageInFilterRequestTabAdmin(1));
    dispatch(setLimitInFilterRequestTabAdmin(e.target.value));
  };

  const handleChangeOption = (e) => {
    switch (e.target.value) {
      case "all":
        dispatch(setTypeInFilterRequestTabAdmin(null));
        break;
      case "shop":
        dispatch(setTypeInFilterRequestTabAdmin("SHOP"));
        break;
      case "payment":
        dispatch(setTypeInFilterRequestTabAdmin("PAYMENT"));
        break;
      case "order":
        dispatch(setTypeInFilterRequestTabAdmin("ORDER"));
        break;
      case "feedback":
        dispatch(setTypeInFilterRequestTabAdmin("FEEDBACK"));
        break;
      default:
        return;
    }
  };

  const handleClickDetail = (e) => {
    setAlertMessage(e.currentTarget.id);
    setShowAlert(true);
  };

  const handleClickConfirm = (e) => {
    const body = {
      seen: true,
    };
    updateRequest(e.currentTarget.id, body);
  };

  useEffect(() => {
    dispatch(setPageInFilterRequestTabAdmin(page + 1));
  }, [page, dispatch]);
  useFetchRequest(convertObjectToStringQuery(filter));

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowAlert(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-row space-x-5">
        {showAlert && (
          <div ref={popupRef}>
            <CustomAlert message={alertMessage} />
          </div>
        )}
        <select
          id="sort-options"
          className="border px-2 py-1"
          onChange={handleChangeOption}
        >
          <option value="all">All</option>
          <option value="shop">Shop</option>
          <option value="payment">Payment</option>
          <option value="order">Order</option>
          <option value="feedback">Feedback</option>
        </select>
      </div>

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
                <StyledTableCell align="left">Detail</StyledTableCell>
                <StyledTableCell align="left">Subject</StyledTableCell>
                <StyledTableCell align="left">Content</StyledTableCell>
                <StyledTableCell align="left">Attached file</StyledTableCell>
                <StyledTableCell align="left">Type</StyledTableCell>
                <StyledTableCell align="left">Solved</StyledTableCell>
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
                  <StyledTableCell align="left">
                    <IconButton id={row.content} onClick={handleClickDetail}>
                      <VisibilityIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <h1 className={`${!row.seen && " font-bold"}`}>
                      {row.subject}
                    </h1>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <h1 className={`${!row.seen && " font-bold"}`}>
                      {truncateString(row.content, 40)}
                    </h1>{" "}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.attached_file !== "" ? (
                      row.attached_file
                        .trim()
                        .split(", ")
                        .map((element) => element.trim())
                        .map((data) => (
                          <h1
                            className="hover:text-[#2F1AC4] hover:underline cursor-pointer"
                            key={data}
                            onClick={() => window.open(`${data}`)}
                          >
                            {truncateString(data, 40)}
                          </h1>
                        ))
                    ) : (
                      <h1>No attached file</h1>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <h1 className={`${!row.seen && " font-bold"}`}>
                      {row.type}
                    </h1>{" "}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <Button
                      variant="contained"
                      id={row.id}
                      disabled={row.seen}
                      endIcon={<CheckIcon />}
                      onClick={handleClickConfirm}
                    >
                      Confirm
                    </Button>
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
