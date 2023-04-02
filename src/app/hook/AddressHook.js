import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddressApi } from "../../api/AddressApi";
import { setUserAddress } from "../slices/AddressSlice";
import { useCallback, useEffect } from "react";

export const useListAddress = () =>
  useSelector((state) => state.address.userAddress);
export const useProvince = () =>
  useSelector((state) => state.address.province);
export const useDistrict = () =>
  useSelector((state) => state.address.district);
export const useWard = () =>
  useSelector((state) => state.address.ward);

export const deleteAddressSelect = async (userID, body) => {
  console.log(body);
  await AddressApi.DeleteAddress(userID, body)
    .then((res) => {
      toast("Delete address successful", {
        type: "success",
        autoClose: 2000,
        Close: setTimeout(() => window.location.reload(), 2000),
      });
    })
    .catch((error) => {
      toast("Delete address failed", {
        type: "error",
        autoClose: 2000,
      });
    });
};

export const useFetchListAddress = async (userID) => {
  const dispatch = useDispatch();
  const loadDataAddress = useCallback(async () => {
    dispatch(fetchListAddress(userID));
  });
  useEffect(() => {
    loadDataAddress();
  }, [loadDataAddress]);
};

const fetchListAddress = (userID) => async (dispatch) => {
  try {
    await AddressApi.GetListAddressByUserID(userID).then((res) => {
      dispatch(setUserAddress(res.data.data));
    });
  } catch (err) {}
};


export const saveNewAddress = (
  user_id,
  name,
  gender,
  phone,
  provinceID,
  districtID,
  wardID,
  street,
  districtName,
  wardName
) => {
  if (districtName === "" || wardName === "") {
    toast("Need select District and Ward", {
      type: "error",
      autoClose: 1000,
    });
  } else {
    const body = {
      user_id: user_id,
      name: name,
      gender: gender,
      phone: phone,
      province_code: provinceID,
      district_code: districtID,
      ward_code: wardID,
      street: street,
    };
    AddressApi.AddSaveAddress(user_id, body)
      .then((res) => {
        toast("Add new address successful", {
          type: "success",
          autoClose: 1000,
          Close: setTimeout(
            () => window.location.replace(`/account-address/${user_id}`),
            1000
          ),
        });
      })
      .catch((err) => {
        toast("Add new address fail", {
          type: "error",
          autoClose: 1000,
          Close: setTimeout(
            () => window.location.replace(`/address-detail/${user_id}`),
            1000
          ),
        });
      });
  }
};
