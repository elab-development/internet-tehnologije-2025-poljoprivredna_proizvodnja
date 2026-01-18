import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';


const Productions = () => {
  const [productions, setProductions] = useState([]);
  const [cropId, setCropId] = useState('');
  const [quantity, setQuantity] = useState('');

  // Učitavanje svih proizvodnji
  const loadProductions = async () => {
    try {
      const res = await api.get('/productions'); // ili '/api/productions' ako backend koristi /api
      setProductions(res.data);
    } catch (err) {
      console.error('Error loading productions:', err);
    }
  };

  useEffect(() => {
    loadProductions();
  }, []);

  // Dodavanje nove proizvodnje
  const createProduction = async () => {
    if (!cropId || !quantity) {
      alert('Unesi Crop ID i količinu!');
      return;
    }

    try {
      await api.post('/productions', { cropId, quantity });
      setCropId('');
      setQuantity('');
      loadProductions();
    } catch (err) {
      console.error('Error creating production:', err);
    }
  };

  // Brisanje proizvodnje
  const removeProduction = async (id) => {
    try {
      await api.delete(`/productions/${id}`);
      loadProductions();
    } catch (err) {
      console.error('Error deleting production:', err);
    }
  };

  return (
    <div className="p-6">
   
      <h2 className="text-2xl mb-4">Proizvodnja</h2>

      {/* Dodavanje nove proizvodnje */}
      <Card title="Nova proizvodnja">
        <Input label="Crop ID" value={cropId} onChange={e => setCropId(e.target.value)} />
        <Input label="Količina (kg)" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <Button onClick={createProduction}>Dodaj</Button>
      </Card>

      {/* Lista proizvodnji */}
      {productions.length === 0 ? (
        <p>Još nema proizvodnji.</p>
      ) : (
        productions.map(p => (
          <Card key={p.id} title={`Proizvodnja #${p.id}`}>
            <p>Količina: {p.quantity} kg</p>
            <p>Crop ID: {p.cropId}</p>
            <Button onClick={() => removeProduction(p.id)}>Obriši</Button>
          </Card>
        ))
      )}
    </div>
  );
};

export default Productions;
