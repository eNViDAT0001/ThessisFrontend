import React from "react";
import { useListBanner } from "../../app/hook/BannerHook";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  fade: true,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <NavigateNextIcon style={{ fontSize: "48px", color: "black" }}/>,
  nextArrow: <ArrowBackIosIcon style={{ fontSize: "48px", color: "black" }}/>
};

const imageStyles = {
  height: "700px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export const Banner = () => {
  const listBanner = useListBanner() || [];

  return (
    <div>
      <div className="flex justify-center items-center px-[15%] border hover:shadow-md ">
        <div className="w-full h-full skew-y-3 md:transform-none">
          <Slider {...settings}>
            {listBanner.map((data) => (
              <div key={data.id}>
                <img src={data.image} alt="anh san pham" style={imageStyles}></img>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
