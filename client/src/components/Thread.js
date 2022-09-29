import React, { useEffect, useState } from "react";
import Card from "./Posts/Card";
import { isEmpty } from "./Utils";
import axios from "axios";
import { useSelector } from "react-redux";

const Thread = () => {
  //const posts = useSelector((state) => state.allPosts.posts);
  //console.log("LES POSTs SONT LA", posts);

  const [Posts, setPosts] = useState("");

  axios
    .get(`${process.env.REACT_APP_API_URL}api/post`)
    .then((res) => setPosts(res.data))
    .catch((err) => console.log(err));

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(Posts) &&
          Posts.map((post) => {
            return <Card post={post} key={post._i} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
