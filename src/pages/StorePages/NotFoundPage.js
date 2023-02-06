import HeaderBarBig from '../../components/StoreOtherComponent/HeaderBarBig';
import svgNotFound from "../../components/StoreOtherComponent/NotFound/asset/svgNotFound.svg";
import svgTextNotFound from "../../components/StoreOtherComponent/NotFound/asset/svgTextNotFound.svg";

const NotFoundPage = () =>{
    return(
        <div className="font-['Josefin_Sans']">
            <HeaderBarBig nameTitle="404 Not Found" name1= "Home . Pages" name2= " . 404 Not Found"/>
            <div className='flex justify-center'>
                <div className='w-[45%] min-w-[400px] flex items-center flex-col'>
                    <img src = {svgNotFound} alt="anh not found" ></img>
                    <img src = {svgTextNotFound} alt="thong bao not found"></img>
                    <button className="w-[35%] h-[50px] mt-20 mb-20 bg-[#FF1788] text-white"> Back to Home </button>
                </div>    
            </div>
        </div>
    )
}

export default NotFoundPage;