import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
export default function Fields() {
  const [fields, setFields] = useState([]);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [location, setLocation] = useState('');

  const load = async () => {
    const res = await api.get('/api/fields');
    setFields(res.data);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    await api.post('/api/fields', { name, area, location });
    setName('');
    setArea('');
    setLocation('');
    load();
  };

  const remove = async (id) => {
    await api.delete(`/api/fields/${id}`);
    load();
  };

  return (
    <div>
      <h2>Fields</h2>
 <Navbar />
      <Card title="Add Field">
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Area (ha)" value={area} onChange={e => setArea(e.target.value)} />
        <Input label="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <Button onClick={create}>Add</Button>
      </Card>

      {fields.map(f => (
        <Card key={f.id} title={f.name}>
          <p>Area: {f.area} ha</p>
          <p>Location: {f.location}</p>
          <Button onClick={() => remove(f.id)}>Delete</Button>
        </Card>
      ))}
    </div>
  );
}
