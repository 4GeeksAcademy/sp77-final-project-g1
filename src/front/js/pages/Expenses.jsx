import React, { useState } from 'react';

export const Expenses = ({ expenses = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    file: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const handleAddExpense = (e) => {
    e.preventDefault();
    setIsAddingExpense(true);
    setTimeout(() => {
      setIsAddingExpense(false);
      setShowModal(false);
    }, 1000);
  };

  const handleNewExpenseChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewExpense((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5>Expenses</h5>
          <button className="btn btn-dark" onClick={() => setShowModal(true)}>
            <i className="fa fa-plus mr-2"></i> Add Expense
          </button>
        </div>
        <div className="card-body">
          <input
            type="search"
            className="form-control mb-4"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {expenses
                  .filter((expense) =>
                    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.date}</td>
                      <td>{expense.description}</td>
                      <td>${expense.amount.toFixed(2)}</td>
                      <td>
                        <span
                          className={`badge ${
                            expense.status === 'Approved'
                              ? 'bg-success'
                              : expense.status === 'Pending'
                              ? 'bg-warning'
                              : 'bg-danger'
                          }`}
                        >
                          {expense.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para agregar nuevo gasto */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
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
      )}
    </div>
  );
};