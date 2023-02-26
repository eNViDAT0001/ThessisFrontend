import React from 'react'
import { HandleQuantityAndCart } from './HandleQuantityAndCart'
import { TitleAndType } from './TitleAndType'

export const BasicInformation = (props) => {
  return (
        <div className="min-w-[450px]">
          <TitleAndType id={props.id} />
          <HandleQuantityAndCart id={props.id} />
        </div>
  )
}
