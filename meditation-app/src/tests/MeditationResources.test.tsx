import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MeditationResources from '../pages/MeditationResources';
import { articles } from '../components/ReasComponents/Data/ArticleData';
import { videos } from '../components/ReasComponents/Data/VideoData';

describe('MeditationResources Component', () => {
    test('renders all articles with correct titles', () => {
        render(<MeditationResources />);
    
        articles.forEach((article) => {
          // Verify title is rendered
          const articleHeading = screen.getByText(new RegExp(article.title, 'i'));
          expect(articleHeading).toBeInTheDocument();
        });
    });

    test('renders all articles with correct links and images', () => {
        render(<MeditationResources />);
    
        articles.forEach((article) => {
          // Verify the image is a clickable link
          const imageLink = screen.getByRole('link', { name: new RegExp(article.altName, 'i') });
          expect(imageLink).toHaveAttribute('href', article.link);
        });
    });

    test('renders all articles with correct dates and publishers', () => {
        render(<MeditationResources />);
    
        articles.forEach((article) => {
          // Verify the publication date and publisher is rendered
          const articleDate = screen.getByText(new RegExp(article.date, 'i'));
          expect(articleDate).toBeInTheDocument();
        });
    });

  test('renders all embedded YouTube videos', () => {
    render(<MeditationResources />);

    videos.forEach((video) => {
        const videoElement = screen.getByTitle(new RegExp(video.vidtitle, 'i'));
        expect(videoElement).toHaveAttribute('src', video.videoSrc);
    });
  });

  test('renders all headings and dates/dates correctly', () => {
    render(<MeditationResources />);

    videos.forEach((video) => {
        const normalizedTitle = video.title
            .replace(/&/g, '&amp;') // Escape ampersand
            .replace(/\(/g, '\\(') // Escape opening parenthesis
            .replace(/\)/g, '\\)'); // Escape closing parenthesis

        // Verify video title is rendered
        const videoTitle = screen.getByText(new RegExp(normalizedTitle, 'i'));
        expect(videoTitle).toBeInTheDocument();
  
        // Verify video date is rendered
        const videoDate = screen.getByText(new RegExp(video.date, 'i'));
        expect(videoDate).toBeInTheDocument();
    });

    /**expect(screen.getByText(/The Scientific Power of Meditation/i)).toBeInTheDocument();
    expect(screen.getByText(/AsapSCIENCE 01\/18\/15/i)).toBeInTheDocument();

    expect(screen.getByText(/How To Meditate: A Complete Guide For Beginners \(5-min\)/i)).toBeInTheDocument();
    expect(screen.getByText(/BrettLarkinYoga 12\/27\/17/i)).toBeInTheDocument();

    expect(screen.getByText(/Dr. Sam Harris: Using Meditation to Focus, View Consciousness & Expand Your Mind/i)).toBeInTheDocument();
    expect(screen.getByText(/Andrew Huberman 01\/02\/23/i)).toBeInTheDocument();*/
  });
});