import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const Fields = () => {
  const [fields, setFields] = useState([]);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');

  const loadFields = async () => {
    const res = await api.get('/fields');
    setFields(res.data);
  };

  useEffect(() => {
    loadFields();
  }, []);

  const createField = async () => {
    await api.post('/fields', { name, area });
    setName('');
    setArea('');
    loadFields();
  };

  const deleteField = async (id) => {
    await api.delete(`/fields/${id}`);
    loadFields();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Njive</h2>

      <Card title="Nova njiva">
        <Input label="Naziv" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Površina (ha)" value={area} onChange={e => setArea(e.target.value)} />
        <Button onClick={createField}>Dodaj</Button>
      </Card>

      {fields.map(f => (
        <Card key={f.id} title={f.name}>
          <p>Površina: {f.area} ha</p>
          <Button className="bg-red-500 mt-2" onClick={() => deleteField(f.id)}>Obriši</Button>
        </Card>
      ))}
    </div>
  );
};

export default Fields;
