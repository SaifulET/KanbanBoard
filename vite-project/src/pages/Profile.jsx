// components/ViewProfile.jsx
import  { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileEditModal from '../components/ProfileEditModal';
import { Link } from 'react-router-dom';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser=async()=>{
axios.get('/user',{
  withCredentials: true,
})
      .then(res => {
        console.log(res.data.user)
        setUser(res.data.user);
        
      } )
      .catch(err => console.error('Error loading user profile:', err));
  }
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className='bg-green-700 w-full h-screen flex items-center justify-center'>
      <Link to="/" className='absolute top-5 lg:top-20 lg:left-20 left-5   rounded-xl font-extrabold p-4 bg-slate-300 '>Home</Link>
<div className=" w-[80%] md:w-[30%] scale-125 bg-gray-100 m-auto p-6 py-10  rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex justify-between"><button  onClick={() => setShowEdit(true)} className='font-semibold overflow-hidden text-xl bg-green-950 text-gray-300 rounded-lg p-2 hover:bg-green-800   transition-all duration-200'>Edit</button></h2>
      <div className="flex items-center gap-4 relative top-[-20px]">
        <div className='m-auto'>
          <p className='rounded-full w-20 h-20 lg:w-40 lg:h-40 bg-slate-400'><img 
                 src={user.img} 
                 alt="Stored" 
                  className='rounded-full w-full h-full bg-white text-center' 
                />
          </p>
          <h3 className="text-xl  font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.profession}</p>
        </div>
      </div>
      <div className="mt-6 space-y-2 relative top-[-20px] pl-10">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Experience:</strong> {user.experience}</p>
        <p><strong>Institution:</strong> {user.institution?user.institution: 'N/A'}</p>
      </div>
    </div>
{showEdit && (
        <ProfileEditModal
          user={user}
          onClose={() => setShowEdit(false)}
          onUpdate={fetchUser}
        />
      )}
    </div>
    
  );
};

export default Profile;
