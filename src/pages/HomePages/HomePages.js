
import Banner from "../../components/Home/Banner"
import BannerSmall from "../../components/Home/BannerSmall"
import ProductOverview from "../../components/Home/ProductOverview"
const HomePage = () =>{

    return(
    <div className="flex flex-col bg-[#F5F5FA]">
        <Banner />
        <BannerSmall />
        <ProductOverview />
    </div>)
}

export default HomePage
