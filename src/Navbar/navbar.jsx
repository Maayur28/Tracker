import React,{useState,useContext} from "react";
import "./navbar.css";
import Login from '../Login/login';
import Register from '../Register/register';
import { Image, Button} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import {Link} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "../Store/data";

const Navbar = () => {
  const[loginModal,setLoginModal]=useState(false);
  const[registerModal,setRegisterModal]=useState(false);
  const { value } = useContext(StoreContext);
  const [isLogin, setisLogin] = value;
  const handleLoginLogout=()=>{
    if(!isLogin)
    setLoginModal(true);
    else
    {
      localStorage.clear();
      setisLogin(false);
      toast.dark('Logout successful', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
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
      <Link to="/" exact="true">
      <Image src="logos.png" fluid style={{ color: "white" }} />
      </Link>
      <Button variant="outline-danger" onClick={handleLoginLogout}>{isLogin?'LOGOUT':'LOGIN'}</Button>
    </div>
    {
      loginModal?<Login handleLoginLaunch={handleLoginLaunch} handleisLogin={handleisLogin}/>:null
    }
    {
      registerModal?<Register handleRegisterLaunch={handleRegisterLaunch} handleisLogin={handleisLogin}/>:null
    }
     <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default Navbar;
