import React from 'react'

import ListAltIcon from '@mui/icons-material/ListAlt';
import { useListOrderInProvider } from '../../../../app/hook/OrderHook';


export const TotalOrder = (props) => {
  const listOrders = useListOrderInProvider() || []
    return (
        <div className="flex flex-row">
          <div className="flex flex-row items-center space-x-6">
            <ListAltIcon sx={{ width: 40, height: 40 }} />
            <div className="flex flex-col justify-between">
              <h1 className=" text-base text-[#B1B5B5]">Total order in this brand:</h1>
              <h1 className=" text-3xl font-[Verdana]">
                {listOrders.length}
              </h1>
            </div>
          </div>
        </div>
      );
}