import ImageProduct from "./ImageProduct";
import TitleAndType from "./Title_Type_Price";
import HandleQuantityAndCart from "./HandleQuantityAndCart";
const ProductBasicInformation = (props) => {
  return (
    <div className="flex justify-center border p-5 my-10 max-w-[1000px] bg-white">
      <div className=" flex flex-row space-x-10">
          <ImageProduct id={props.id} />
        <div className="min-w-[450px]">
          <TitleAndType id={props.id} />
          <HandleQuantityAndCart id={props.id} />
        </div>
      </div>
    </div>
  );
};
export default ProductBasicInformation;
