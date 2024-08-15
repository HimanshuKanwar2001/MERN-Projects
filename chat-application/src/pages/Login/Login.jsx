import React from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { useState } from "react";
import { signup } from "../../config/firebase";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");


  const onSubmitHandler=(e)=>{
    e.preventDefault();
    if(currState === "Sign Up"){
      signup(username,email,password);
    }
  }



  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign Up" ? (
          <input
            type="text"
            onChange={(e)=>setUsername(e.target.value )}
            value={username}
            placeholder="username"
            className="form-input"
            required
          />
        ) : null}
        <input
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email Address"
          value={email}
          className="form-input"
          required
        />
        <input
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password"
          value={password}
          className="form-input"
          required
        />
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login Now"}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an account{" "}
              <span onClick={() => setCurrState("Login")}>login here</span>{" "}
            </p>
          ) : (
            <p className="login-toggle">
              Create an account{" "}
              <span onClick={() => setCurrState("Sign Up")}>click here</span>{" "}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
