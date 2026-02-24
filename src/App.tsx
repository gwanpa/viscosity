import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function AppContent() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState<'home' | 'login' | 'register'>('home');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard onLogout={() => setPage('home')} />;
  }

  if (page === 'login') {
    return (
      <Login
        onRegister={() => setPage('register')}
        onBack={() => setPage('home')}
      />
    );
  }

  if (page === 'register') {
    return (
      <Register
        onLogin={() => setPage('login')}
        onBack={() => setPage('home')}
      />
    );
  }

  return (
    <Homepage
      onLogin={() => setPage('login')}
      onRegister={() => setPage('register')}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
