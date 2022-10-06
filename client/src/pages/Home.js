import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Posts/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header"></div>
        {uid && <NewPostForm />}
        {uid && <Thread />}
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
