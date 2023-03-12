import { useFetchInHomePage, useProductDetail } from '../../app/hook/ProductHook';
import { Banner } from '../../components/Home/Banner';
import { ProductOverview } from '../../components/Home/ProductOverview';
import { CategoryRoof } from '../../components/Home/CategoryRoof';


export const HomePage = () => {
  useFetchInHomePage()
  return (
    <div className='py-2'>
      <Banner />
      <CategoryRoof /> 
      <ProductOverview />
    </div>
  )
}
