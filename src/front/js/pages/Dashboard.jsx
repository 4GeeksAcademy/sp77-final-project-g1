import React, { useState, useEffect } from 'react'
import { Bell, ChevronDown, CreditCard, EuroSign, Home, LogOut, PieChart, Plus, Settings, Users, Upload, Menu, Moon, Sun } from 'lucide-react'

// Simulated API calls (unchanged)
const fetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalExpenses: 24231.89,
        pendingApprovals: 12,
        budgetUsage: 68,
        recentExpenses: [
          { id: 1, date: '2023-06-15', description: 'Office Supplies', amount: 156.78, status: 'Approved' },
          { id: 2, date: '2023-06-14', description: 'Client Lunch', amount: 89.50, status: 'Pending' },
          { id: 3, date: '2023-06-13', description: 'Software License', amount: 599.99, status: 'Rejected' },
        ],
        expensesByCategory: [
          { category: 'Office Supplies', amount: 1500 },
          { category: 'Travel', amount: 3000 },
          { category: 'Software', amount: 2500 },
          { category: 'Marketing', amount: 1800 },
          { category: 'Utilities', amount: 1200 },
        ]
      })
    }, 1000)
  })
}

const searchExpenses = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredExpenses = [
        { id: 1, date: '2023-06-15', description: 'Office Supplies', amount: 156.78, status: 'Approved' },
        { id: 2, date: '2023-06-14', description: 'Client Lunch', amount: 89.50, status: 'Pending' },
        { id: 3, date: '2023-06-13', description: 'Software License', amount: 599.99, status: 'Rejected' },
      ].filter(expense => 
        expense.description.toLowerCase().includes(query.toLowerCase()) ||
        expense.amount.toString().includes(query)
      )
      resolve(filteredExpenses)
    }, 300)
  })
}

const addNewExpense = (expenseData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('New expense added:', expenseData)
      resolve({ success: true, message: 'Expense added successfully' })
    }, 1000)
  })
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalExpenses: 0,
    pendingApprovals: 0,
    budgetUsage: 0,
    recentExpenses: [],
    expensesByCategory: []
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    file: null
  })

  useEffect(() => {
    fetchDashboardData().then((data) => {
      setDashboardData(data)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        searchExpenses(searchQuery).then((expenses) => {
          setDashboardData(prevData => ({ ...prevData, recentExpenses: expenses }))
        })
      } else {
        fetchDashboardData().then((data) => {
          setDashboardData(data)
        })
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center min-vh-100">Loading...</div>
  }

  return (
    <div className="min-vh-100 bg-dark text-secondary">     
      <div className="container mt-4">
        <h1 className="mb-4">Dashboard</h1>
        
        {/* Dashboard summary */}
        <div className="row g-4 mb-4">
          {/* Total Expenses */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Total Expenses</h5>
                <h2 className="card-text">${dashboardData.totalExpenses.toFixed(2)}</h2>
                <p className="card-subtitle text-muted">+20.1% from last month</p>
              </div>
            </div>
          </div>
          {/* Pending Approvals */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Pending Approvals</h5>
                <h2 className="card-text">{dashboardData.pendingApprovals}</h2>
                <p className="card-subtitle text-muted">3 urgent requests</p>
              </div>
            </div>
          </div>
          {/* Budget Usage */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Budget Usage</h5>
                <h2 className="card-text">{dashboardData.budgetUsage}%</h2>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{ width: `${dashboardData.budgetUsage}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="card shadow-sm mb-4">
          <div className="card-header">
            <h5>Recent Expenses</h5>
          </div>
          <div className="card-body">
            <input
              type="search"
              className="form-control mb-3"
              placeholder="Search expenses"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <ul className="list-group">
              {dashboardData.recentExpenses.map(expense => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={expense.id}>
                  <div>
                    <h6>{expense.description}</h6>
                    <p className="mb-0 text-muted">{expense.date}</p>
                  </div>
                  <span className={`badge ${expense.status === 'Approved' ? 'bg-success' : expense.status === 'Pending' ? 'bg-warning' : 'bg-danger'}`}>
                    {expense.status}
                  </span>
                  <h6 className="mb-0">${expense.amount.toFixed(2)}</h6>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}