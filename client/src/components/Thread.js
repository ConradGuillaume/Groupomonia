import React, { useEffect, useState } from "react";
import Card from "./Posts/Card";
import { isEmpty } from "./Utils";

import { useDispatch, useSelector } from "react-redux";

import { setAllPosts } from "../feature/Posts.slice";

const Thread = () => {
  const [LoadPost, setLoadPost] = useState(true);

  const Posts = useSelector((state) => state.allPosts.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (LoadPost) {
      dispatch(setAllPosts());
      setLoadPost(false);
    }
  }, [LoadPost]);

  Posts && console.log("LES POSTS ARRIVENT LA", Posts);
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
