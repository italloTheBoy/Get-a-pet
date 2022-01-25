import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'

import Container from './components/layouts/Container'
import Footer from './components/layouts/Footer'
import Navbar from './components/layouts/Navbar'

import Home  from './components/pages/Home';
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'

function App() {
  return (
    <Router>
      <Navbar />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
