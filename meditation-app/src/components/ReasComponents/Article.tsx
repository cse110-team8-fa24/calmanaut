import React from 'react';
import '../../styles/resource.css';

interface ArticleProps {
    link: string;
    imageSrc: any;
    title: string;
    date: string;
    variant: string;
    altName: string
}

const Article: React.FC<ArticleProps> = ({ link, imageSrc, title, date, variant, altName }) => (
  <div className={`article article--${variant}`}>
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img src={imageSrc} alt={altName} />
      <div className="text">
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
    </a>
  </div>
);

export default Article;