import React from 'react';
import '../../styles/resource.css';
import Article from './Article';
import Video from './Video';  
import {ArticleData} from './Data/ArticleData';
import {VideoData} from './Data/VideoData';


  
interface ArticlesSectionProps {
  articles: ArticleData[];
}

interface VideosSectionProps {
    videos: VideoData[];
  }

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
  return (
    <div className="section">
      <div className="wrapper">
        {articles.map((article, index) => (
          <Article
            key={index}
            link={article.link}
            imageSrc={article.imageSrc}
            title={article.title}
            date={article.date}
            variant={article.variant}
          />
        ))}
      </div>
    </div>
  );
};

export const VideosSection: React.FC<VideosSectionProps> = ({ videos }) => {
    return (
      <div className="section">
        <div className="wrapper">
          {videos.map((video, index) => (
            <Video
                key={index}
                videoSrc={video.videoSrc}
                title={video.title}
                date={video.date}
                variant={video.variant}
            />
          ))}
        </div>
      </div>
    );
  };