import { useFetchInHomePage, useFilterProductInHome, useProductDetail } from '../../app/hook/ProductHook';
import { Banner } from '../../components/Home/Banner';
import { ProductOverview } from '../../components/Home/ProductOverview';
import { CategoryRoof } from '../../components/Home/CategoryRoof';
import { convertObjectToStringQuery } from '../../app/hook/CommonHook';


export const HomePage = () => {
  const filter = useFilterProductInHome()
  console.log(convertObjectToStringQuery(filter))
  useFetchInHomePage(convertObjectToStringQuery(filter))
  return (
    <div className='py-2'>
      <Banner />
      <CategoryRoof /> 
      <ProductOverview />
    </div>
  )
}
