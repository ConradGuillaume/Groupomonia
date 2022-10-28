import React, { useContext, useEffect } from "react";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Posts/NewPostForm";
import UserFriend from "../components/Profil/UserFriend";
import Thread from "../components/Thread";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    uid && (
      <div className="home">
        <div className="main">
          <div className="home-header"></div>
          {uid && <NewPostForm />}
          {uid && <Thread />}
          {uid && <UserFriend />}
        </div>
      </div>
    )
  );
};

export default Home;
