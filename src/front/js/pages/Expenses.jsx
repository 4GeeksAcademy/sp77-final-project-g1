import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { HandCoins } from 'lucide-react';
import { useNavigate } from "react-router-dom";


export const Expenses = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    file: null,
  });
  const [expenseFilter, setExpenseFilter] = useState('');
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const handleAddExpense = async (event) => {
    event.preventDefault();
    setIsAddingExpense(true);
    const dataToSend = {
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date,
      file: newExpense.file,
    };
    await actions.addExpenses(dataToSend);
    setShowModal(false);
    await actions.getExpenses();
    setIsAddingExpense(false);
  };

  const handleNewExpenseChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewExpense((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const inputChange = (e) => {
    setExpenseFilter(e.target.value);
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('es-ES');
  };

  const handleEditExpense = async (expense) => {
    actions.setCurrentApplication(expense);
    navigate('/edit-expense');
  }

  useEffect(() => {
    actions.getExpenses();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex bg-dark justify-content-between align-items-center">
          <h5>Expenses</h5>
          <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
            <i className="fa fa-plus mr-2"></i> Add Expense
          </button>
        </div>
        <div className="card-body">
          <input
            type="search"
            className="form-control mb-4"
            placeholder="Search expenses..."
            value={expenseFilter}
            onChange={inputChange}
          />

          {/* Tabla de Applications */}
          {store.expenses && store.expenses.length > 0 ? (
            <table className="table table-striped mt-4">
              <thead>
                <tr>
                  <th className="text-success"></th>
                  <th className="text-success">Monto</th>
                  <th className="text-success">Descripción</th>
                  <th className="text-success">Fecha de Creación</th>
                  <th className="text-success">Archivo Adjunto</th>
                </tr>
              </thead>
              <tbody>
                {store.expenses.map((item) => (
                  <tr key={item.id}>
                    <td><HandCoins className="text-success h-6 w-6" /></td>
                    <td className="text-secondary">{item.amount} €</td>
                    <td className="text-secondary">{item.description}</td>
                    <td className="text-secondary">{formatDate(item.date)}</td>
                    <td className="text-secondary"></td>
                    <td className="text-secondary">
                      <span onClick={() => handleEditExpense(item)}>
                        <i
                          className="fa-regular fa-pen-to-square text-warning"
                          style={{ marginLeft: '11px' }}>
                        </i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='text-secondary'>No applications found</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content text-dark">
              <div className="modal-header bg-dark text-light">
                <h5 className="modal-title">Add New Expense</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Enter the details of the new expense here. Click save when you're done.</p>
                <form onSubmit={handleAddExpense}>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={newExpense.description}
                      onChange={handleNewExpenseChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      value={newExpense.amount}
                      onChange={handleNewExpenseChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={newExpense.date}
                      onChange={handleNewExpenseChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                      Attachment
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="file"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-dark" disabled={isAddingExpense}>
                      {isAddingExpense ? 'Adding...' : 'Add Expense'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};