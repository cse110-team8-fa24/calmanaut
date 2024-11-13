import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Util from "../lib/Util";

type User = {
  username: string,
  createDate: Date,
  id: number,
};

export const ProfileId = (props: any) => {
  const [user, setUser] = useState<User | undefined | false>(undefined);
  const {id} = useParams();
  
  useEffect(() => {
    Util.get("users/" + id, Util.createDateReviver("createDate")).then(res => {
      setUser(res.user);
    }).catch(e => {
      setUser(false);
      console.error(e);
    });
  }, [setUser, id]);

  if (user === false)
    return <p>User not found.</p>;

  if (user === undefined)
    return <h1>Profile</h1>;

  return <>
    <h1>Profile</h1>
    <h2>{user.username}</h2>
    <p>Created on {user.createDate.toLocaleString()}</p>
  </>;
};
