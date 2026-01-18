import React, { useEffect, useState } from 'react';
import { api } from '../services/api'; // axios instance sa baseURL
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';


export default function Fields() {
  const [fields, setFields] = useState([]);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [location, setLocation] = useState('');

  // Učitavanje svih polja
  const loadFields = async () => {
    try {
      const res = await api.get('/fields'); // '/api/fields' ako tvoj backend koristi /api
      setFields(res.data);
    } catch (err) {
      console.error('Error loading fields:', err);
    }
  };

  useEffect(() => {
    loadFields();
  }, []);

  // Dodavanje novog polja
  const createField = async () => {
    if (!name || !area || !location) {
      alert('Fill all fields!');
      return;
    }
    try {
      await api.post('/fields', { name, area, location });
      setName('');
      setArea('');
      setLocation('');
      loadFields();
    } catch (err) {
      console.error('Error creating field:', err);
    }
  };

  // Brisanje polja
  const removeField = async (id) => {
    try {
      await api.delete(`/fields/${id}`);
      loadFields();
    } catch (err) {
      console.error('Error deleting field:', err);
    }
  };

  return (
    <div>
     {/* navigacija na vrhu */}
      <h2>Fields Management</h2>

      {/* Dodavanje novog polja */}
      <Card title="Add Field">
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Area (ha)" value={area} onChange={e => setArea(e.target.value)} />
        <Input label="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <Button onClick={createField}>Add Field</Button>
      </Card>

      {/* Lista svih polja */}
      {fields.length === 0 ? (
        <p>No fields yet.</p>
      ) : (
        fields.map(f => (
          <Card key={f.id} title={f.name}>
            <p>Area: {f.area} ha</p>
            <p>Location: {f.location}</p>
            <Button onClick={() => removeField(f.id)}>Delete</Button>
          </Card>
        ))
      )}
    </div>
  );
}
