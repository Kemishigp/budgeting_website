import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getWithToken } from '../api/axiosClient';
import TransactionUpload from '../components/TransactionUpload';
import TransactionTable from '../components/TransactionTable';

const Transactions = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!token) return;

    getWithToken('/transactions', token)
      .then(res => setTransactions(res.data.transactions))
      .catch(err => console.error('Error fetching transactions:', err));
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <TransactionUpload onUpload={setTransactions} />
      {transactions.length > 0 && <TransactionTable data={transactions} />}
    </div>
  );
};

export default Transactions;
