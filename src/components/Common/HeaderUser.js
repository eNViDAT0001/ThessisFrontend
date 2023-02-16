import React from 'react'

export const HeaderUser = () => {
  return (
    <div className="w-full bg-[#FFFFFF] flex justify-center border-b">
      <div className="w-[80%] py-[30px]">
        <div className="flex justify-between items-center">
          <div className="font-['Inter'] font-bold text-[#131313] text-lg uppercase ">
            <div className="flex flex-row space-x-[30px]">
              <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                Home
              </h1>
              <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                Category
              </h1>
              <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                Order
              </h1>
              <h1 className="hover:underline underline-offset-8 hover:cursor-pointer">
                Contact
              </h1>

              
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
