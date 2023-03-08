import React from 'react'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { currencyFormat } from '../../../../app/hook/CommonHook';


export const TotalRevenue = (props) => {
  
    return (
        <div className="flex flex-row">
          <div className="flex flex-row items-center space-x-6">
            <CreditScoreIcon sx={{ width: 40, height: 40 }} />
            <div className="flex flex-col justify-between">
              <h1 className=" text-base text-[#B1B5B5]">Revenue</h1>
              <h1 className=" text-3xl font-[Verdana]">{currencyFormat(0)+"đ"}</h1>
            </div>
          </div>
        </div>
      );
}