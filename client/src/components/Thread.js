import React, { useEffect, useState } from "react";
import Card from "./Posts/Card";
import { isEmpty } from "./Utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../feature/Posts.slice";

const Thread = () => {
  const [LoadPost, setLoadPost] = useState(true);
  const [Count, setCount] = useState(5);
  const Posts = useSelector((state) => state.allPosts.posts);
  const dispatch = useDispatch();

  /* Fonction qui va donner l'ordre a la BDD d'envoyer 5 post en plus en arrivant en bas de la barre de scroll */
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  /* envoie de la requête de 5 post supplémentaire 
  puis mise à jour du store Redux */
  useEffect(() => {
    if (LoadPost) {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/post?p=${Count}`)
        .then((res) => {
          dispatch(setAllPosts(res.data));
        });
      setLoadPost(false);
      setCount(Count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [LoadPost, Count, dispatch]);

  return (
    <div className="thread-container">
      {/* MAP des posts pour afficher dans le fil d'actualité   */}
      <ul>
        {!isEmpty(Posts) &&
          Posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
