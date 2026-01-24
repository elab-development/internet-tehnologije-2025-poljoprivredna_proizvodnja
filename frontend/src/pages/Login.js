import React, { useState } from 'react';
import { api, setAuthToken } from '../services/api';
import { saveAuth } from '../services/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', { email, password });

      // Sačuvaj token i korisnika
      saveAuth(res.data);
console.log('Token:', localStorage.getItem('token'));
    console.log('User:', localStorage.getItem('user'));
      // Postavi token u axios
      setAuthToken(res.data.token);

      alert('Login successful!');

      // Preusmeri korisnika na productions stranicu
      navigate('/productions');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={handleLogin} className="mt-4">Login</Button>
    </div>
  );
}
