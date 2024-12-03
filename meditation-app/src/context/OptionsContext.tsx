import { createContext, useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "./AuthorizationContext";

import * as Util from "../lib/Util";

type ContextType = {
  imageKey: string;
  setImageKey: (key: string) => Promise<void>;

  musicKey: string;
  setMusicKey: (key: string) => Promise<void>;

  volume: number;
  setVolume: (v: number) => void;
};

const initialState: ContextType = {
  imageKey: "forest",
  setImageKey: async () => {},

  musicKey: "forest",
  setMusicKey: async () => { },

  volume: 1,
  setVolume: () => { },
};

export const OptionsContext = createContext<ContextType>(initialState);

export const OptionsProvider = (props: any) => {
  const {isLoggedIn} = useContext(AuthorizationContext);

  const [imageKey, setImageKey] = useState(initialState.imageKey);
  const [musicKey, setMusicKey] = useState(initialState.musicKey);
  const [volume, setVolume] = useState(initialState.volume);

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

  const setVolumeImpl = (v: number) => {
    setVolume(v);
    localStorage.setItem("volume", v.toString());
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

  useEffect(() => {
    setVolume(Number.parseFloat(localStorage.getItem("volume") || "1"));
  }, [setVolume]);

  return <>
    <OptionsContext.Provider
      value={{
        imageKey: imageKey,
        setImageKey: setImageKeyImpl,
        musicKey: musicKey,
        setMusicKey: setMusicKeyImpl,
        volume: volume,
        setVolume: setVolumeImpl,
      }}
    >
      {props.children}
    </OptionsContext.Provider>
  </>
};
