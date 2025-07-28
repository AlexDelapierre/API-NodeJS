
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Header/Navbar/Navbar';
import Home from './pages/Home/Home';
import Ajout from './pages/Ajout/Ajout';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import './assets/styles/global.css';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ajout" element={<Ajout />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
