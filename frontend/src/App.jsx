import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Transactions from './pages/Transactions';

function App() {
  return (
    <AuthProvider>
      <Transactions />
    </AuthProvider>
  );
}

export default App;
