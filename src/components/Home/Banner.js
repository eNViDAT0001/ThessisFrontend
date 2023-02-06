import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { AiOutlineVerticalLeft, AiOutlineVerticalRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FetchAllProductBanner } from "../../store/slices/ProductSlice";


const imgNotFound="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
const Banner = () => {
  const dispatch = useDispatch();
  const DataBanner = useSelector((state) => state.product.Banners);
  const [banner, setBanner] = useState();
  const [isFirstRender,setIsFirseRender] = useState(true)

  const loadBanner = useCallback(async()=>{
    await dispatch(FetchAllProductBanner());

  })

  useLayoutEffect(()=>{
    if ((DataBanner.status!=200) && (DataBanner.status!=204)) {
      loadBanner()
    }
    if(DataBanner.status==200){
      if(isFirstRender){
        setBanner(DataBanner.data.data[0])
        setIsFirseRender(false)
      }
    }
   
  },[DataBanner,banner,isFirstRender,dispatch,loadBanner])

  const onPrevClickHandler = () => {
    const index = DataBanner.data.data.indexOf(banner);
    if ((index === 0) || (banner===undefined)) {
      setBanner(DataBanner.data.data[DataBanner.data.data.length - 1]);
    } else setBanner(DataBanner.data.data[index - 1]);
  };

  const onNextClickHandler = () => {
    const index = DataBanner.data.data.indexOf(banner);
    if ((index === DataBanner.data.data.length - 1) || (banner===undefined)) {
      setBanner(DataBanner.data.data[0]);
    } else setBanner(DataBanner.data.data[index + 1]);
  };
  
  return (
    <div>
      {banner !== undefined ? (
        <div className="flex justify-center items-center px-[15%] border hover:shadow-md ">
          <Link className="w-full h-[600px] hover:cursor-pointer"
            to={`/banner-detail/${banner.ID}`}
          >
            <img
              src={banner.Image}
              alt="Anh banner"
              className="w-full h-full skew-y-3 md:transform-none"
            ></img>
          </Link>
          <div className="w-full h-auto flex items-center justify-between absolute  px-5 ">
            <button onClick={onPrevClickHandler}>
              <AiOutlineVerticalRight
                size={30}
                className="bg-black text-white rounded-full bg-opacity-50 hover:bg-opacity-100 transition"
              />
            </button>
            <button onClick={onNextClickHandler}>
              <AiOutlineVerticalLeft
                size={30}
                className="bg-black text-white rounded-full bg-opacity-50 hover:bg-opacity-100 transition"
              />
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Banner;
