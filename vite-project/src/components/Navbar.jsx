import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import axios from 'axios';
const Navbar = () => {
    const { isAuthenticated ,logout} = useAuth();
    const [user,setUser]=useState({});
    useEffect(()=>{
        (async()=>{
        await axios.get('/user',{
        withCredentials: true,
        })
      .then(res => {
        console.log(res.data.user)
        setUser(res.data.user);
      } )
      .catch(err => console.log('Error loading user profile:', err));
        })()
        
    },[])

    
    return (
        <div className='w-full h-10 text-xl text-white flex items-center justify-center flex-col pr-10 pb-10' >
            <div className={`  flex items-center justify-center text-yellow-200 font-mono  w-[100%] rounded-full pt-10 lg:pt-0 ${isAuthenticated?"block":"hidden"}`}>{isAuthenticated?<img src={user.img} alt="img"  className='w-20 h-20 lg:w-40 lg:h-40 rounded-full bg-white text-center' />:<img src="https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png" alt="img" width={80} height={80} className='rounded-full bg-white text-center' />}</div>
            <div className=''>{isAuthenticated?user.name:"login"}</div>
            <div className={`text-gray-300 font-thin hover:underline ${isAuthenticated?"block":"hidden"}`}>
            <Link to="/profile">View Profile</Link>
            </div>
            <div >
            <button className={`text-gray-300 font-thin hover:underline ${!isAuthenticated?"hidden":"block"}`} onClick={logout}>Logout</button>
            </div>
        </div>
    );
};
 
export default Navbar;