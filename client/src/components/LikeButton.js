
import React, { useContext, useEffect, useState } from 'react'
import { uidContext } from './AppContext'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { likeTravel, unlikeTravel } from '../redux/actions/travel.action'
import { useDispatch } from 'react-redux'

export default function LikeButton({travel}) {

  const [liked, setLiked] = useState(false)
    const uid = useContext(uidContext)
    const dispatch = useDispatch()

    //les travel.untel sont des React props
    //en effet like button est marqué likebutton travel={travel.id} de la même manière que dans delete, il comprendra donc ca veut dire quoi la props
    const like = () => {
        dispatch(likeTravel(travel._id, uid))
        setLiked(true)
    }
    const unLike = () => {
        dispatch(unlikeTravel(travel._id, uid))
        setLiked(false)
    }


    useEffect(() => {
        if (travel.likers.includes(uid)) setLiked(true)
        else setLiked(false)
    }, [uid, travel.likers, liked])

  return (
    <div>
      
    </div>
  )
}
