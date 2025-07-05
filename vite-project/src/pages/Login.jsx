import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserStore from "../store/UserStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

 
 
const Login = () => {
   const { isAuthenticated ,loading,login} = useAuth();
  const {setText,text}=UserStore()
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error,setError]=useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(typeof(text));
     axios.post("/login",{email:formData.email,password:formData.password})
    .then((res)=>{
      
        if(res.status===200){
          login()
          Cookies.set("token", res.data.token);
          setText(res.data.user.name);
          navigate("/")
        }
        
    
    })
    .catch((res)=>{


      if(res.status===500){
        console.log(res)
        setError("User not found!");
      }
      else{
        console.log(res)
        setError("Invalid Password!")
      }
    })
   
};

  return (
    <div>

      <div className="flex items-center justify-center h-screen bg-green-700">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-4 p-10 h-[50%] bg-gray-700 border  rounded">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium text-yellow-50">Email</label>
        <input 
          onClick={()=>{setError("")}}
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-xl"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium text-yellow-50">Password</label>
        <input
          onClick={()=>{setError("")}}
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-xl"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded text-xl hover:bg-blue-800"
      >
        Login
      </button>
      <div className="w-full font-bold text-left text-red-50 underline">{error}</div>
      <Link to='/register' className="w-full overflow-hidden text-sm text-gray-300  font-mono">Haven't Account <span className="text-gray-100 hover:text-gray-50 hover:underline">Register</span></Link>
    </form>
    </div>
    </div>
  );
};

export default Login;
