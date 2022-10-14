import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./feature/user.slice";
import { setAllPosts } from "./feature/Posts.slice";
import { setUsers } from "./feature/users.slice";

const App = () => {
  const [uid, SetUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          SetUid(res.data);
        })
        .catch((err) => console.log("no token"));
    };
    fetchToken();
    if (uid) {
      ////////////////////APELLE DE LA DATA USER
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        .then((res) => {
          dispatch(setUserData(res.data));
        });
      axios.get(`${process.env.REACT_APP_API_URL}api/post?p=5`).then((res) => {
        dispatch(setAllPosts(res.data));
      });

      axios.get(`${process.env.REACT_APP_API_URL}api/user`).then((res) => {
        dispatch(setUsers(res.data));
      });
    }
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
