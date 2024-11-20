import { createContext, useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "./AuthorizationContext";

import * as Util from "../lib/Util";

type ContextType = {
  imageKey: string;
  setImageKey: (key: string) => Promise<void>,

  musicKey: string;
  setMusicKey: (key: string) => Promise<void>,
};

const initialState: ContextType = {
  imageKey: "forest",
  setImageKey: async () => {},

  musicKey: "forest",
  setMusicKey: async () => { },
};

export const OptionsContext = createContext<ContextType>(initialState);

export const OptionsProvider = (props: any) => {
  const {isLoggedIn} = useContext(AuthorizationContext);

  const [imageKey, setImageKey] = useState(initialState.imageKey);
  const [musicKey, setMusicKey] = useState(initialState.musicKey);

  const setImageKeyImpl = async (key: string) => {
    setImageKey(key);

    if (isLoggedIn !== true)
      return;

    const res = await Util.put("options", { imageKey: key });
    if (res.status >= 400)
      console.error(res.status + ": " + await res.text());
  }

  const setMusicKeyImpl = async (key: string) => {
    setMusicKey(key);

    if (isLoggedIn !== true)
      return;

    const res = await Util.put("options", { musicKey: key });
    if (res.status >= 400)
      console.error(res.status + ": " + await res.text());
  }

  useEffect(() => {
    if (isLoggedIn !== true)
      return;

    Util.get("options").then(res => {
      if (res.imageKey !== undefined)
        setImageKey(res.imageKey);
      if (res.musicKey !== undefined)
        setMusicKey(res.musicKey);
    }).catch(console.error);
  }, [isLoggedIn, setImageKey, setMusicKey]);

  return <>
    <OptionsContext.Provider
      value={{
        imageKey: imageKey,
        setImageKey: setImageKeyImpl,
        musicKey: musicKey,
        setMusicKey: setMusicKeyImpl,
      }}
    >
      {props.children}
    </OptionsContext.Provider>
  </>
};
