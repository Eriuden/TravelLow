import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_All_USERS = "GET_ALL_USERS"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const UPDATE_BIO = "UPDATE_BIO"
export const DELETE_USER = "DELETE_USER"

export const GET_USER_ERRORS= "GET_USER_ERRORS"

//une const d'action redux est toujours écrite ainsi
// on retourne avec en param dispatch
//on retourne ici axios car on fait appel à une requète du back
//on inscrit donc l'appel de requète en axios
// en promesse, on fait le dispatch de redux
//qui a pour type une const comme au dessus qui donne son nom à l'action
//puis le payload qui contient les données de l'objet qui nous intéresse
//comme on a d'abord read l'user, c'est ici l'user
//j'aurais mis la requète des postes, il aurait les données des postes

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
        //dans le cas d'un get, le param est entres accolades
            .get(`${process.env.REACT_APP_API_URL}api/users/${uid}`)
            .then((res) => {
                dispatch({type: GET_USER, payload: res.data})
            })
            .catch((err) => console.log(err))
    }
}

export const getAllUsers = () => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}api/users`)
        .then((res) => {
          dispatch({ type: GET_All_USERS, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };

export const uploadPicture = (data,id) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/users/upload`, data)
            .then((res) => {
                if (res.data.errors) {
                    dispatch({ type: GET_USER_ERRORS, payload: res.data.errors})
                } else {
                    dispatch ({ type: GET_USER_ERRORS, payload:""})
                    return axios
                    .get(`${process.env.REACT_APP_API_URL}api/users/${id}`)
                    .then((res) => {
                        dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture})
                    })
                } 
            })
            .catch((err) => console.log(err))
        }
}

export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios({
            //méthode pour update: put
            // on prends la requète de read des user, et on précise qu'on veut la bonne id
            // data = req.body, et on passe le paramètre
            //cette fois, pas besoin de get en fin, on modifie, comme dirait Laviosier...
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/users/` + userId,
            data: { bio }
        })
            .then((res) => {
                dispatch({type: UPDATE_BIO , payload:bio})
            })
            .catch((err) => console.log(err))
    }
}

export const deleteUser = (userId, name, email, password, bio) => {
    return (dispatch) => {
      return axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/users/${userId}`,
        data: { name, email, password, bio },
      })
        .then((res) => {
          dispatch({ type: DELETE_USER, payload: { userId } });
        })
        .catch((err) => console.log(err));
    };
}
