import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import SearchBar from '../components/SearchBar';
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from '../utils/api';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const fetchedTransactions = await getTransactions();
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleCreateTransaction = async (transaction) => {
    try {
      const createdTransaction = await createTransaction(transaction);
      setTransactions([...transactions, createdTransaction]);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const handleUpdateTransaction = async (transaction) => {
    try {
      const updatedTransaction = await updateTransaction(editingTransaction.id, transaction);
      setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleSearch = (query) => {
    // Implement search logic here
    console.log('Searching for:', query);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      <SearchBar onSearch={handleSearch} />
      <TransactionForm
        onSubmit={editingTransaction ? handleUpdateTransaction : handleCreateTransaction}
        initialValues={editingTransaction}
      />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="py-2 px-4 border-b">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{transaction.description}</td>
                <td className="py-2 px-4 border-b">${transaction.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{transaction.category}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => setEditingTransaction(transaction)}
                    className="mr-2 text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;