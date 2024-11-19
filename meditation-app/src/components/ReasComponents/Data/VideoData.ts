
export interface VideoData{
    videoSrc: any;
    title: string;
    date: string;
    variant: string;
}

export const videos: VideoData[] = [
    {
        videoSrc:"https://www.youtube.com/embed/Aw71zanwMnY",
        title: "The Scientific Power of Meditation",
        date: "AsapSCIENCE 01/18/15",
        variant: "one"
    },
    {
      
        videoSrc:"https://www.youtube.com/embed/MKEUEWEVTiE",
        title: "How To Meditate: A Complete Guide For Beginners (5-min)",
        date: "BrettLarkinYoga 12/27/17",
        variant: "two"
    },
    {
      
        videoSrc:"https://www.youtube.com/embed/-wIt_WsJGfw",
        title: "10 health benefits of meditation and how to focus on mindfulness",
        date: "UC Davis Health 12/14/22",
        variant: "three"
    },
];