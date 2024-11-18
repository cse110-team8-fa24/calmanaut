import meditionIMG from './images/meditionIMG.jpg';
import brain from './images/brain.jpg'
import newYork from './images/newYork.jpg'

export interface ArticleData {
    link: string;
    imageSrc: any;
    title: string;
    date: string;
    variant: string;
}
  
export const articles: ArticleData[] = [
    {
      link: "https://my.clevelandclinic.org/health/articles/17906-meditation",
      imageSrc: meditionIMG,
      title: "Meditation: What it is, Benefits & Types",
      date: "Cleaveland Clinic 05/22/2022",
      variant: "one",
    },
    {
      link: "https://stanfordmag.org/contents/what-happens-when-you-meditate",
      imageSrc: brain,
      title: "What Happens When You Meditate",
      date: "Stanford Magazine 03/13/23",
      variant: "two",
    },
    {
      link: "https://www.nytimes.com/2020/06/22/at-home/how-to-start-meditating.html",
      imageSrc: newYork,
      title: "How to Start Meditating",
      date: "The New York Times 06/21/22",
      variant: "three",
    },
];