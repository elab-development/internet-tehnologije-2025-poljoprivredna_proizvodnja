import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    fieldId: '',
    productionId: '',
    type: '',
    description: '',
    amount: '',
    date: ''
  });

  // Učitavanje svih troškova
  const loadExpenses = async () => {
    try {
      const res = await api.get('/api/expenses'); // proveri da li je ruta /api/expenses
      setExpenses(res.data);
    } catch (err) {
      console.error('Error loading expenses:', err);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Promena input polja
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Dodavanje novog troška
  const createExpense = async () => {
    if (!form.description || !form.amount) {
      alert('Unesi opis i iznos!');
      return;
    }

    try {
      await api.post('/api/expenses', form);
      setForm({
        fieldId: '',
        productionId: '',
        type: '',
        description: '',
        amount: '',
        date: ''
      });
      loadExpenses();
    } catch (err) {
      console.error('Error creating expense:', err);
    }
  };

  // Brisanje troška
  const removeExpense = async (id) => {
    try {
      await api.delete(`/api/expenses/${id}`);
      loadExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Troškovi</h2>

      {/* Dodavanje novog troška */}
      <Card title="Novi trošak">
        <Input label="Parcela ID" name="fieldId" value={form.fieldId} onChange={handleChange} />
        <Input label="ID proizvodnje" name="productionId" value={form.productionId} onChange={handleChange} />
        <Input label="Tip troška" name="type" value={form.type} onChange={handleChange} />
        <Input label="Opis" name="description" value={form.description} onChange={handleChange} />
        <Input label="Iznos (RSD)" name="amount" type="number" value={form.amount} onChange={handleChange} />
        <Input label="Datum" name="date" type="date" value={form.date} onChange={handleChange} />
        <Button onClick={createExpense}>Dodaj</Button>
      </Card>

      {/* Lista troškova */}
      {expenses.length === 0 ? (
        <p>Još nema troškova.</p>
      ) : (
        expenses.map(e => (
          <Card key={e.id} title={e.description}>
            <p>Tip: {e.type}</p>
            <p>Iznos: {e.amount} RSD</p>
            <p>Parcela: {e.fieldId}, Proizvodnja: {e.productionId}</p>
            <p>Datum: {e.date}</p>
            <Button onClick={() => removeExpense(e.id)}>Obriši</Button>
          </Card>
        ))
      )}
    </div>
  );
};

export default Expenses;
