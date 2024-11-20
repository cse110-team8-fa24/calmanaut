
export interface VideoData{
    videoSrc: any;
    title: string;
    date: string;
    variant: string;
    vidtitle: string;
}

export const videos: VideoData[] = [
    {
        videoSrc:"https://www.youtube.com/embed/Aw71zanwMnY",
        title: "The Scientific Power of Meditation",
        date: "AsapSCIENCE 01/18/15",
        variant: "one",
        vidtitle: "Science"
    },
    {
      
        videoSrc:"https://www.youtube.com/embed/MKEUEWEVTiE",
        title: "How To Meditate: A Complete Guide For Beginners (5-min)",
        date: "BrettLarkinYoga 12/27/17",
        variant: "two",
        vidtitle: "Beginner"
    },
    {
      
        videoSrc:"https://www.youtube.com/embed/-wIt_WsJGfw",
        title: "Dr. Sam Harris: Using Meditation to Focus, View Consciousness & Expand Your Mind | Huberman Lab 105",
        date: "Andrew Huberman 01/02/23",
        variant: "three",
        vidtitle: "Seminar"
    },
];