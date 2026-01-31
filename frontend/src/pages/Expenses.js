import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';
import { getRole } from '../services/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import ExpensesChart from "../components/ExpensesChart"; // grafikon

import { ROLES } from '../constants/roles';

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
  const [loading, setLoading] = useState(true);

  const roleId = Number(getRole());
  const canAdd = [ROLES.ADMIN, ROLES.MANAGER, ROLES.OWNER, ROLES.RADNIK].includes(roleId);
  const canEditDelete = [ROLES.ADMIN, ROLES.MANAGER, ROLES.OWNER].includes(roleId);
  const canView = roleId !== ROLES.AGRONOM;

  const loadExpenses = useCallback(async () => {
    if (!canView) {
      setExpenses([]);
      setLoading(false);
      return;
    }
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error('Error loading expenses:', err);
    } finally {
      setLoading(false);
    }
  }, [canView]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const removeExpense = async (id) => {
    if (!canEditDelete) return alert('Nemate dozvolu za brisanje troška.');
    try {
      await api.delete(`/expenses/${id}`);
      loadExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '-';

  if (!canView) return <p className="p-6 text-red-600">Nemate pristup ovom delu.</p>;
  if (loading) return <p className="p-6">Učitavanje troškova...</p>;

  return (
    <div className="container p-6">
      <h2 className="text-2xl mb-4">Troškovi</h2>

      {/* Forma za dodavanje novog troška */}
      {canAdd && (
        <Card title="Novi trošak" className="mb-6">
          <Input label="Parcela ID" name="fieldId" value={form.fieldId} onChange={handleChange} />
          <Input label="ID proizvodnje" name="productionId" value={form.productionId} onChange={handleChange} />
          <Input label="Tip troška" name="type" value={form.type} onChange={handleChange} />
          <Input label="Opis" name="description" value={form.description} onChange={handleChange} />
          <Input label="Iznos (RSD)" name="amount" type="number" value={form.amount} onChange={handleChange} />
          <Input label="Datum" name="date" type="date" value={form.date} onChange={handleChange} />
          <Button onClick={createExpense}>Dodaj trošak</Button>
        </Card>
      )}

      {/* Grafik troškova po tipu */}
      {expenses.length > 0 && (
        <Card title="Grafik troškova po tipu" className="mb-6">
          <ExpensesChart expenses={expenses} />
        </Card>
      )}

      {/* Lista troškova */}
      {expenses.length === 0 ? (
        <p>Još nema troškova.</p>
      ) : (
        expenses.map(e => (
          <Card key={e.id} title={`Trošak #${e.id}`} className="mb-4">
            <p>Tip: {e.type ?? '-'}</p>
            <p>Iznos: {e.amount ?? '-'} RSD</p>
            <p>Parcela: {e.fieldId ?? '-'}, Proizvodnja: {e.productionId ?? '-'}</p>
            <p>Datum: {formatDate(e.date)}</p>
            {canEditDelete && <Button onClick={() => removeExpense(e.id)}>Obriši</Button>}
          </Card>
        ))
      )}
    </div>
  );
}
