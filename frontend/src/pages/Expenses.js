import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';


const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Učitavanje svih troškova
  const loadExpenses = async () => {
    try {
      const res = await api.get('/expenses'); // '/api/expenses' ako tvoj backend koristi /api
      setExpenses(res.data);
    } catch (err) {
      console.error('Error loading expenses:', err);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Dodavanje novog troška
  const createExpense = async () => {
    if (!description || !amount) {
      alert('Unesi opis i iznos!');
      return;
    }

    try {
      await api.post('/expenses', { description, amount });
      setDescription('');
      setAmount('');
      loadExpenses();
    } catch (err) {
      console.error('Error creating expense:', err);
    }
  };

  // Brisanje troška
  const removeExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
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
        <Input label="Opis" value={description} onChange={e => setDescription(e.target.value)} />
        <Input label="Iznos (RSD)" value={amount} onChange={e => setAmount(e.target.value)} />
        <Button onClick={createExpense}>Dodaj</Button>
      </Card>

      {/* Lista troškova */}
      {expenses.length === 0 ? (
        <p>Još nema troškova.</p>
      ) : (
        expenses.map(e => (
          <Card key={e.id} title={e.description}>
            <p>Iznos: {e.amount} RSD</p>
            <Button onClick={() => removeExpense(e.id)}>Obriši</Button>
          </Card>
        ))
      )}
    </div>
  );
};

export default Expenses;
