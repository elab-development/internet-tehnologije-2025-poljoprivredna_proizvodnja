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
  const [editingId, setEditingId] = useState(null); // ID parcele koju editujemo

  // Učitavanje svih parcela
  const loadFields = async () => {
    try {
      const res = await api.get('/fields'); // koristi istu rutu svuda
      setFields(res.data);
    } catch (e) {
      console.error('Load error:', e);
    }
  };

  useEffect(() => {
    loadFields();
  }, []);

  // Promena input polja
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Dodavanje nove parcele
  const createField = async () => {
    if (!form.name || !form.area || !form.location) {
      alert('Popuni sva obavezna polja');
      return;
    }
    try {
      await api.post('/fields', form);
      setForm({ name: '', area: '', soilType: '', location: '', season: 2025 });
      loadFields();
    } catch (e) {
      console.error('Create error:', e);
    }
  };

  // Brisanje parcele
  const removeField = async (id) => {
    try {
      await api.delete(`/fields/${id}`);
      loadFields();
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  // Pokretanje editovanja
  const startEdit = (field) => {
    setEditingId(field.id);
    setForm({
      name: field.name,
      area: field.area,
      soilType: field.soilType || '',
      location: field.location,
      season: field.season || 2025
    });
  };

  // Snimanje izmena
  const saveEdit = async () => {
    try {
      await api.put(`/fields/${editingId}`, form);
      setEditingId(null);
      setForm({ name: '', area: '', soilType: '', location: '', season: 2025 });
      loadFields();
    } catch (e) {
      console.error('Update error:', e);
    }
  };

  // Otkaži edit
  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', area: '', soilType: '', location: '', season: 2025 });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Parcele</h2>

      <Card title={editingId ? 'Izmena parcele' : 'Dodaj parcelu'}>
        <Input label="Naziv" name="name" value={form.name} onChange={handleChange} />
        <Input label="Površina (ha)" name="area" value={form.area} onChange={handleChange} />
        <Input label="Tip zemljišta" name="soilType" value={form.soilType} onChange={handleChange} />
        <Input label="Lokacija" name="location" value={form.location} onChange={handleChange} />
        <Input label="Sezona" name="season" value={form.season} onChange={handleChange} />
        {editingId ? (
          <>
            <Button onClick={saveEdit}>Sačuvaj izmene</Button>
            <Button onClick={cancelEdit} style={{ marginLeft: '10px' }}>Otkaži</Button>
          </>
        ) : (
          <Button onClick={createField}>Dodaj parcelu</Button>
        )}
      </Card>

      {/* Lista parcela */}
      {fields.length === 0 ? (
        <p className="mt-4">Nema parcela.</p>
      ) : (
        fields.map(f => (
          <Card key={f.id} title={f.name} className="mt-4">
            <p>Površina: {f.area} ha</p>
            <p>Zemljište: {f.soilType}</p>
            <p>Lokacija: {f.location}</p>
            <p>Sezona: {f.season}</p>
            <Button onClick={() => startEdit(f)}>Izmeni</Button>
            <Button onClick={() => removeField(f.id)} style={{ marginLeft: '10px' }}>Obriši</Button>
          </Card>
        ))
      )}
    </div>
  );
}
