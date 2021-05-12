import React,{useState} from "react";
import "./navbar.css";
import Login from '../Login/login';
import Register from '../Register/register';
import { Image, Button } from "react-bootstrap";

const Navbar = () => {
  const[loginModal,setLoginModal]=useState(false);
  const[registerModal,setRegisterModal]=useState(false);
  const [isLogin, setisLogin] = useState(false);
  const handleLoginLogout=()=>{
    setLoginModal(true);
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
