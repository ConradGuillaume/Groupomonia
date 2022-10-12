import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty, timestampParser } from "../Utils";
import axios from "axios";
import { addPost, setAllPosts } from "../../feature/Posts.slice";

const NewPostForm = () => {
  const [IsLoading, setIsLoading] = useState(true);
  const [Message, setMessage] = useState("");
  const [PostPicture, setPostPicture] = useState(null);
  const [Video, setVideo] = useState("");
  const [File, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.getUsers.getUsers);
  //dispatch(setAllPosts());
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const handlePost = async () => {
    if (Message || PostPicture || Video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", Message);
      if (File) data.append("file", File);
      data.append("video", Video);
      await axios
        .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      // await dispatch(addPost({ id, Message, File, Video }));
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) => dispatch(setAllPosts(res.data)));
      cancelPost();
    } else {
      alert("entrez un message");
    }
  };
  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };
  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLink = Message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [userData, Message, Video]);

  return (
    <div className="post-container">
      {IsLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>{" "}
              Abonnement
              {userData.following && userData.following.length > 1 ? "s" : null}
            </p>
            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
              Abonné
              {userData.followers && userData.followers.length > 1 ? "s" : null}
            </p>
          </div>
          <NavLink to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-picture" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={Message}
            ></textarea>
            {Message || PostPicture || Video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="userPic" />
                </div>
                <div children="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{Message}</p>
                    <img src={PostPicture} alt="" />
                    {Video && (
                      <iframe
                        src={Video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={Video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(Video) && (
                  <>
                    <img src="./img/image.png" alt="picture" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {Video && (
                  <button onClick={() => setVideo("")}>Supprimer Video</button>
                )}
              </div>
              <div className="btn-send">
                {Message || PostPicture || Video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
