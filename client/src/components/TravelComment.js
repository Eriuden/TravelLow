import React from 'react'

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment, getAllTravels } from '../redux/actions/Travel.action';

import { isEmpty, timeStampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

export default function TravelComment({travel}) {

  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.allUsersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.prevenDefault();

    if (text) {
      dispatch(addComment(travel._id, userData._id, text, userData.name))
        .then(() => dispatch(getAllTravels()))
        .then(() => setText(""));
    }
  };

  return (
    <div className='comment-container'>
      {travel.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler idToFollow={comment.commenterId} />
                  )}
                </div>
                <span>{timeStampParser(comment.timeStamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} travelId={travel._id} />
            </div>
          </div>
        );
      })}
    </div>
  )
}
