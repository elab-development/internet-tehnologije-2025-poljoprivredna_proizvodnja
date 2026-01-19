import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Fields() {
  const [fields, setFields] = useState([]);
  const [form, setForm] = useState({
    name: '',
    area: '',
    soilType: '',
    location: '',
    season: 2025
  });

  // učitavanje svih polja
  const loadFields = async () => {
    try {
      const res = await api.get('/fields'); // koristi ISTU rutu svuda
      setFields(res.data);
    } catch (e) {
      console.error('Load error:', e);
    }
  };

  useEffect(() => {
    loadFields();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createField = async () => {
    if (!form.name || !form.area || !form.location) {
      alert('Popuni sva obavezna polja');
      return;
    }

    try {
      await api.post('/fields', form);
      setForm({
        name: '',
        area: '',
        soilType: '',
        location: '',
        season: 2025
      });
      loadFields();
    } catch (e) {
      console.error('Create error:', e);
    }
  };

  const removeField = async (id) => {
    try {
      await api.delete(`/fields/${id}`);
      loadFields();
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  return (
    <>
     

      <div className="container">
        <h2>Parcele</h2>

        <Card title="Dodaj parcelu">
          <Input name="name" label="Naziv" value={form.name} onChange={handleChange} />
          <Input name="area" label="Površina (ha)" value={form.area} onChange={handleChange} />
          <Input name="soilType" label="Tip zemljišta" value={form.soilType} onChange={handleChange} />
          <Input name="location" label="Lokacija" value={form.location} onChange={handleChange} />
          <Input name="season" label="Sezona" value={form.season} onChange={handleChange} />
          <Button onClick={createField}>Dodaj parcelu</Button>
        </Card>

        {fields.length === 0 ? (
          <p>Nema parcela.</p>
        ) : (
          fields.map(f => (
            <Card key={f.id} title={f.name}>
              <p>Površina: {f.area} ha</p>
              <p>Zemljište: {f.soilType}</p>
              <p>Lokacija: {f.location}</p>
              <p>Sezona: {f.season}</p>
              <Button onClick={() => removeField(f.id)}>Obriši</Button>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
