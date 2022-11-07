import React, { useContext} from "react";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Posts/NewPostForm";
import UserFriend from "../components/Profil/UserFriend";
import Thread from "../components/Thread";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    uid && (
      <div className="home">
        {uid ? (
          <div className="main">
            <div className="home-header"></div>
            <NewPostForm />
            <Thread />
            <UserFriend />
          </div>
        ) : (
          (window.location = "/profil")
        )}
      </div>
    )
  );
};

export default Home;
