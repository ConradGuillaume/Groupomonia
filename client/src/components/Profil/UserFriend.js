import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import FollowHandler from "./FollowHandler";
import axios from "axios";
import { setUsers } from "../../feature/users.slice";

const UserFriend = () => {
  const usersData = useSelector((state) => state.allUsers.users);
  const userData = useSelector((state) => state.getUsers.getUsers);
  const [Count, setCount] = useState(5);
  const uid = useContext(UidContext);
  if (usersData) {
    const data = usersData.slice(0, Count);
    console.log(data);
    const count = () => {
      setCount(Count + 5);
    };
    const discount = () => {
      setCount(Count - 5);
    };
    return (
      <div className="container">
        <div className=" date-bis">
          <iframe
            className="date"
            width="280"
            height="158"
            marginHeight="0"
            marginWidth="0"
            frameBorder="0"
            scrolling="no"
            comment="/*defined*/"
            src="https://dayspedia.com/if/digit/?v=1&iframe=eyJ3LTEyIjpmYWxzZSwidy0xMSI6dHJ1ZSwidy0xMyI6dHJ1ZSwidy0xNCI6ZmFsc2UsInctMTUiOmZhbHNlLCJ3LTExMCI6ZmFsc2UsInctd2lkdGgtMCI6ZmFsc2UsInctd2lkdGgtMSI6dHJ1ZSwidy13aWR0aC0yIjpmYWxzZSwidy0xNiI6IjE2cHggMTZweCAyNHB4Iiwidy0xOSI6IjQ4Iiwidy0xNyI6IjE2Iiwidy0yMSI6dHJ1ZSwiYmdpbWFnZSI6LTEsImJnaW1hZ2VTZXQiOmZhbHNlLCJ3LTIxYzAiOiIjMDAwMDAwIiwidy0wIjp0cnVlLCJ3LTMiOnRydWUsInctM2MwIjoiIzM0MzQzNCIsInctM2IwIjoiMSIsInctNiI6IiNmZGZjZmMiLCJ3LTIwIjp0cnVlLCJ3LTQiOiIjMDA3ZGJmIiwidy0xOCI6ZmFsc2UsInctd2lkdGgtMmMtMCI6IjMwMCIsInctMTE1IjpmYWxzZX0=&lang=fr&cityid=1020"
          ></iframe>
        </div>
        {userData && usersData && (
          <ul className="friends">
            <h1>utilisateurs</h1>
            <br />
            {data.map((user) => {
              return (
                <>
                  {uid === user._id ? (
                    <li className="connected" key="id">
                      <img src={user.picture} alt="pic" />
                      <h4>{user.pseudo}</h4>
                      {uid !== user._id && (
                        <FollowHandler
                          id="glow"
                          idToFollow={user._id}
                          type={"suggestion"}
                        />
                      )}
                    </li>
                  ) : (
                    <li className="disconnected" key="id">
                      <img src={user.picture} alt="pic" />
                      <h4>{user.pseudo}</h4>
                      <FollowHandler
                        id="glow"
                        idToFollow={user._id}
                        type={"suggestion"}
                      />
                    </li>
                  )}
                </>
              );
              //}
            })}
            <div className="more-users-container">
              <span className="more-users" onClick={count}>
                +
              </span>
              <span className="more-users" onClick={discount}>
                -
              </span>
            </div>
          </ul>
        )}
      </div>
    );
  }
};

export default UserFriend;
