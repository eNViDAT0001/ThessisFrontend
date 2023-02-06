import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkObjectEmpty } from "../../../../stogare_function/listActions";
import { FetchMediaFromOneProduct } from "../../../../store/slices/ProductSlice";
const imgNotFound =
  "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";

const ImageProduct = (props) => {
  const dispatch = useDispatch();
  const [imageBig, setImageBig] = useState(imgNotFound);
  const listMedia = useSelector((state) => state.product.Media);
  const productDetail = useSelector((state)=>state.product.ProductDetail)
  const [getArrayMedia,setArrayMedia] = useState([])
  const [firstRender,setFirstRender] = useState(true)

  const loadMedia = useCallback(async()=>{
    await dispatch(FetchMediaFromOneProduct(props.id));

  })
  useLayoutEffect(() => {
    if(productDetail.status==200){
    if ((listMedia.status != 200) && (listMedia.status != 204)) {
      loadMedia()
    }
    if(listMedia.status==200){
      setArrayMedia(listMedia.data.data)
      if(firstRender){
        setFirstRender(false)
        setImageBig(listMedia.data.data[0].MediaPath)
      }
    }
    }
  }, [productDetail,dispatch, listMedia, props.id,imageBig,firstRender,loadMedia]);
 
  const handleClickImage = (event) => {
    const id = event.currentTarget.id;
    const GetMediaFromId = getArrayMedia.filter((data) => data.ID == id);
    setImageBig(GetMediaFromId[0].MediaPath);
  };

  return (
    <div className="w-full flex flex-col space-y-4 p-2">
      {!checkObjectEmpty(listMedia) ? (
        <div>
          <img
            src={imageBig}
            alt="Anh san pham"
            className="w-full h-[450px]"
          ></img>
          <div className="flex flex-row w-full flex-wrap">
            {getArrayMedia.map((data) => (
              <img
                src={data.MediaPath}
                id={data.ID}
                alt="Anh san pham"
                className="w-[29%] m-2 hover:border-[#0D134E] hover:border-4 "
                onClick={handleClickImage}
              ></img>
            ))}
          </div>{" "}
        </div>
      ) : (
        <div>
          <img
            src={imgNotFound}
            alt="Anh loi"
            className="w-full max-h-[450px]"
          ></img>
        </div>
      )}
    </div>
  );
};

export default ImageProduct;
