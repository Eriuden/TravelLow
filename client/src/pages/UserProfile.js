import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../redux/actions/user.action'
import { updateBio } from '../redux/actions/user.action'
import { deleteUser } from '../redux/actions/user.action'
import { useContext } from 'react'

export default function UserProfile() {

  const [bio, setBio] = useState('')
  const [name, setName] = useState('')
  const [picture, setPicture] = useState(null)
  const [updateForm, setUpdateForm] = useState(false)

  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer)
  const error = useSelector((state) => state.errorReducer)

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio, name, picture))
    setUpdateForm(false)
  }

  const uid = useContext(UidContext)

  useEffect(()=> {
    dispatch(getUser(user._id))
  })

  return (

    <div>
      {uid ? (
          <div className="profil-container">

            <h1> Profil de {userData.pseudo}</h1>

            <div className="update-container">

                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />
                    <p>{error.maxSize}</p>
                    <p>{error.format}</p>
                    
                </div>

                <div className="right-part">

                  <div className="bio-update">

                    <h3>Bio</h3>
                    {/* Qu'on clique sur la bio direct ou le bouton, on inverse la valeur de setUpdateForm*/
                      updateForm === false && (
                      <>
                        <h2 onClick={() => setUpdateForm(!updateForm)}>{userData.name}</h2>
                        <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                        <img onClick={()=> setUpdateForm(!updateForm)}>{userData.picture}</img>
                        <button onClick={() =>setUpdateForm(!updateForm)}>Modifier vos informations</button>
                      </>
                    )}
                    {/*Si updateForm est true, alors on affiche la zone de texte avecle bouton de modif de la bio*/
                      updateForm &&(
                      <>
                        <input type="text" defaultValue={userData.name}onChange={(e)=>setName(e.target.value)} />
                        <textarea type="text" defaultValue={userData.bio}onChange={(e) => setBio(e.target.value)}>
                        <input type="file" defaultValue={userData.picture}onChange={(e) => setPicture(e.target.value)}/>
                        </textarea>
                        
                        <button onClick={handleUpdate}>Valider la modification</button>
                      </>
                    )}

                  </div>
                </div>
            </div>
        </div>
        ) : ( 
          <h2>Vous n'êtes pas autorisé à voir ces informations</h2>
      )}
    </div>

  )
}
