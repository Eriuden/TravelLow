import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment, editComment } from '../redux/actions/travel.action'
import { uidContext } from './AppContext'


export default function EditDeleteComment({comment, travelId}) {

  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(false);
  const uid = useContext(uidContext)
  const dispatch = useDispatch();


  const handleEdit = (e) => {
    e.preventDefault();

    //Avec useDispatch, on peut accéder a la fonction dispatch de Redux, c'est pourquoi on appelle d'abord la variable où il est contenue
    //Puis l'action , avec en paramètres les éléments postId (le nom de la props lors de l'appel du composant dans CardComment)
    //, pour savoir quel est le post du comment, puis l'id du comment pour le trouver, puis le text pour le modifier
    if (text) {
      dispatch(editComment(travelId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  //Ici plus besoin du text, on veut détruire le commentaire complet, donc, faut juste le repérer
  const handleDelete = () => {
    dispatch(deleteComment(travelId, comment._id));
  };

  //Pour placer en true le author, si l'uid correspond à l'id du commentateur du commentaire
  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);
  
  return (
    <div>
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("voulez vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="img/icons/trash.svg" alt="" />
            </span>
          </div>
          <input type="submit" value="valider les modifications" />
        </form>
      )}
    </div>
  )
}
