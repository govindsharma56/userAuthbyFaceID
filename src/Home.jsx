import React, { useState } from 'react'
import { isFaceIdAvailable,registerFaceId } from './faceId'
const Home = () => {
      let [msg,setMsg]=useState('');

           let details=JSON.parse(localStorage.getItem('data')||{});
           const user = details.email || details.phone;
             
     const enableFaceId=async()=>{
           try {
                if(!isFaceIdAvailable()) return setMsg('Biometric not available');
                await registerFaceId(user);
                setMsg("Face ID enabled!");

           } catch (error) {
               setMsg(error.message)
           }
     }
  return (
    <div>
         <h2>This is the Home Page</h2>
          <button onClick={enableFaceId}>Enable Face ID</button>
           <p>{msg}</p>
    </div>
  )
}

export default Home