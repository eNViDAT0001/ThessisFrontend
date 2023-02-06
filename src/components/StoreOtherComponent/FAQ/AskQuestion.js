import React from 'react'

export default function AskQuestion() {
  return (
    <div className='flex flex-col w-[45%] min-w-[150px] px-[46px] py-[64px] bg-[#F8F8FD]'>
        <h1 className=' text-3xl text-[#1D3178]'>Ask a Question</h1>
        <input type="text" placeholder='Your Name*' className="w-full h-[10%] bg-[#FFFFFF] mt-[90px] px-2 py-3 rounded-md"></input>
        <input type="text" placeholder='Subject*' className="w-full h-[10%] bg-[#FFFFFF] mt-[35px] px-2 py-3 rounded-md"></input>
        <textarea  placeholder='Type your message*' className="w-full h-[35%] bg-[#FFFFFF] mt-[45px] px-2 py-3 rounded-md"></textarea>
        <button className="w-[35%] h-[10%] max-h-[15%] mt-20 bg-[#FF1788] text-white"> Send Mail </button>
        </div>
        
  )
}
