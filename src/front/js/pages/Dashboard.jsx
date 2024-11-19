import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

export const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState('');

  useEffect(() => {
    actions.getExpenses();
    actions.getApplications();
  }, []);

  const userExpenses = store.expenses?.filter((expense) => {
    if (store.user.is_company_admin) {
      return expense.user_id === store.user.id; 
    }
    return true;
  }) || [];

  const totalExpenses = userExpenses.reduce((total, expense) => total + expense.amount, 0);

  const filteredExpenses = userExpenses.filter((expense) =>
    expense.description.toLowerCase().includes(search.toLowerCase())
  );

  const pendingApplications = store.applications?.filter(application => !application.is_approved).length || 0;

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="container mt-2 border-radius min-vh-100 bg-dark text-secondary">
      <div className="container mt-4">
        <h1 className="mb-4 text-white">Dashboard</h1>

        <div className="row g-4 mb-4">
          {/* Total Expenses */}
          <div className="col-lg-4">
            <div className="card shadow-sm bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Total Expenses</h5>
                <h2 className="card-text">€ {totalExpenses.toFixed(2)}</h2>
                <p className="card-subtitle text-white-50">this month</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm bg-warning text-dark">
              <div className="card-body">
                <h5 className="card-title">Pending Approvals</h5>
                <h2 className="card-text">{pendingApplications}</h2>
                <p className="card-subtitle text-dark-50">requests</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm" style={{ backgroundColor: '#D8110F', color: '#350602' }}>
              <div className="card-body">
                <h5 className="card-title">Budget Usage</h5>
                <h2 className="card-text">{store.budgetUsage}%</h2>
                <div className="progress wave-progress">
                  <div
                    className="progress-bar wave"
                    role="progressbar"
                    style={{ width: `${store.budgetUsage}%`, backgroundColor: '#B10A24', color: '#350602' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-secondary text-white">
            <h5>Recent Expenses</h5>
          </div>
          <div className="card-body">
            <input
              type="search"
              className="form-control mb-3"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)} 
            />
            <ul className="list-group">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={expense.id}>
                    <div>
                      <h6>{expense.description}</h6>
                      <p className="mb-0 text-muted">{formatDate(expense.date)}</p>
                    </div>
                    <h6 className="mb-0">€ {expense.amount.toFixed(2)}</h6>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center">No expenses found.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};