import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { getRole, getUserFromToken } from '../services/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Navbar from '../components/Navbar';

export default function Fields() {
  const [fields, setFields] = useState([]);
  const [form, setForm] = useState({
    name: '',
    area: '',
    soilType: '',
    location: '',
    season: 2025
  });
  const [editingId, setEditingId] = useState(null); 
  const [loading, setLoading] = useState(true);

  const user = getUserFromToken();
  const roleId = getRole();
  const canEdit = ![3, 5].includes(roleId); // 3 i 5 su radnik i menadžer

  // Učitavanje parcela
  const loadFields = async () => {
    try {
      const res = await api.get('/fields');
      setFields(res.data);
    } catch (e) {
      console.error('Load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadFields();
    else setLoading(false);
  }, [user]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const createField = async () => {
    if (!canEdit) return alert('Nemate ovlašćenje za dodavanje parcela.');
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

  const removeField = async (id) => {
    if (!canEdit) return alert('Nemate ovlašćenje za brisanje parcela.');
    try {
      await api.delete(`/fields/${id}`);
      loadFields();
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const startEdit = (field) => {
    if (!canEdit) return alert('Nemate ovlašćenje za izmenu parcela.');
    setEditingId(field.id);
    setForm({
      name: field.name,
      area: field.area,
      soilType: field.soilType || '',
      location: field.location,
      season: field.season || 2025
    });
  };

  const saveEdit = async () => {
    if (!canEdit) return alert('Nemate ovlašćenje za izmenu parcela.');
    try {
      await api.put(`/fields/${editingId}`, form);
      setEditingId(null);
      setForm({ name: '', area: '', soilType: '', location: '', season: 2025 });
      loadFields();
    } catch (e) {
      console.error('Update error:', e);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', area: '', soilType: '', location: '', season: 2025 });
  };

  if (!user) return <p className="p-6">Molimo prijavite se da biste videli parcele.</p>;
  if (loading) return <p className="p-6">Učitavanje parcela...</p>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Parcele</h2>

        {canEdit && (
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
        )}

        {fields.length === 0 ? (
          <p className="mt-4">Nema parcela.</p>
        ) : (
          fields.map(f => (
            <Card key={f.id} title={f.name} className="mt-4">
              <p>Površina: {f.area} ha</p>
              <p>Zemljište: {f.soilType}</p>
              <p>Lokacija: {f.location}</p>
              <p>Sezona: {f.season}</p>
              {canEdit && (
                <>
                  <Button onClick={() => startEdit(f)}>Izmeni</Button>
                  <Button onClick={() => removeField(f.id)} style={{ marginLeft: '10px' }}>Obriši</Button>
                </>
              )}
            </Card>
          ))
        )}
      </div>
    </>
  );
}
