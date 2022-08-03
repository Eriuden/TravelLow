import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTravel, getTravels } from '../redux/actions/Travel.action'
import { isEmpty, timeStampParser } from '../Utils'

export default function NewTravelForm() {
  const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [picture, setPicture] = useState(null)
    const [video, setVideo] = useState("")
    const[file, setFile] = useState()
    const userData= useSelector((state) => state.userReducer)
    const errors = useSelector((state) => state.errorReducer.travelError)
    const dispatch = useDispatch()

    const handlePicture = (e) => {
      setPicture(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
      setVideo('')
    }

    const handleTravel = () => {
      async () => {
          if (message || picture || video) {
            const data = new FormData()
            data.append('posterId', userData._id)  
            data.append('message', message)
            if (file)data.append("file", file)
            data.append('video', video)
            
            await dispatch(addTravel(data))
            dispatch(getTravels())
            cancelTravel()
            
          } else {
            alert("veuillez entrer un message")
          }

      }
    }

    const handlevideo = () => {
      let findLink = message.split(" ")
      for(let i =0; i< findLink; i++) {
          if(findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout') ) {
              let embed = findLink[i].replace('watch?v=', "embed/")
              setVideo(embed.split('&')[0])
              findLink.splice(i, 1)
              setMessage(findLink.join(" "))
              setPicture('')
          }
      }
  }

  //On remet la valeur du contenu en vide

  const cancelTravel = () => {
      setMessage("")
      setPicture("")
      setVideo("")
      setFile("")
  }

  useEffect(() => {
    if (!isEmpty(userData)) 
        setIsLoading(false)
        handlevideo()
  }, [userData, message, video])


  return (
    <div>
      {isLoading ? (
            <i className='fas fa-spinner fa-pulse'></i>
        ) : (
            <>
                

                <Link to={"/profil"}>
                    <div className="user-info">
                        <img src={userData.picture} alt="user-img" />
                    </div>
                </Link>

                <div className="travel-form">
                    <textarea name="message" id="message" 
                    placeholder='Quoi de neuf' 
                    onChange={(e) => setMessage(e.target.value)}
                    value={message} 
                    />
                    {message || picture || video.length > 20 ? (
                        <li className="card-container">
                            <div className="card-left">
                                <img src={userData.picture} alt="user-pic" />
                            </div>
                            <div className="card-right">
                                <div className="card-header">
                                    <div className="name">
                                        <h3>{userData.name}</h3>
                                    </div>
                                    <span>{timeStampParser(date.now())}</span>
                                </div>
                                <div className="content">
                                    <p>{message}</p>
                                    <img src={picture} alt="" />
                                    {video && (
                                        <iframe
                                        src={video}
                                        frameBorder="0"
                                        allow='accelerometer; autoplay; clipboard-write;
                                        encrypted-media; gyroscope; picture-in-picture'
                                        allowFullScreen
                                        title={video}></iframe>
                                    )}
                                </div>
                            </div>
                        </li>
                    ) : null}
                
                    <div className="footer-form">
                        <div className="icon">
                            {isEmpty(video) && (
                                <>
                                <img src="./img/icons/picture.svg" alt="img" />
                                <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg .png /"
                                onChange={(e) => handlePicture(e)} />
                                </>
                            )}
                            {video && (
                                <button onClick={() => setVideo("")}>Supprimer la vidéo</button>
                            )}
                        </div>
                        {!isEmpty(errors.format) && <p>{errors.format}</p>}
                        {!isEmpty(errors.maxSize) && <p>{errors.maxSize}</p>}

                        <div className="btn-send">
                            {message || picture ||video.length > 20 ? (
                                <button className='cancel' onClick={cancelTravel}>Annuler message</button>
                            ) : null}

                            <button className='send' onClick={handleTravel}>Envoyer</button>
                            
                            
                        </div>
                    </div>
                </div>
            </>
        )}
    </div>
  )
}
