import React, { useEffect, useState } from "react";
import Card from "./Posts/Card";
import { isEmpty } from "./Utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setAllPosts } from "../feature/Posts.slice";

const Thread = () => {
  const [LoadPost, setLoadPost] = useState(true);
  const [Count, setCount] = useState(5);
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };
  const Posts = useSelector((state) => state.allPosts.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (LoadPost) {
      axios.get(`${process.env.REACT_APP_API_URL}api/post`).then((res) => {
        const array = res.data.slice(0, Count);
        dispatch(setAllPosts(array));
      });
      setLoadPost(false);
      setCount(Count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [LoadPost]);

  return (
    <div className="thread-container">
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
