import React from "react";
import { useSelector } from "react-redux";
import Card from "./Posts/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const posts = useSelector((state) => state.allPosts.posts);
  console.log(posts);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts) &&
          posts.map((post) => {
            return <Card post={post} key={post._i} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
