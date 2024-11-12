import { Link, useNavigate } from "react-router-dom";
import './Authentication.css'
import React, { useState } from "react";
import useUser from "../context/useUser";

export const AuthenticationMode = Object.freeze({
  Login: 'Login',
  Register: 'Register'
})

export default function Authentication({authenticationMode}) {
  const {user, setUser, signUp, signIn} = useUser()
  const navigate = useNavigate()
  const [username, setUsername] = useState(""); 

  const isPasswordValid = (password) => {
    const hasUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
    const hasNumber = /\d/.test(password);       // At least one digit
    return hasUpperCase && hasNumber;
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (authenticationMode === AuthenticationMode.Register && !isPasswordValid(user.password)) {
      alert("Password must contain at least one uppercase letter and one number.");
      return;
    }
    
    try {
      if (authenticationMode === AuthenticationMode.Register){
        await signUp()
        navigate('/signin')
      } else {
        await signIn()
        navigate("/")
      }
    }catch(error){
      const message = error.response && error.response.data ? error.response.data.error : error
      alert(message)
    }
  }

  return (
    <div className="authentication-container">
      <h3>{authenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
      <form onSubmit={handleSubmit}>
      {/* {authenticationMode === AuthenticationMode.Register && (
          <div>
            <label>Username</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
        )} */}
        <div>
          <label>Email</label>
          <input type="email" value={user.email} onChange={e => setUser({...user,email:e.target.value})} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={user.password} onChange={e => setUser({...user,password:e.target.value})} />
        </div>
        <div>
          <button>{authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}</button>
        </div>
        <div>
          <Link to={authenticationMode === AuthenticationMode.Login ? '/signup':'/signin'} >
            {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}
          </Link>
        </div>
      </form>
    </div>
  )
}
