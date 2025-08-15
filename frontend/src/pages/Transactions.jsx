import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       const res = await axiosClient.get('/transactions');
//       setTransactions(res.data.transactions);
//     };
//     fetchTransactions();
//   }, []);

//   return (
//     <div>
//       <h1>Transactions</h1>
//       <ul>
//         {transactions.map((t) => (
//           <li key={t.id}>{t.date} - {t.merchant} - ${t.amount}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Transactions;
export const Transactions = () => {
  return (
    <div>
      <h1>Transactions</h1>
      <p>Transactions list will go here.</p>
    </div>
  );
};
