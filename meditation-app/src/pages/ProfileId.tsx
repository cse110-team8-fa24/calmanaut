import "../styles/ProfileId.css";
import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Util from "../lib/Util";
type User = {
  username: string,
  createDate: Date,
  id: number,
  backColor: string,
};


export const ProfileId = (props: any) => {
  const [user, setUser] = useState<User | undefined | false>(undefined);
  const {id} = useParams();

  
  const [color, setColor] = useState(() => {return localStorage.getItem('profileColor') || 'white;'});
  //sets the color state



  //overrides other styles from body styles, or just the backgroundColor in this case...


//got it


  //css files for static files
  //CSS classes for dynamic changes
  //use document.body.style.backgroundColor if you cant determine that style with other classes


 
  

  useEffect(()=>{document.body.style.backgroundColor = color},[color]);


  useEffect(() => {
    Util.get("users/" + id, Util.createDateReviver("createDate")).then(res => {
      setUser(res.user);
    }).catch(e => {
      setUser(false);
      console.error(e);
    });
  }, [setUser, id]);


  if (user === false)
    return <p>User not found.</p>;


  if (user === undefined)
    return <h1>Profile</h1>;


  const colorChange = (color: SetStateAction<string>) => {
    
    setColor(color);
    localStorage.setItem('profileColor',color as string);

    
    //stays even if you turn off the computer or not.
    //example, you leave your backpack somewhere, its still there


    //localSTORAGE can only save text!
   
  }

  return <div className= ''>
    <div className= 'headerinfo'>
    <h1>Profile</h1>
    <h2>{user.username}</h2>
    <p>Created on {user.createDate.toLocaleString()}</p>


    </div>
   


    <div className = 'colorbuttons'>
      <p>COLORS</p>
    <button onClick = {()=> colorChange('white')} className = 'listbuttons'>
         white
   
    </button>
 
    <button onClick = {()=> colorChange('aquamarine')} className = 'listbuttons'>
         aquamarine
   
    </button>


    <button onClick={()=> colorChange('cornflowerblue')}>
    cornflowerblue
   
    </button>


    <button onClick={()=> colorChange('Chocolate')}>
       chocolate
   
    </button>
 
   
    <button onClick={()=> colorChange('chartreuse')}>
    chartreuse
   
    </button>


   
    <button onClick={()=> colorChange('crimson')}>
     crimson
   
    </button>


   
    <button onClick={()=> colorChange('darkolivegreen')}>
    darkolivegreen
   
    </button>
    <button onClick={()=> colorChange('khaki ')}>
    khaki
   
    </button>    
    <button onClick={()=> colorChange('lavenderblush')}>
    lavenderblush
   
    </button>


    <button onClick={()=> colorChange('lightslategrey')}>
    lightslategrey
   
    </button>


    <button onClick={()=> colorChange('firebrick')}>
    firebrick
   
    </button>
    </div>


  </div>;
};
