import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Navbar from '../components/Navbar';

const initialForm = {
  fieldId: '',
  sowingDate: '',
  seedQuantity: '',
  hybrid: '',
  fertilizationType: '',
  fertilizationQuantity: '',
  fertilizationDate: '',
  protectionType: '',
  irrigationSystem: '',
  waterUsed: '',
  harvestDate: '',
  yieldKg: ''
};

export default function Productions() {
  const [productions, setProductions] = useState([]);
  const [form, setForm] = useState(initialForm);

  // učitaj sve proizvodnje direktno iz API-ja
  const loadProductions = async () => {
    try {
      const res = await api.get('/productions');
      setProductions(res.data); // backend vraća camelCase, nema potrebe za mapiranjem
    } catch (err) {
      console.error('Error loading productions:', err);
    }
  };

  useEffect(() => {
    loadProductions();
  }, []);

  // update forme
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // dodaj novu proizvodnju
  const createProduction = async () => {
    try {
      await api.post('/productions', form);
      setForm(initialForm); // reset forme
      loadProductions();    // osveži prikaz
    } catch (err) {
      console.error('Error creating production:', err);
    }
  };

  // obrisi proizvodnju
  const removeProduction = async (id) => {
    try {
      await api.delete(`/productions/${id}`);
      loadProductions();
    } catch (err) {
      console.error('Error deleting production:', err);
    }
  };

  // funkcija za prikaz datuma
  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '-';

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Proizvodnja kukuruza</h2>

        <Card title="Nova proizvodnja">
          <Input label="Parcela ID" name="fieldId" value={form.fieldId} onChange={handleChange} />
          <Input label="Datum setve" name="sowingDate" type="date" value={form.sowingDate} onChange={handleChange} />
          <Input label="Količina semena (kg)" name="seedQuantity" value={form.seedQuantity} onChange={handleChange} />
          <Input label="Hibrid" name="hybrid" value={form.hybrid} onChange={handleChange} />
          <Input label="Đubrivo" name="fertilizationType" value={form.fertilizationType} onChange={handleChange} />
          <Input label="Količina đubriva" name="fertilizationQuantity" value={form.fertilizationQuantity} onChange={handleChange} />
          <Input label="Datum đubrenja" name="fertilizationDate" type="date" value={form.fertilizationDate} onChange={handleChange} />
          <Input label="Zaštita" name="protectionType" value={form.protectionType} onChange={handleChange} />
          <Input label="Navodnjavanje" name="irrigationSystem" value={form.irrigationSystem} onChange={handleChange} />
          <Input label="Potrošnja vode (m3)" name="waterUsed" value={form.waterUsed} onChange={handleChange} />
          <Input label="Datum žetve" name="harvestDate" type="date" value={form.harvestDate} onChange={handleChange} />
          <Input label="Prinos (kg)" name="yieldKg" value={form.yieldKg} onChange={handleChange} />
          <Button onClick={createProduction}>Sačuvaj proizvodnju</Button>
        </Card>

        {productions.length === 0 ? (
          <p>Još nema proizvodnji.</p>
        ) : (
          productions.map(p => (
            <Card key={p.id} title={`Proizvodnja #${p.id}`}>
              <p>Parcela ID: {p.fieldId ?? '-'}</p>
              <p>Datum setve: {formatDate(p.sowingDate)}</p>
              <p>Količina semena: {p.seedQuantity ?? '-'} kg</p>
              <p>Hibrid: {p.hybrid ?? '-'}</p>
              <p>Đubrivo: {p.fertilizationType ?? '-'} ({p.fertilizationQuantity ?? '-'})</p>
              <p>Datum đubrenja: {formatDate(p.fertilizationDate)}</p>
              <p>Zaštita: {p.protectionType ?? '-'}</p>
              <p>Navodnjavanje: {p.irrigationSystem ?? '-'} ({p.waterUsed ?? '-'} m3)</p>
              <p>Datum žetve: {formatDate(p.harvestDate)}</p>
              <p>Prinos: {p.yieldKg ?? '-'} kg</p>
              <Button onClick={() => removeProduction(p.id)}>Obriši</Button>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
