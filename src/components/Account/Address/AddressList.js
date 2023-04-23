import React from "react";
import { TableAddress } from "./TableAddress";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
  deleteAddressSelect,
  getSelectedIds,
  useListAddress,
} from "../../../app/hook/AddressHook";
import { useEffect } from "react";
export const AddressList = (props) => {
  const listAddress = useListAddress();

  const [disableButtonDelete, setDisableButtonDelete] = useState(true);

  const handleCreateNewAddress = (e) => {
    window.location.replace("create");
  };

  const handleDeleteListAddress = () => {
    const userID = props.id;
    const listSelect = getSelectedIds(listAddress);
    const body = {
      ids: listSelect,
    };

    deleteAddressSelect(userID, body);
  };
  useEffect(() => {
    if (getSelectedIds(listAddress).length === 0) setDisableButtonDelete(true);
    else setDisableButtonDelete(false);
  }, [listAddress]);
  return (
    <div className="p-10 w-full space-y-5">
      <div className="flex justify-between">
        <h1 className="ml-4 text-xl text-[#1D3178] font-semibold">Address</h1>
        <div className="space-x-4">
          <Button
            disabled={disableButtonDelete}
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteListAddress}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleCreateNewAddress}>
            + Add new address
          </Button>
        </div>
      </div>
      <TableAddress id={props.id} />
    </div>
  );
};
