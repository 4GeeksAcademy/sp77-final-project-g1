import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

export const Expenses = () => {
  const { store, actions } = useContext(Context);
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
          <div className="list-group">
            <ul className="list-group">
              {store.expenses.length > 0 ? (
                store.expenses.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{item.description}</h6>
                      <small className="text-muted">{formatDate(item.date)}</small>
                    </div>
                    <span
                      className={`badge ${item.status === 'Approved'
                        ? 'bg-success'
                        : item.status === 'Pending'
                          ? 'bg-warning'
                          : 'bg-danger'
                        }`}
                    >
                      {item.status}
                    </span>
                    <div>
                      <p className="badge bg-success rounded-pill">{item.amount.toFixed(2)} €</p>
                    </div>
                  </li>)))
                :
                (<li className="list-group-item text-center text-muted">No expenses found</li>)}
            </ul>
          </div>
        </div>
      </div >
      {
        showModal && (
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
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <select
                        className="form-select"
                        name="category"
                        value={newExpense.category}
                        onChange={handleNewExpenseChange}
                      >
                        <option value="">Select a category</option>
                        <option value="office">Office Supplies</option>
                        <option value="travel">Travel</option>
                        <option value="software">Software</option>
                        <option value="marketing">Marketing</option>
                        <option value="utilities">Utilities</option>
                      </select>
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
        )
      }
    </div >
  );
};