import { useEffect, useRef, useState } from "react";

export const PlayPause = (props: any) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audio = useRef(new Audio(props.audio));

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
