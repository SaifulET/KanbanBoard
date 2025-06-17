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
    <div className='bg-green-800 w-full h-screen flex items-center justify-center'>
      <Link to="/" className='position absolute top-20 left-20  rounded-xl font-extrabold p-4 bg-slate-300 '>Home</Link>
<div className="max-w-xl  bg-gray-200 m-auto p-6 py-10 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex justify-between">Profile <button  onClick={() => setShowEdit(true)} className='font-semibold overflow-hidden text-xl bg-green-950 text-gray-300 rounded-lg p-2 hover:bg-green-800   transition-all duration-200'>Edit</button></h2>
      <div className="flex items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.profession}</p>
        </div>
      </div>
      <div className="mt-6 space-y-2">
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
