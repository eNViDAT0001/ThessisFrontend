import React, { useCallback, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchOrderDetail } from '../../../store/slices/OrderSlice'
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Autocomplete, Button, IconButton, Paper, TableHead, TextField } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

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

export const TableOrderDetail = (props) => {
    const id = props.id
    const dispatch = useDispatch()
    
    const listOrderDetail = useSelector(state=>state.order.OrderDetail)

    const loadOrderDetail = useCallback(async()=>{
        await dispatch(FetchOrderDetail(id))
    })

    useLayoutEffect(()=>{
        if((listOrderDetail.status!=200) && (listOrderDetail.status!=204)){
            loadOrderDetail()
        }
    },[loadOrderDetail,dispatch,listOrderDetail])
    const orderEmpty = () => {
        return (
            listOrderDetail.status == 204 || listOrderDetail.status != 200
        );
      };
    console.log(listOrderDetail)
   

  return (
    <div>
      {orderEmpty() ? (
        <h1 className="text-xl uppercase"> You don't have ORDER</h1>
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
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Option</StyledTableCell>

                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Quantity</StyledTableCell>
                  <StyledTableCell align="center">Discount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrderDetail.data.data.map((row) => (
                  <StyledTableRow
                    className={{
                      hover: {
                        "&$hover:hover": {
                          backgroundColor: "#49bb7b",
                        },
                      },
                    }}
                    hover
                    key={row.ID}
                  >


                    <StyledTableCell align="center">{row.ID}</StyledTableCell>
                    <StyledTableCell align="center">{row.Name}</StyledTableCell>
                    <StyledTableCell align="center">{(row.Option=="")? "No available" : row.Option }</StyledTableCell>
                    <StyledTableCell align="center">{row.Price}</StyledTableCell>
                    <StyledTableCell align="center">{row.Quantity} </StyledTableCell>
         
                    <StyledTableCell align="center">
                      <div className="px-4 py-1  ">
                        {`${row.Discount}%`}
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      )}
    </div>
  )
}
