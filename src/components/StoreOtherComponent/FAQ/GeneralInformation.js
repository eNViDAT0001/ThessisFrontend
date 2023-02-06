import React from 'react'

const ListInformation = [
    {
        id: 0,
        question: "Eu dictumst cum at sed euismood condimentum?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis."
    },
    {
        id: 1,
        question: "Magna bibendum est fermentum eros.",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis."
    },
    {
        id: 2,
        question: "Odio muskana hak eris conseekin sceleton?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis."
    },
    {
        id: 3,
        question: "Elit id blandit sabara boi velit gua mara?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis."
    },
]

export default function GeneralInformation() {
  return (
    <div className="flex flex-col w-[45%] min-w-[150px]">
        <h1 className=' text-4xl text-[#1D3178]'>General Information</h1>
        <div>
            {ListInformation.map(data =>(
                <div key={data.id} className="mt-[66px]">
                    <h1 className=' text-[17px] text-[#1D3178]'>{data.question}</h1>
                    <h1 className='mt-[15px] text-[#A1ABCC]'>{data.answer}</h1>
                </div>
            ))}
        </div>
    </div>
  )
}
