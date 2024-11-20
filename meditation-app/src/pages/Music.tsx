import "../styles/Music.css";

import { PlayPause } from '../components/PlayPause';
import { useContext } from "react";
import { OptionsContext } from "../context/OptionsContext";

type Options = {
  [key: string]: { title: string, audio: string, image: string },
};

const p = process.env.PUBLIC_URL;
export const MusicOptions: Options = {
  "forest": {
    title: "Forest",
    audio: p + "/music/forest-163012.mp3",
    image: p + "/music/pexels-matthew-montrone-230847-1179229.jpg",
  },
  "ocean": {
    title: "Ocean",
    audio: p + "/music/ocean-245607.mp3",
    image: p + "/music/pexels-kellie-churchman-371878-1001682.jpg",
  },
  "sky": {
    title: "Sky",
    audio: p + "/music/majestic-sky-healing-meditative-cello-and-piano-230090 - Copy.mp3",
    image: p + "/music/pexels-pixabay-158827.jpg",
  },
  "space": {
    title: "Space",
    audio: p + "/music/perfect-beauty-191271.mp3",
    image: p + "/music/pexels-pixabay-2150.jpg",
  },
}

const Music = () => {
  const {musicKey, setMusicKey} = useContext(OptionsContext);

  const divs = [];
  for (const key in MusicOptions) {
    const { title, audio, image } = MusicOptions[key];
    divs.push(<div className="box">
      <h2>{title}</h2>
      <img alt="" src={image} />
      <div className="buttonrow">
        <PlayPause audio={audio} />
        <button className="select" onClick={() => setMusicKey(key)} disabled={key === musicKey}>Select Music</button>
      </div>
    </div>);
  }

  return <div className="music">
    <div className="musicgrid">
      {divs}
    </div>
  </div>;
};

export default Music;
