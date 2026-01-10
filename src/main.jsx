import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AlgorithmsInfo from './components/AlgorithmsInfo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* main app - home and other internal pages */}
        <Route path="/*" element={<App />} />

        {/* standalone algorithms info page */}
        <Route
          path="/algorithms"
          element={<AlgorithmsInfo />}
          id="algorithms-page"
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
