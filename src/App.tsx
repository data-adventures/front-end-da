'use client'

import './App.css'
import Dashboard from "./pages/Home";
import SQLGeneratorPage from './pages/query/query';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DatabasePage from './pages/tools/tools';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/query" element={<SQLGeneratorPage />} />
        <Route path="/tools" element={<DatabasePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
