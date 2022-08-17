import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getTravel } from '../redux/actions/travel.action';
import { isEmpty } from '../Utils';
import { updateTravel } from '../redux/actions/travel.action';
import { dateParser } from '../Utils';
import DeleteTravelCard from '../components/DeleteTravelCard';
import LikeButton from '../components/LikeButton';
import TravelComment from '../components/TravelComment';


export default function TravelPage(travel) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = userData(null);
  const [showComments, setShowComments] = userData(false);
  const usersData = useSelector((state) => state.allusersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updateTravel(travel._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    dispatch(getTravel(travel._id))
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  

   /* si userdata n'est pas vide, on arrête le chargement */

  /* Si l'userdata n'est pas vide, on boucle en fonction de si l'id de l'user correspond à l'id du posteur du travel, et on retourne son image
     ainsi sur chaque carte on affiche l'image */

  /* Dans le card right car le return dit fuck aux comments
    On fait pareil avec le pseudo que pour l'image plus haut
    On mets la date selon l'utils prévu pour le format, soit dateParser, et on le calibre sur la date de créa du travel
    
    Si isUpdated est false, on mets juste le message
    Sinon, on mets la zone de texte et le bouton pour valider la modif*/

  return (
    <div>
      <li className="card-container" key={travel._id}>
        {isLoading ? (
          <i className="fas-fa-spinner fa-spin"></i>
        ) : (
          <>
            <div className="card-left">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === travel.posterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="poster-pic"
              />
            </div>

            <div className="card-right">
              <div className="card-header">
                <div className="name">
                  <h3>
                    {!isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === travel.posterId) return user.name;
                          else return null;
                        })
                        .join("")}
                  </h3>      
                </div>
                <span>{dateParser(travel.createAt)}</span>
              </div>
              {isUpdated === false && <p>{travel.message}</p>}
              {isUpdated && (
                <div className="update-post">
                  <textarea
                    defaultValue={travel.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="button-container">
                    <button className="btn" onClick={updateItem}>
                      Valider les modifications
                    </button>
                  </div>
                </div>
              )}
              {travel.picture && (
                <img src={travel.picture} alt="card-pic" className="card-pic" />
              )}

              <p>{travel.message}</p>
              {
                /*
                  Si le post à une image, ben on l'affiche
                  Et pareil pour une vidéo, mais on doit lui définir un certain nombre d'éléments
                  */
                travel.picture && (
                  <img src={travel.picture} alt="card-pic" className='"card-pic' />
                )
              }
              {travel.video && (
                <iframe
                  width="500"
                  height="300"
                  src={travel.video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                          gyroscope: picture-in-picture"
                  allowFullScreen
                  title={travel._id}
                ></iframe>
              )}
              {
                /*
                  Si on est l'auteur du post
                  On peut alors éditer et supprimer le post
                  */
                userData._id === travel.posterId && (
                  <div className="button-container">
                    <div onClick={() => setIsUpdated(!isUpdated)}>
                      <img src="./img/icons/edit.svg" alt="edit" />
                    </div>
                    <DeleteTravelCard id={travel._id} />
                  </div>
                )
              }
              <div className="card-footer">
                <div className="comment-icon">
                  <img
                    onClick={() => setShowComments(!showComments)}
                    src="./img/icons/message1.svg"
                    alt="comment"
                  />
                  <span>{travel.comments.length}</span>
                </div>
                <LikeButton travel={travel} />
                <img src="./img/icons/share.svg" alt="share" />
              </div>
              {showComments && <TravelComment travel={travel} />}
            </div>
          </>
        )}
      </li>
    </div>
  )
}
