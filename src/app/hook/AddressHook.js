import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddressApi } from "../../api/AddressApi";
import {
  setFormAddressSelected,
  setStreetInFormCreate,
  setWardInFormCreate,
  setDistrictInFormCreate,
  setProvinceInFormCreate,
  setPhoneInFormCreate,
  setAddressDetail,
  setDistrict,
  setNameInFormCreate,
  setProvince,
  setUserAddress,
  setWard,
} from "../slices/AddressSlice";
import { useCallback, useEffect, useRef } from "react";

export const useListAddress = () =>
  useSelector((state) => state.address.userAddress);
export const useProvince = () => useSelector((state) => state.address.province);
export const useDistrict = () => useSelector((state) => state.address.district);
export const useAddressDetail = () =>
  useSelector((state) => state.address.addressDetail);
export const useWard = () => useSelector((state) => state.address.ward);
export const useNameInFormCreate = () =>
  useSelector((state) => state.address.nameInFormCreate);
export const usePhoneInFormCreate = () =>
  useSelector((state) => state.address.phoneInFormCreate);
export const useProvinceInFormCreate = () =>
  useSelector((state) => state.address.provinceInFormCreate);
export const useDistrictInFormCreate = () =>
  useSelector((state) => state.address.districtInFormCreate);
export const useWardInFormCreate = () =>
  useSelector((state) => state.address.wardInFormCreate);
export const useStreetInFormCreate = () =>
  useSelector((state) => state.address.streetInFormCreate);
export const useFormAddressSelected = () =>
  useSelector((state) => state.address.formAddressSelected);

export const deleteAddressSelect = async (userID, body) => {
  await AddressApi.DeleteAddress(userID, body)
    .then(() => {
      toast("Delete address successful", {
        type: "success",
        autoClose: 2000,
        Close: setTimeout(() => window.location.reload(), 2000),
      });
    })
    .catch(() => {
      toast("Delete address failed", {
        type: "error",
        autoClose: 2000,
      });
    });
};

export const useFetchAddressDetail = async (addressID, userID) => {
  const dispatch = useDispatch();
  const loadAddressDetail = useCallback(async () => {
    dispatch(fetchAddressDetail(addressID, userID));
  }, [dispatch, addressID, userID]);
  useEffect(() => {
    loadAddressDetail();
  }, [loadAddressDetail]);
};

export const useFetchListAddress = async (userID) => {
  const dispatch = useDispatch();
  const loadDataAddress = useCallback(async () => {
    dispatch(fetchListAddress(userID));
  }, [dispatch, userID]);
  useEffect(() => {
    loadDataAddress();
  }, [loadDataAddress]);
};

export const useFetchInformationInAddAddress = async (
  provinceID,
  districtID
) => {
  const dispatch = useDispatch();
  const prevProvince = useRef(provinceID);
  const prevDistrict = useRef(districtID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchListProvince()).then(() => {
          if (districtID !== prevDistrict.current) {
            return dispatch(fetchListWard(districtID));
          } else if (provinceID !== prevProvince.current) {
            return dispatch(fetchListDistrict(provinceID));
          }
        });
        prevProvince.current = provinceID;
        prevDistrict.current = districtID;
      } catch (error) {}
    };
    fetchData();
  }, [dispatch, provinceID, districtID]);
};

const fetchAddressDetail = (addressID, userID) => async (dispatch) => {
  try {
    await AddressApi.DetailByUserID(addressID, userID).then((res) => {
      dispatch(setAddressDetail(res.data.data));
    });
  } catch (err) {}
};

const fetchListAddress = (userID) => async (dispatch) => {
  try {
    await AddressApi.GetListAddressByUserID(userID).then((res) => {
      const listAddress =
        res.data.data &&
        res.data.data.map((data) => {
          return { ...data, isSelected: false };
        });

      dispatch(setUserAddress(listAddress));
    });
  } catch (err) {}
};

const fetchListProvince = () => async (dispatch) => {
  try {
    await AddressApi.ReadAllProvince().then((res) => {
      dispatch(setProvince(res.data.data));
    });
  } catch (err) {}
};

const fetchListDistrict = (provinceID) => async (dispatch) => {
  try {
    await AddressApi.ReadAllDistrict(provinceID).then((res) => {
      dispatch(setDistrict(res.data.data));
    });
  } catch (err) {}
};

const fetchListWard = (districtID) => async (dispatch) => {
  try {
    await AddressApi.ReadAllWard(districtID).then((res) => {
      dispatch(setWard(res.data.data));
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
      user_id: String(user_id),
      name: name,
      gender: gender,
      phone: phone,
      province_code: provinceID,
      district_code: districtID,
      ward_code: wardID,
      street: street,
    };
    AddressApi.AddSaveAddress(user_id, body)
      .then(() => {
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
        });
      });
  }
};

export const updateAddress = async (addressID, userID, body) => {
  await AddressApi.UpdateAddress(addressID, userID, body)
    .then(() => {
      toast("Update address successful", {
        type: "success",
        autoClose: 2000,
        Close: setTimeout(
          () => window.location.replace(`/account-detail/${userID}`),
          2000
        ),
      });
    })
    .catch(() => {
      toast("Update address fail", {
        type: "error",
        autoClose: 2000,
        Close: setTimeout(
          () => window.location.replace(`/account-detail/${userID}`),
          2000
        ),
      });
    });
};
export const resetForm = () => (dispatch) => {
  dispatch(setNameInFormCreate(""));
  dispatch(setPhoneInFormCreate(""));
  dispatch(setProvinceInFormCreate(""));
  dispatch(setDistrictInFormCreate(""));
  dispatch(setWardInFormCreate(""));
  dispatch(setStreetInFormCreate(""));
};
export const resetAddressSelected = () => (dispatch) => {
  dispatch(setFormAddressSelected({}));
};

export const selectAddress = (arr, addressID) => {
  if (!Array.isArray(arr)) return [];
  return arr.map((address) => {
    if (address.id === addressID) {
      return {
        ...address,
        isSelected: !address.isSelected,
      };
    }
    return address;
  });
};
