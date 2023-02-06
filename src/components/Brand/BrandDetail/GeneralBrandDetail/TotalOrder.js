import React, { useCallback, useLayoutEffect } from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useDispatch, useSelector } from 'react-redux';
import { FetchOrderInProvider } from '../../../../store/slices/OrderSlice';

export const TotalOrder = (props) => {

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

  const emptyOrder=()=>{
    return ((ListOrderInProvider.status==204)|| (ListOrderInProvider.status!=200))
  }
    return (
        <div className="flex flex-row">
          <div className="flex flex-row items-center space-x-6">
            <ListAltIcon sx={{ width: 40, height: 40 }} />
            <div className="flex flex-col justify-between">
              <h1 className=" text-base text-[#B1B5B5]">Total order in this brand:</h1>
              <h1 className=" text-3xl font-[Verdana]">
                {emptyOrder() ? 0 : ListOrderInProvider.data.data.length}
              </h1>
            </div>
          </div>
        </div>
      );
}
