import React from 'react'
import { useParams } from 'react-router-dom'
import { LeftTabNavigation } from '../../components/Admin/LeftTabNavigation '

export const AdminPage = () => {
    const {id} = useParams()
  return (
    <div>
        <LeftTabNavigation />
    </div>
  )
}
