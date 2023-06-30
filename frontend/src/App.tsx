import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import { useSyncProfile } from './hooks/authHooks';

export function App() {
  // Sync user profile with database
  useSyncProfile();

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
