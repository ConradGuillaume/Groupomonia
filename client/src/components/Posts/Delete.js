import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../feature/Posts.slice";

const Delete = (props) => {
  const disptach = useDispatch();
  const postId = props.id;

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          axios
            .delete(`${process.env.REACT_APP_API_URL}api/post/${postId}`)
            .then((res) => disptach(deletePost({ postId })))
            .catch((err) => console.log(err));
        }
      }}
    >
      <img src="./img/delete.png" alt="delete" />
    </div>
  );
};

export default Delete;
