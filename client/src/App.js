import './App.css';
import React,{useEffect} from 'react';
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  useEffect(()=>{
    let obj = {
      token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMzRAZ21haWwuY29tIiwiaWF0IjoxNjQ5MDQ0NDEzLCJleHAiOjE2NDkxMzA4MTN9.owkzuIj7abPJIuc_IfgtUQIgGEziQL45VUOQhJbwozw",
      name:"User Name",
      email:"test134@gmail.com",
      _id:"g2pca1xcl1f69ee2"
    };
    const { token, name, email, _id } = obj;
    localStorage.setItem(
      "login",
      JSON.stringify({ token, email, _id, name, isLoggedIn: true })
    );
  },[])
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
