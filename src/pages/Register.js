import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const history = useHistory();

  const handleRegister = async () => {
    try {
      await axios.post('/api/register', { email, password, nickname });
      history.push('/login');
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
