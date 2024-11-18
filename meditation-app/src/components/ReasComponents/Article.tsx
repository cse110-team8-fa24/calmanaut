import React from 'react';
import '../../styles/resource.css';

interface ArticleProps {
    link: string;
    imageSrc: any;
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

export default Article;