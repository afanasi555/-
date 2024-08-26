import React, { useState } from 'react';
import axios from 'axios';

function Profile() {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [description, setDescription] = useState('');

  const updateProfile = async () => {
    try {
      await axios.post('/api/profile/update', { nickname, avatar, description });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error', error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <input type="text" placeholder="Avatar URL" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
}

export default Profile;
