import { useContext, useEffect, useRef, useState } from "react";
import { OptionsContext } from "../context/OptionsContext";

export const PlayPause = (props: any) => {
  const {volume} = useContext(OptionsContext);
  const [isPlaying, setIsPlaying] = useState(false);

  const audio = useRef(new Audio(props.audio));
  audio.current.volume = volume;

  // Pause audio after leaving the page
  useEffect(() => () => audio.current.pause(), []);

  const onClick = async () => {
    if (isPlaying)
      await audio.current.pause();
    else
      await audio.current.play();
    setIsPlaying(!isPlaying);
  };

  const symbol = isPlaying ? <>&#x23F8;</> : <>&#x23F5;</>;

  return <>
    <button className="playpause" onClick={onClick}>{symbol}</button>
  </>;
}
