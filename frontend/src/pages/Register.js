import React, { useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('/users/register', { name, email, password });
      alert('User registered successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Navbar />
      <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
      <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
}
