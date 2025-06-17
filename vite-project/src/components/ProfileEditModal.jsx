import React, { useState } from 'react';
import axios from 'axios';



const ProfileEditModal = ({ user, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    name: user.name || '',
    profession: user.profession || '',
    experience: user.experience || '',
    institution: user.institution || '',
  });


  

  const handleChange = (e) => {
    const { name, value } = e.target;
   
      setForm({ ...form, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
       await axios.post("/profile",form,{withCredentials:true});
      onUpdate(); // refetch user
      onClose();  // close modal
    } catch (err) {
      console.error(err);
      alert('Update failed!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Profession</label>
            <input type="text" name="profession" value={form.profession} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Experience</label>
            <input type="text" name="experience" value={form.experience} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Institution</label>
            <input type="text" name="institution" value={form.institution} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
