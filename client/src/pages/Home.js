import React from 'react'
import {useDispatch} from "react-redux"
import { useSelector } from 'react-redux'
import { getAllTravels } from '../redux/actions/Travel.action'
import TravelCard from '../components/TravelCard'


export default function Home() {

  //En fait, on prend l'action directement chez elle
  //Le reducer servira notamment à contenir les données selon leur état actuel
  //C'est pourquoi on fait un reducer travel et un travels
  //Le travels il prends l'état de la liste des destinations
  //Le travel, l'état pour chacune
  //On veut seulement toutes les get
  //Mais on veut en update créer ou détruire qu'une à la fois
  
  const travels = useSelector((state)=> state.travelsReducer)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getAllTravels())
  })

  
  return (
    <div>
      <h2>Tout les témoignages des meilleurs destinations</h2>
      {!isEmpty(travels) && travels.map((travel) => {
          <TravelCard
          travel={travel} 
          key={travel._id} 
          />
        })}
    </div>
  )
}
