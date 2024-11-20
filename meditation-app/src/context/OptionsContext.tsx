import { createContext, useState } from "react";

type ContextType = {
  musicKey: string;
  setMusicKey: React.Dispatch<React.SetStateAction<string>>,
};

const initialState: ContextType = {
  musicKey: "forest",
  setMusicKey: () => { },
};

export const OptionsContext = createContext<ContextType>(initialState);

export const OptionsProvider = (props: any) => {
  const [musicKey, setMusicKey] = useState(initialState.musicKey);

  return <>
    <OptionsContext.Provider
      value={{
        musicKey: musicKey,
        setMusicKey: setMusicKey,
      }}
    >
      {props.children}
    </OptionsContext.Provider>
  </>
};
