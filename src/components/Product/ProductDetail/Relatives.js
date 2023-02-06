import relative1 from "../../../assets/relative1.png";
import relative2 from "../../../assets/relative2.png";
import relative3 from "../../../assets/relative3.png";
import relative4 from "../../../assets/relative4.png";
import Rating from "react-rating";
import starActive from "../../../assets/star.png";
import starNotActive from "../../../assets/star_not.png";
const Relative = [
  {
    id: 7,
    name: "Mens Fashion Wear",
    cost: 51.0,
    star: 4,
    img: relative1,
  },
  {
    id: 8,
    name: "Women’s Fashion",
    cost: 67.0,
    star: 5,
    img: relative2,
  },
  {
    id: 9,
    name: "Wolx Dummy Fashion",
    cost: 67.0,
    star: 4,
    img: relative3,
  },
  {
    id: 10,
    name: "Top Wall Digital Clock",
    cost: 51.0,
    star: 3,
    img: relative4,
  },
];

const Relatives = () => {

  const goToOtherProduct = (e)=>{
    window.location.replace(`/product/${e.currentTarget.id}`)
  }
  return (
    <div className="w-full flex justify-center my-20">
      <div className="flex justify-center">
        <div className=" w-full flex justify-start flex-col">
          <h1 className=" text-3xl text-purple-text-relatives">
            Relatives Product
          </h1>
          <div className="flex flex-row mt-24 space-x-7">
            {Relative.map((data) => (
              <div
                id={data.id}
                onClick={goToOtherProduct}
                className="w-270px h-404px flex flex-col border hover:shadow-md hover:scale-110"
              >
                <img
                  className="w-full h-340px mb-4"
                  src={data.img}
                  alt="image relative"
                ></img>
                <div className="flex flex-row ">
                  <div className="flex flex-col space-y-auto text-purple-text ">
                    <h1 className="">{data.name}</h1>
                    <h1 className=" text-xs font-medium">
                      ${data.cost.toFixed(2)}
                    </h1>
                  </div>
                  <Rating
                    className=" ml-auto"
                    emptySymbol={
                      <img
                        src={starNotActive}
                        alt="starNotDisable"
                        className="w-3 h-3 mr-1"
                      />
                    }
                    fullSymbol={
                      <img
                        src={starActive}
                        alt="starDisable"
                        className="w-3 h-3 mr-1"
                      />
                    }
                    readonly={true}
                    initialRating={data.star}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relatives;
