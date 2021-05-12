import React,{useState} from "react";
import "./navbar.css";
import Login from '../Login/login';
import Register from '../Register/register';
import {toast} from 'react-toastify';
import { Image, Button } from "react-bootstrap";

const Navbar = () => {
  const[loginModal,setLoginModal]=useState(false);
  const[registerModal,setRegisterModal]=useState(false);
  const [isLogin, setisLogin] = useState(localStorage.length>0?true:false);
  const handleLoginLogout=()=>{
    if(!isLogin)
    setLoginModal(true);
    else
    {
      localStorage.clear();
      setisLogin(false);
      toast.error("Logout Successful", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  }
  const handleLoginLaunch = (val) => {
    setLoginModal(false);
    setRegisterModal(val);
  };
  const handleRegisterLaunch = (val) => {
    setRegisterModal(false);
    setLoginModal(val);
  };
  const handleisLogin = (val) => {
    setRegisterModal(false);
    setLoginModal(false);
    setisLogin(val);
  };

  return (
    <>
    <div className="navbar">
      <Image src="logos.png" fluid style={{ color: "white" }} />
      <Button variant="outline-danger" onClick={handleLoginLogout}>{isLogin?'LOGOUT':'LOGIN'}</Button>
    </div>
    {
      loginModal?<Login handleLoginLaunch={handleLoginLaunch} handleisLogin={handleisLogin}/>:null
    }
    {
      registerModal?<Register handleRegisterLaunch={handleRegisterLaunch} handleisLogin={handleisLogin}/>:null
    }
    </>
  );
};

export default Navbar;
