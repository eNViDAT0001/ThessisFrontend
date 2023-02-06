import React, { useCallback, useEffect } from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { FetchProductInHomePage } from '../../../store/slices/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setProductInBrand } from '../../../store/slices/ProviderSlice';

export const TotalProduct = () => {


    return (
        <div className="flex flex-row">
          <div className="flex flex-row items-center space-x-6">
            <ShoppingBasketIcon sx={{ width: 40, height: 40 }} />
            <div className="flex flex-col justify-between">
              <h1 className=" text-base text-[#B1B5B5]">Number of products on sale</h1>
              <h1 className=" text-3xl font-[Verdana]">100</h1>
            </div>
          </div>
        </div>
      );
}
