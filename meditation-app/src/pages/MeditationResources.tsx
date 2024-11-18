import React from 'react';
import '../styles/resource.css';
import {ArticlesSection, VideosSection} from '../components/ReasComponents/Sections';
import {articles} from '../components/ReasComponents/Data/ArticleData';
import {videos} from '../components/ReasComponents/Data/VideoData';



const MeditationResources: React.FC = () => {
  return (
    <div>
      <h1>Meditation Resources</h1>
      <h1 className="black">Articles</h1>
      <ArticlesSection articles={articles} />
      <h1 className="black">Videos</h1>
      <VideosSection videos={videos} />
    </div>
  );
}; 

export default MeditationResources;
