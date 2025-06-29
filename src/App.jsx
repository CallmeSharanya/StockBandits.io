import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingLoginPage from './components/LandingLoginPage'
import MABpage from './components/MABpage.jsx';
import TradingViewLanding from './components/Landingpage.jsx';
import Dashboard from './components/Dashboard.jsx';
import MarketSentiment from './components/MarketSentiment.jsx';
import AdvancedAlgorithms from './components/AdvancedAlgorithms.jsx';
import PortfolioOptimizer from './components/PortfolioOptimizer.jsx';
import AdvancedAnalytics from './components/AdvancedAnalytics.jsx';
import Settings from './components/Settings.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TradingViewLanding />} />
        <Route path="/login" element={<LandingLoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mab" element={<MABpage />} />
        <Route path="/sentiment" element={<MarketSentiment />} />
        <Route path="/advanced" element={<AdvancedAlgorithms />} />
        <Route path="/portfolio" element={<PortfolioOptimizer />} />
        <Route path="/analytics" element={<AdvancedAnalytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App
