import Rating from "react-rating";
import { ratingItem } from "../../../dummy_database/CategoryDummyDatabase";
import starActive from "../../../assets/star.png";
import starNotActive from "../../../assets/star_not.png";
import { useDispatch, useSelector } from "react-redux";
import { setNumberRating } from "../../../store/slices/ProductSlice";

const RatingItem = () => {
  const dispatch = useDispatch();
  const ratingSelector = useSelector((state) => state.product.numberRatingInCategory);
  const handleCheckRating = (e) => {
    if(ratingSelector==e.target.value)    dispatch(setNumberRating(0));
    else dispatch(setNumberRating(e.target.value));
  };
  return (
    <div className="flex flex-col justify-start items-start w-52 ">
      <h1 className=" font-normal text-xl text-purple-text underline underline-offset-4 mt-27px mb-17px">
        Rating item
      </h1>
      <div>
        {ratingItem.map((rating) => (
          <div key={rating.id} className="flex flex-row items-center mb-2">
            <input
              id={rating.id}
              value={rating.star}
              type="checkbox"
              onChange={handleCheckRating}
              checked={ratingSelector==rating.star}
              className=" w-4 h-4 mr-9px accent-yellow-check-rating-item"
            />
            <Rating
              emptySymbol={
                <img
                  src={starNotActive}
                  alt="starNotDisable"
                  className="w-4 h-4 mr-1"
                />
              }
              fullSymbol={
                <img
                  src={starActive}
                  alt="starDisable"
                  className="w-4 h-4 mr-1"
                />
              }
              readonly={true}
              initialRating={rating.star}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingItem;
