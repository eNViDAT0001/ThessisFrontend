import React from 'react'
import HeaderBar from '../../components/Common/HeaderBar'
import { BannerDetail } from '../../components/Home/BannerDetail'
import { useParams } from 'react-router-dom'
import { useFetchBannerDetail } from '../../app/hook/BannerHook'

export const BannerDetailPage = () => {
    const {id} = useParams()

    useFetchBannerDetail(id)
  return (
    <div>
    <HeaderBar name1="Home . Banner" name2=" . Detail" />
    <div className="flex flex-col justify-center px-[15%] space-y-4 mt-4 mb-10">
      <BannerDetail />{" "}
    </div>
  </div>
  )
}
