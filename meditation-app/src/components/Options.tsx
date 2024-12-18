import "../styles/Options.css";

import { PlayPause } from './PlayPause';
import { useContext } from "react";
import { OptionsContext } from "../context/OptionsContext";

type OptionsType = {
  [key: string]: { title: string, audio: string, image: string },
};

const p = process.env.PUBLIC_URL;

const OptionsMap: OptionsType = {
  "forest": {
      title: "Forest",
      audio: p + "/options/forest-163012.mp3",
      image: p + "/options/kalen-emsley-_LuLiJc1cdo-unsplash.jpg",
  },
  "ocean": {
      title: "Ocean",
      audio: p + "/options/ocean-245607.mp3",
      image: p + "/options/pexels-kellie-churchman-371878-1001682.jpg",
  },
  "sky": {
      title: "Sky",
      audio: p + "/options/majestic-sky-healing-meditative-cello-and-piano-230090 - Copy.mp3",
      image: p + "/options/pexels-pixabay-158827.jpg",
  },
  "space": {
      title: "Space",
      audio: p + "/options/perfect-beauty-191271.mp3",
      image: p + "/options/pexels-pixabay-2150.jpg",
  },
};  

export const GetOptions = (key: string) => {
  if (key in OptionsMap)
    return OptionsMap[key];
  else
    return OptionsMap["forest"];
}

const Options = () => {
  const {musicKey, setMusicKey, imageKey, setImageKey, volume, setVolume} = useContext(OptionsContext);

  const divs = [];
  for (const key in OptionsMap) {
    const { title, audio, image } = OptionsMap[key];

    const selectBackgroundCheckmark = key === imageKey ? "\u2714" : "";
    const selectMusicCheckmark = key === musicKey ? "\u2714" : "";

    const selectBackground = (
      <button
        className="select"
        onClick={() => setImageKey(key)}
        disabled={key === imageKey}
      >
        {selectBackgroundCheckmark} Select Background
      </button>
    );

    const selectMusic = (
      <button
        className="select"
        onClick={() => setMusicKey(key)}
        disabled={key === musicKey}
      >
        {selectMusicCheckmark} Select Music
      </button>
    );

    divs.push(<div className="box" key={key}>
      <h2>{title}</h2>
      <img alt="" src={image} />
      {selectBackground}
      <div className="buttonrow">
        <PlayPause audio={audio} />
        {selectMusic}
      </div>
    </div>);
  }

  return <div className="options">
    <h1>Background & Music</h1>
    <div className="volume">
        <h3>Volume</h3>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(Number.parseFloat(e.target.value))} />
        <div>{Math.round(volume * 100)}%</div>
    </div>
    <div className="optionsgrid">
      {divs}
    </div>
  </div>;
};

export default Options;
