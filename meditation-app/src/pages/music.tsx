import React, { useEffect, useState, useRef } from 'react';
import "../styles/music.css";
//in order to import audio clips, ther had to be changes on react-app-env.d.ts
import fA from './Music/forest-163012.mp3';
import note from './Music/note-159509_1280.png';
import fP from './Music/pexels-matthew-montrone-230847-1179229.jpg';
import oA from './Music/ocean-245607.mp3'
import oP from './Music/pexels-kellie-churchman-371878-1001682.jpg';
import skA from './Music/majestic-sky-healing-meditative-cello-and-piano-230090 - Copy.mp3';
import skP from './Music/pexels-pixabay-158827.jpg';
import spA from './Music/perfect-beauty-191271.mp3';
import spP from './Music/pexels-pixabay-2150.jpg';


const Music: React.FC = () =>
    {
     

      //states
      const [foreststate, setForestState] = useState(false);
      const [oceanstate, setOceanState] = useState(false);
      const [skystate,setSkyState] = useState(false);
      const [spacestate, setSpaceState]  = useState(false);
     
      //ref used so one can pause and play an audio
      const forestRef = useRef(new Audio(fA))
      const oceanRef = useRef(new Audio(oA))
      const skyRef = useRef(new Audio(skA))
      const spaceRef = useRef(new Audio(spA))

      //these toggles play and pause the music when pressing the music note
      const toggleForestPlay = () =>
        {   
          const bol = foreststate;
          if(bol == true)
            {
             forestRef.current.pause();
             

            }
          else
            {
              forestRef.current.play();
            }

          setForestState(prevState => !prevState)
        };

        const toggleOceanPlay = () =>
          {   
            const bol = oceanstate;
            if(bol == true)
              {
               oceanRef.current.pause();
               
  
              }
            else
              {
                oceanRef.current.play();
              }
  
            setOceanState(prevState => !prevState)
          };

          const toggleSkyPlay = () =>
            {   
              const bol = skystate;
              if(bol == true)
                {
                 skyRef.current.pause();
                 
    
                }
              else
                {
                  skyRef.current.play();
                }
    
              setSkyState(prevState => !prevState)
            };

      const toggleSpacePlay = () =>
        {   
          const bol = spacestate;
          if(bol == true)
            {
             spaceRef.current.pause();
             

            }
          else
            {
              spaceRef.current.play();
            }

          setSpaceState(prevState => !prevState)
        };
      

        return (
  
         <div>

          <h1 className = "titles">Forest</h1>

         
          <div className = "b">

           
            <img src = {note} className = "img1" onClick = {() =>toggleForestPlay()}/>
            <img src = {fP} className = "img2"/>

          </div>

          <h2 className = "titles">Ocean</h2>


          <div className = "b">

           
            <img src = {note} className = "img1" onClick = {() =>toggleOceanPlay()}/>
            <img src = {oP} className = "img2"/>

          </div>

          <h3 className = "titles">Sky</h3>

          <div className = "b">

           
            <img src = {note} className = "img1" onClick = {() =>toggleSkyPlay()}/>
            <img src = {skP} className = "img2"/>

          </div>

          <h4 className = "titles">Space</h4>

          <div className = "b">

           
            <img src = {note} className = "img1" onClick = {() =>toggleSpacePlay()}/>
            <img src = {spP} className = "img2"/>

          </div>


         </div>



        
       
        
          );
    };

    export default Music;