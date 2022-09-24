import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./feature/user.slice";
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
          console.log(res.data);
          SetUid(res.data);
        })
        .catch((err) => console.log("no token"));
    };
    fetchToken();
    if (uid) {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        .then((res) => dispatch(setUserData(res.data)));
    }
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
