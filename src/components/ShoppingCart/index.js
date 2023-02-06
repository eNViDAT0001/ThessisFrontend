import ListCart from "./ListCart"
import CartTotal from "./CartTotal"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { resetCart } from "../../store/slices/CartSlice"

const ShoppingCart = () => {
    const dispatch = useDispatch()
    useEffect(()=>()=>{
        dispatch(resetCart())
    },[dispatch])
    return(
    <div className="flex justify-center mt-10 font-['Poppins_Bold']">
        <div className="w-[80%] flex justify-start flex-col">
            <h1>Home {`>`} ShoppingCart</h1>
            <div className="flex flex-row flex-wrap justify-between mt-14">
                <ListCart  />
                <CartTotal />
            </div>
          
        </div>
    </div>)
}

export default ShoppingCart