import React from 'react'

const HeaderBarBig = (props) => {
  return (
    <div className="w-full h-[286px] bg-gray-header flex justify-center">
        <div className="min-w-[200px] w-[65%] flex justify-center flex-col">
            <h1 className=' text-[#101075] text-4xl font-normal'>{props.nameTitle}</h1>
            <div className='flex flex-row mt-3'>
                <h1>{props.name1}</h1>
                <h1 className="text-pink-500 ">{props.name2}</h1>
            </div>
        </div>
    </div>
  )
}

export default HeaderBarBig