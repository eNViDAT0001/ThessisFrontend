import React from 'react'
const urlNotFound = "https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-3-800x534.jpg"
export const NotFound = () => {
  return (
    <div className='w-full flex justify-center'>
        <img src={urlNotFound} alt="anh"></img>
    </div>
  )
}
