import React, { useCallback, useLayoutEffect } from 'react'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useDispatch, useSelector } from 'react-redux';
import { FetchOrderInProvider } from '../../../../store/slices/OrderSlice';
import { currencyFormat } from '../../../../stogare_function/listActions';

export const TotalRevenue = (props) => {
  
  const id = props.id;
  const dispatch = useDispatch();
  const ListOrderInProvider = useSelector(
    (state) => state.order.ListOrderInProvider
  );
  const loadProductInProvider = useCallback(async () => {
    await dispatch(FetchOrderInProvider(id));
  });
  
  useLayoutEffect(() => {
    if (
      ListOrderInProvider.status != 200 &&
      ListOrderInProvider.status != 204
    ) {
      loadProductInProvider();
    }
  }, [dispatch, loadProductInProvider, ListOrderInProvider]);

  const orderEmpty = () => {
    return (
      ListOrderInProvider.status == 204 || ListOrderInProvider.status != 200
    );
  };
  const totalRevenue = () =>{
    if(orderEmpty()) return 0
    else{
      var result = 0
      ListOrderInProvider.data.data.map(data=>{
        if(data.Status=="DELIVERED") result = result + data.Total
      })
      return result
    }
  }
  
    return (
        <div className="flex flex-row">
          <div className="flex flex-row items-center space-x-6">
            <CreditScoreIcon sx={{ width: 40, height: 40 }} />
            <div className="flex flex-col justify-between">
              <h1 className=" text-base text-[#B1B5B5]">Revenue</h1>
              <h1 className=" text-3xl font-[Verdana]">{currencyFormat(totalRevenue())+"đ"}</h1>
            </div>
          </div>
        </div>
      );
}
