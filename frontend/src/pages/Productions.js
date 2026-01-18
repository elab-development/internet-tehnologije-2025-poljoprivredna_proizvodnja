import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const Productions = () => {
  const [list, setList] = useState([]);
  const [cropId, setCropId] = useState('');
  const [quantity, setQuantity] = useState('');

  const load = async () => {
    const res = await api.get('/productions');
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    await api.post('/productions', { cropId, quantity });
    setCropId('');
    setQuantity('');
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Proizvodnja</h2>

      <Card title="Nova proizvodnja">
        <Input label="Crop ID" value={cropId} onChange={e => setCropId(e.target.value)} />
        <Input label="Količina (kg)" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <Button onClick={create}>Dodaj</Button>
      </Card>

      {list.map(p => (
        <Card key={p.id} title={`Proizvodnja #${p.id}`}>
          <p>Količina: {p.quantity} kg</p>
        </Card>
      ))}
    </div>
  );
};

export default Productions;
