import axios from "axios";

export const GET_ALL_TRAVELS = "GET_ALL_TRAVELS";
export const GET_TRAVEL = "GET_TRAVEL";
export const GET_TRAVEL_ERRORS = "GET_TRAVEL_ERRORS";
export const UPDATE_TRAVEL = "UPDATE_TRAVEL";
export const DELETE_TRAVEL = "DELETE_TRAVEL";

export const LIKE_TRAVEL = "LIKE_TRAVEL"
export const UNLIKE_TRAVEL = "UNLIKE_TRAVEL"

export const ADD_COMMENT = "ADD_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"

/*
 Les explications dont je parlais en reducer
 On exporte déjà chacune, le nom de const en majuscule
 la valeur sera une string reprenant le nom
 ca servira pour le type, (le fameux action.type en param du reducer)
 Du coup, pour chaque action
 export const nomquondonne
 return(dispatch) fonction fléchée
 return axios (l'ajax de react)
 .l'opération à effectuer en axios (get, post, put, delete, patch)
 on lui donne l'url
 .then(donc on lui demande une promesse)
 on met toujours en param de then res
 on dispatch le type, donc la const à string en haut
 le payload est ce que vise l'action
 par ex pour get, on lui demande les données du résultat
 update, il doit modifier les champs donc va les viser
 et delete, il vise l'id pour repérer et supprimer

*/

export const getAllTravels = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/travels`)
      .then((res) => {
        dispatch({ type: GET_ALL_TRAVELS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getTravel = () => {
  return (dispatch) => {
    return axios

      .get(`${process.env.REACT_APP_API_URL}api/travels/:id`)
      .then((res) => {
        dispatch({ type: GET_TRAVEL, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addTravel= (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/travels/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_TRAVEL_ERRORS, payload: res.data.errors });
        }
      });
  };
};

export const updateTravel = (
  travelId,
  name,
  message,
  
) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/travels/${travelId}`,
      data: { message },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_TRAVEL,
          payload: { name, message},
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteTravel = (
  travelId,
  name,
  message,
  
) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/travels/${travelId}`,
      data: {  name, message },
    })
      .then((res) => {
        dispatch({ type: DELETE_TRAVEL, payload: { travelId } });
      })
      .catch((err) => console.log(err));
  };
};

export const likeTravel = (travelId, userId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}/api/travels/like-travel/` + travelId,
            data: { id: userId }
        })
        .then((res) => {
            dispatch({type: LIKE_TRAVEL, payload:{travelId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const unlikeTravel = (travelId, userId) => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}/api/travels/unlike-travel/` + travelId,
            data: { id: userId}
        })
        .then((res) => {
            dispatch({type: UNLIKE_TRAVEL, payload: {travelId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const addComment = (travelId, commenterId, text, commenterName) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/travels/comment-travel/${travelId}`,
            data:{commenterId, text, commenterName},
        })
        .then((res) => {
            dispatch({ type: ADD_COMMENT, payload: {travelId} })
        })
        .catch((err) => console.log(err))
    }
}

export const editComment = (travelId, commentId, text) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/travels/edit-comment-travel/${travelId}`,
            data:{commentId, text},
        })
        .then((res) => {
            dispatch({ type: EDIT_COMMENT, payload: {travelId, commentId, text} })
        })
        .catch((err) => console.log(err))
    }
}

export const deleteComment = (travelId, commentId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/travels/delete-comment-travel/${travelId}`,
            data:{commentId},
        })
        .then((res) => {
            dispatch({ type: DELETE_COMMENT, payload: {travelId, commentId} })
        })
        .catch((err) => console.log(err))
    }
}