import React from 'react';
import '../../styles/resource.css';

interface VideoProps{
    videoSrc: any;
    title: string;
    date: string;
    variant: string;
  }

const Video: React.FC<VideoProps> = ({ videoSrc, title, date, variant }) => (
    <div className={`article article--${variant}`}>
      <iframe
        className="img"
        src={videoSrc}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="text">
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
    </div>
);

export default Video;