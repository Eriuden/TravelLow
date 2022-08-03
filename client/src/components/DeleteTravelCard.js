import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTravel } from '../redux/actions/Travel.action'

export default function DeleteTravelCard({travel}) {
  const dispatch = useDispatch()
  const deleteQuote = () => dispatch(deleteTravel(travel.id))
  return (
    <div 
      onClick={() => {
        if (window.confirm('Voulez vous supprimer cet article ?')){
          deleteQuote()
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="" />
      
    </div>
  )
}
