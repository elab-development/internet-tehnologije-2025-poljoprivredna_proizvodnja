import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Navbar from '../components/Navbar';

const initialForm = {
  fieldId: '',
  productionId: '',
  type: '',
  description: '',
  amount: '',
  date: ''
};

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(initialForm);

  // učitaj sve troškove
  const loadExpenses = async () => {
    try {
      const res = await api.get('/expenses');
       console.log('Loaded expenses in frontend:', res.data);
      setExpenses(res.data);
    } catch (err) {
      console.error('Error loading expenses:', err);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // update forme
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // dodaj novi trošak
  const createExpense = async () => {
    if (!form.description || !form.amount) {
      alert('Unesi opis i iznos!');
      return;
    }

    try {
      await api.post('/expenses', {
        fieldId: form.fieldId ? Number(form.fieldId) : null,
        productionId: form.productionId ? Number(form.productionId) : null,
        type: form.type,
        description: form.description,
        amount: Number(form.amount),
        date: form.date ? new Date(form.date + 'T00:00:00').toISOString() : null
      });

      setForm(initialForm);
      loadExpenses();
    } catch (err) {
      console.error('Error creating expense:', err.response?.data || err);
    }
  };

  // obrisi trošak
  const removeExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      loadExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  // formatiranje datuma
  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '-';

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Troškovi</h2>

        <Card title="Novi trošak">
          <Input label="Parcela ID" name="fieldId" value={form.fieldId} onChange={handleChange} />
          <Input label="ID proizvodnje" name="productionId" value={form.productionId} onChange={handleChange} />
          <Input label="Tip troška" name="type" value={form.type} onChange={handleChange} />
          <Input label="Opis" name="description" value={form.description} onChange={handleChange} />
          <Input label="Iznos (RSD)" name="amount" type="number" value={form.amount} onChange={handleChange} />
          <Input label="Datum" name="date" type="date" value={form.date} onChange={handleChange} />
          <Button onClick={createExpense}>Dodaj trošak</Button>
        </Card>

        {expenses.length === 0 ? (
          <p>Još nema troškova.</p>
        ) : (
          expenses.map(e => (
            <Card key={e.id} title={`Trošak #${e.id}`}>
              <p>Tip: {e.type ?? '-'}</p>
              <p>Iznos: {e.amount ?? '-'} RSD</p>
              <p>Parcela: {e.fieldId ?? '-'}, Proizvodnja: {e.productionId ?? '-'}</p>
              <p>Datum: {formatDate(e.date)}</p>
              <Button onClick={() => removeExpense(e.id)}>Obriši</Button>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
