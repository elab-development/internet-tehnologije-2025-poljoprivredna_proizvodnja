import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

export default function Reports() {
  const [year, setYear] = useState('');
  const [fieldId, setFieldId] = useState('');
  const [report, setReport] = useState({ productions: [], expenses: [], totals: {} });

  // useEffect bez warning-a: funkcija definisana unutar useEffect
 useEffect(() => {
  const loadReport = async () => {
    try {
      const res = await api.get('/reports', { params: { year, fieldId } });
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  loadReport();
}, [year, fieldId]); // ✅ sada warning nestaje


  // Funkcija za ručno osvežavanje (klik na dugme)
  const handleLoadReport = async () => {
    try {
      const res = await api.get('/reports', { params: { year, fieldId } });
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <Navbar />
      <h2 className="text-2xl mb-4">Izveštaji</h2>

      {/* Filter panel */}
      <Card title="Filter" className="mb-4">
        <Input label="Godina" value={year} onChange={e => setYear(e.target.value)} />
        <Input label="ID parcele" value={fieldId} onChange={e => setFieldId(e.target.value)} />
        <Button onClick={handleLoadReport}>Primeni filter</Button>
      </Card>

      {/* Produkcija */}
      <Card title="Produkcija" className="mb-4">
        {report.productions.length === 0 ? (
          <p>Nema podataka za proizvodnju.</p>
        ) : (
          <>
            {report.productions.map(p => (
              <p key={p.id}>
                Proizvodnja #{p.id}: Količina semena {p.seedQuantity ?? 0} kg, Prinos {p.yieldKg ?? 0} kg
              </p>
            ))}
            <p><b>Ukupno seme:</b> {report.totals?.totalSeed ?? 0} kg</p>
            <p><b>Ukupno prinos:</b> {report.totals?.totalYield ?? 0} kg</p>
          </>
        )}
      </Card>

      {/* Troškovi */}
      <Card title="Troškovi">
        {report.expenses.length === 0 ? (
          <p>Nema troškova za izabrani period.</p>
        ) : (
          <>
            {report.expenses.map(e => (
              <p key={e.id}>
                Trošak #{e.id}: {e.description ?? '-'} - {e.amount ?? 0} RSD
              </p>
            ))}
            <p><b>Ukupno troškovi:</b> {report.totals?.totalExpenses ?? 0} RSD</p>
          </>
        )}
      </Card>
    </div>
  );
}
