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
import { useCallback, useEffect } from "react";

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

export const useFetchAddressDetail = async (addressID, userID) => {
  const dispatch = useDispatch();
  const loadAddressDetail = useCallback(async () => {
    dispatch(fetchAddressDetail(addressID, userID));
  });
  useEffect(() => {
    loadAddressDetail();
  }, [loadAddressDetail]);
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

export const useFetchProvince = async () => {
  const dispatch = useDispatch();
  const loadDataProvince = useCallback(async () => {
    dispatch(fetchListProvince());
  });
  useEffect(() => {
    loadDataProvince();
  }, [loadDataProvince]);
};

export const useFetchDistrict = async (provinceID) => {
  const dispatch = useDispatch();
  const loadDataDistrict = useCallback(async () => {
    dispatch(fetchListDistrict(provinceID));
  }, [dispatch, provinceID]);
  useEffect(() => {
    loadDataDistrict();
  }, [loadDataDistrict]);
};

export const useFetchWard = async (districtID) => {
  const dispatch = useDispatch();
  const loadDataWard = useCallback(async () => {
    dispatch(fetchListWard(districtID));
  }, [dispatch, districtID]);
  useEffect(() => {
    loadDataWard();
  }, [loadDataWard]);
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
      dispatch(setUserAddress(res.data.data));
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
      user_id: user_id,
      name: name,
      gender: gender,
      phone: phone,
      province_code: provinceID,
      district_code: districtID,
      ward_code: wardID,
      street: street,
    };
    console.log(body);
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
        });
      });
  }
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
