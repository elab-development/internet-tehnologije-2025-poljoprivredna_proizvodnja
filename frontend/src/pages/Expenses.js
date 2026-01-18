import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
const Expenses = () => {
  const [list, setList] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const load = async () => {
    const res = await api.get('/expenses');
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    await api.post('/expenses', { description, amount });
    setDescription('');
    setAmount('');
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Troškovi</h2>
<Navbar />
      <Card title="Novi trošak">
        <Input label="Opis" value={description} onChange={e => setDescription(e.target.value)} />
        <Input label="Iznos (RSD)" value={amount} onChange={e => setAmount(e.target.value)} />
        <Button onClick={create}>Dodaj</Button>
      </Card>

      {list.map(e => (
        <Card key={e.id} title={e.description}>
          <p>Iznos: {e.amount} RSD</p>
        </Card>
      ))}
    </div>
  );
};

export default Expenses;
