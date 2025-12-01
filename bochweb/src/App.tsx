import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
