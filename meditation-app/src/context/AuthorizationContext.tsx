import { createContext, useEffect, useState } from "react";
import * as Util from "../lib/Util";

type ContextType = {
  isLoggedIn: boolean | undefined,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>,

  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,

  id: number,
  setId: React.Dispatch<React.SetStateAction<number>>,
};

const initialState: ContextType = {
  isLoggedIn: undefined,
  setIsLoggedIn: () => { },

  username: "",
  setUsername: () => { },

  id: -1,
  setId: () => { },
};

export const AuthorizationContext = createContext<ContextType>(initialState);

export const AuthorizationProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const [username, setUsername] = useState(initialState.username);
  const [id, setId] = useState(initialState.id);

  useEffect(() => {
    Util.get("users").then(res => {
      const user = res.user;

      const username: string = user.username;
      const id: number = user.id;

      setIsLoggedIn(true);
      setUsername(username);
      setId(id);
    }).catch(e => {
      setIsLoggedIn(initialState.isLoggedIn);
      setUsername(initialState.username);
      setId(initialState.id);
      console.error(e);
    });
  }, [isLoggedIn]);

  return <>
    <AuthorizationContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        username: username,
        setUsername: setUsername,
        id: id,
        setId: setId,
      }}
    >
      {props.children}
    </AuthorizationContext.Provider>
  </>;
};
