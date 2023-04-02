const HeaderBar = (props) =>{
    return(
    <div className="w-full h-[47px] bg-[#F6F5FF]">
        <div className="flex justify-start items-center flex-row flex-nowrap py-[14px] px-[183px] font-medium text-base">
            <h1>{props.name1}</h1>
            <h1 className="text-pink-500 ">{props.name2}</h1>
        </div>
    </div>)
}

export default HeaderBar