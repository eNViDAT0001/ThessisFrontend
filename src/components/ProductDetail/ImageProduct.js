import React, { useState } from "react";
import { useImageProduct } from "../../app/hook/ProductHook";

const imgNotFound =
  "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";
export const ImageProduct = () => {
  const listMedia = useImageProduct() || [];
    const [imageBig,setImageBig] = useState()

  const handleClickImage = (e) =>{
    const id = e.currentTarget.id;
    const GetMediaFromId = listMedia.filter((data) => data.id == id);
    setImageBig(GetMediaFromId[0].media_path);
  }
  return (
    <div className="w-full flex flex-col space-y-4 p-2">
      {listMedia.length === 0 ? (
        <div>
          <img
            src={imgNotFound}
            alt="Anh loi"
            className="w-full max-h-[450px]"
          ></img>
        </div>
      ) : (
        <div>
          <img
            src={imageBig ? imageBig : listMedia[0].media_path}
            alt="Anh san pham"
            className="w-full h-[450px]"
          ></img>
          <div className="flex flex-row w-full flex-wrap">
            {listMedia.map((data) => (
              <img
                src={data.media_path}
                id={data.id}
                alt="Anh san pham"
                className="w-[29%] m-2 hover:border-[#0D134E] hover:border-4 "
                onClick={handleClickImage}
              ></img>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
