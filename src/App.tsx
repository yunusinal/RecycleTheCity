import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Map from './pages/Map';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Yeşil tonu
    },
    secondary: {
      main: '#1976D2', // Mavi tonu
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
