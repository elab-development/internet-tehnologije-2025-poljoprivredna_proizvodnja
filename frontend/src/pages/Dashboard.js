import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Poljoprivredni Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <Card title="Njive">
          <Link to="/fields">Upravljaj njivama</Link>
        </Card>

        <Card title="Usevi">
          <Link to="/crops">Upravljaj usevima</Link>
        </Card>

        <Card title="Proizvodnja">
          <Link to="/productions">Upravljaj proizvodnjom</Link>
        </Card>

        <Card title="Troškovi">
          <Link to="/expenses">Upravljaj troškovima</Link>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
