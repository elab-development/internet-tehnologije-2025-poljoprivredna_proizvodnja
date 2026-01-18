import React, { useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  
  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', { email, password });
      alert('Login successful!');
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
 
      <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
