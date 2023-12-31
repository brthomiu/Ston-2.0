import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Navigation from './components/navigation/Navigation';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import Loader from './components/Loader';
import { useSyncProfile } from './hooks/authHooks';
import CreateRecipe from './pages/CreateRecipe';
import Introduction from './pages/Introduction';
import Dashboard from './pages/Dashboard';

export function App() {
  const { isLoading, error } = useAuth0();

  // Sync user profile with database
  useSyncProfile();

  return (
    <>
      {error && <h2>Authentication Error</h2>}
      {!error && isLoading && <Loader />}
      {!error && !isLoading && (
        <>
          <Navigation />
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  );
}

export function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
