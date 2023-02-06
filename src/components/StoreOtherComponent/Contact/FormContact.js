import React from 'react'

export default function FormContact() {
  return (
    
    <div className='flex flex-col mt-[46px] mb-[300px] w-[50%] space-y-[47px]'>
        <div className='flex flex-row justify-between'>
            <input type="text" placeholder='Your Name*' className='w-[55%] h-[10%] min-h-[45px] px-2 py-3 border rounded-md'></input>
            <input type="text" placeholder='Your Email*' className='w-[40%] h-[10%] min-h-[45px] px-2 py-3 border rounded-md'></input>
        </div>
        <input type="text" placeholder='Subject*' className='h-[10%] min-h-[45px] px-2 py-3 border rounded-md'></input>
        <textarea  placeholder='Type your message*' className="w-full h-[25%] min-h-[150px] border mt-[45px] px-2 py-3 rounded-md"></textarea>
        <button className="w-[35%] h-[10%] max-h-[15%] mt-20 bg-[#FF1788] text-white"> Send Mail </button>
    </div>
  )
}
