import { useState } from "react";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios  from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error,setError]= useState("")
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
     axios.post("/register",{email:formData.email,password:formData.password,name:formData.name})
      .then((res)=>{
        console.log(res.data.user.name, res.status)
        if(res.status===200){ 
          navigate("/login")
        }
      })
      .catch(()=>{
        setError("Email is already used")
      })
  };

  return (
   <div className="flex items-center border border-blue-500  bg-green-700 h-screen">
     <form onSubmit={handleSubmit} className="pb-20 max-w-md mx-auto space-y-4 p-10  border rounded h-[50%] bg-gray-700">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium text-yellow-50">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium text-yellow-50">Email</label>
        <input
        onClick={()=>setError("")}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium text-yellow-50">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
      <div className="font-bold text-red-50 underline transition-all duration-500 ">{error}</div>
      <Link to='/login' className="w-[50%] overflow-hidden text-sm text-gray-300  font-mono">Already have Account? <span className="text-gray-100 hover:text-gray-50 hover:underline ">Login</span></Link>
    </form>
   </div>
  )
};

export default Register;