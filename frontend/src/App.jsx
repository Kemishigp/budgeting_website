// import React from 'react';
// import { AuthProvider } from './context/AuthContext';
// import Transactions from './pages/Transactions';

// function App() {
//   return (
//     <AuthProvider>
//       <Transactions />
//     </AuthProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import Transactions from './pages/Transactions';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route path="/" element={<Navigate to="/signup" replace />} />

          {/* <Route path="/" element={<h1>Welcome! Please login or signup.</h1>} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
