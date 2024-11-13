import React from 'react';
import '../../styles/resource.css';
import meditionIMG from './meditionIMG.jpg';
/** const MeditationResources: React.FC = () => {
  return (
    <div>
      <h1>Meditation Resources</h1>
      <p>Find calming music, guided meditation, and more.</p>
    </div>
  );
}; */

interface ArticleProps {
  link: string;
  imageSrc: any;
  title: string;
  date: string;
  variant: string;
}

interface VideoProps{
  videoSrc: any;
  title: string;
  date: string;
  variant: string;
}

const Article: React.FC<ArticleProps> = ({ link, imageSrc, title, date, variant }) => (
  <div className={`article article--${variant}`}>
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img src={imageSrc} alt="Basic image example" />
    </a>
    <div className="text">
      <h3>{title}</h3>
      <p>{date}</p>
    </div>
  </div>
);

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

const ArticlesSection = () => (
  <div className='section'>
    <div className='wrapper'>
      <Article
        link="https://my.clevelandclinic.org/health/articles/17906-meditation"
        imageSrc={meditionIMG}
        title="10 health benefits of meditation and how to focus on mindfulness"
        date="UC Davis Health 12/14/22"
        variant="one"
      />
      <Article
        link="https://my.clevelandclinic.org/health/articles/17906-meditation"
        imageSrc={meditionIMG}
        title="10 health benefits of meditation and how to focus on mindfulness"
        date="UC Davis Health 12/14/22"
        variant="two"
      />
      <Article
        link="https://my.clevelandclinic.org/health/articles/17906-meditation"
        imageSrc={meditionIMG}
        title="10 health benefits of meditation and how to focus on mindfulness"
        date="UC Davis Health 12/14/22"
        variant="three"
      />
    </div>
  </div>
);

const VideosSection = () => (
  <div className='section'>
    <div className='wrapper'>
      <Video
        videoSrc="https://www.youtube.com/embed/Aw71zanwMnY"
        title="10 health benefits of meditation and how to focus on mindfulness"
        date="UC Davis Health 12/14/22"
        variant="one"
      />
      <Video
        videoSrc="https://www.youtube.com/embed/Aw71zanwMnY"
        title="10 health benefits of meditation and how to focus on mindfulness"
        date="UC Davis Health 12/14/22"
        variant="two"
      />
      <Video
        videoSrc="https://www.youtube.com/embed/Aw71zanwMnY"
        title="10 health benefits of meditation and how to focus on mindfulness"
        date="UC Davis Health 12/14/22"
        variant="three"
      />
    </div>
  </div>
);


const MeditationResources: React.FC = () => {
  return (
    <div>
      <h1>Meditation Resources</h1>
      <h1 className='black'>Articles</h1>
      <ArticlesSection/>
      <h1 className='black'>Videos</h1>
      <VideosSection/>
    </div>
    
    
  );
}; 

export default MeditationResources;
