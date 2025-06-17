import React from 'react';
import UserStore from '../store/UserStore';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const {text,logout} = UserStore()
      const navigate = useNavigate();
      const logoutfunction=async()=>{
        logout();
        navigate("/login")
      }
    return (
        <div className='w-full h-10 text-xl   text-white flex items-center justify-center flex-col pr-10' >
            <div className={`  flex items-center justify-end  text-yellow-200 font-mono ${text==="Login"?"hidden":"block"}`}><img src="https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png" alt="img" width={80} height={80} className='rounded-full bg-white text-center' /></div>
            <div className=''>{text}</div>
            <div className={`text-gray-300 font-thin hover:underline ${text==="Login"?"hidden":"block"}`}>
            <Link to="/profile">View Profile</Link>
            </div>
            <div >
            <button className={`text-gray-300 font-thin hover:underline ${text==="Login"?"hidden":"block"}`} onClick={logoutfunction}>Logout</button>
            </div>
        </div>
    );
};
 
export default Navbar;