import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { verifyFaceId } from "./faceId.js";
const Login = () => {
    let details=JSON.parse(localStorage.getItem('data')||{});
        let navigate=useNavigate();
    let[mode,setMode]=useState('email');
    let[email,setEmail]=useState('');
    let[emailErr,setEmailErr]=useState('');
    let[phone,setPhone]=useState('');
     let[phoneErr,setPhoneErr]=useState('');
    let[otp,setOtp]=useState('');
    let[tempOtp,setTempOtp]=useState('');
    const getFaceUser = () => {
  const key = Object.keys(localStorage).find((k) => k.startsWith("faceid:"));
  return key ? key.replace("faceid:", "") : null;
};

const faceUser = getFaceUser();
    
    useEffect(()=>{
          let temp=Math.floor(100000+Math.random()*9000000);
          console.log(temp);
          setTempOtp(temp)

    },[])

      function handleSubmit(e){
        e.preventDefault();
         console.log('ji');
           if(mode=='email'){
               if(email==details.email){
                      if(tempOtp==otp){
                        navigate('/home')
                      }

               }
               else{
                setEmailErr('please write valid email')
               }
           }
           else{
            if(phone==details.phone){
                      if(tempOtp==otp){
                        navigate('/home')
                      }
            }
            else{
                setPhoneErr('please write valid email')
               }
           }
      }
      async function handlefaceId(){
                try {
                       await verifyFaceId(faceUser)
                        navigate("/home");
                } catch (error) {
                      console.log(error.message);
                }
      }
  return (
    <div>
        
        <form onSubmit={handleSubmit}>
          { mode=='email'?(
            <>
            <label>Email:
                  <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
           
            </label>
            <p>{emailErr}</p>
            
            </>

        ):(
            <>
            <label> Phone:
                     <input type='tel' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                        
            </label>
             <p>{emailErr}</p>
            
            </>
        )
        }
         <label>
            <input type='radio' checked={mode=='email'} onClick={()=>setMode('email')} />Email
            <input type='radio' checked={mode=='phone'} onClick={()=>setMode('phone')} />Phone
         </label>
          <label>
            <br/>
              OTP:<input type='text' onChange={(e)=>setOtp(e.target.value)}/>
          </label>
                   <button>Send OTP</button>
                   
        </form>
        <button onClick={handlefaceId}>Login by faceId</button>
        

    </div>
  )
}

export default Login