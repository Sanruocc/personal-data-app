// src/pages/Transactions.js
import React, { useState, useEffect } from 'react';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from '../utils/dataStorage'; // Import utility functions

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        loadTransactions(); // Load existing transactions from localStorage
    }, []);

    const loadTransactions = () => {
        const data = loadDataFromLocalStorage('transactions');
        if (data) setTransactions(data);
    };

    const addTransaction = () => {
        const newTransaction = { description, amount, date, category };
        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);
        saveDataToLocalStorage(updatedTransactions, 'transactions');
        setDescription('');
        setAmount('');
        setDate('');
        setCategory('');
    };

    return (
        <div>
            <h1>Transactions</h1>
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <button onClick={addTransaction}>Add Transaction</button>
            <h2>Transaction List:</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        <strong>{transaction.description}</strong> | ${transaction.amount} | Date: {transaction.date} | Category: {transaction.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
