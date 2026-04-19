import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  const location = useLocation();

  return (
    <>
      <nav className="navbar glass-panel">
        <Link to="/" className="nav-brand">
          <GraduationCap className="icon" size={28} />
          <span>EduFeedback</span>
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Feed
          </Link>
          <Link 
            to="/submit" 
            className={`nav-link ${location.pathname === '/submit' ? 'active' : ''}`}
          >
            Submit Review
          </Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<FeedbackList />} />
          <Route path="/submit" element={<FeedbackForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
