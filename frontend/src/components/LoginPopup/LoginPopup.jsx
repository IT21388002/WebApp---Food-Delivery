import React from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'


const LoginPopup = ({setShowLogin}) => {

  const {url, setToken} = useContext(StoreContext)

    const [currentState, setCurrentState] = useState("Login")

    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
      event.preventDefault();
    
      let newUrl = url;
      if (currentState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }
    
      try {
        const response = await axios.post(newUrl, data);
    
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState==='Login'?<></>:<input name='name' onChange={handleChange} value={data.name} type="text" placeholder='your name' required />}
            <input name='email' onChange={handleChange} value={data.email} type="email" placeholder='your email' required />
            <input name='password' onChange={handleChange} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type="submit">
            {currentState==="Sign Up"?"Create account":"Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState==='Login'
        ?<p>Create a new account? <span onClick={()=>setCurrentState('Sign Up')}>Click Here</span></p>:
          <p>Already have an account? <span onClick={()=>setCurrentState('Login')}>Login Here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
