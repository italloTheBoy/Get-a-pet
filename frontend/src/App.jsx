import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Container from './components/layouts/Container'
import Footer from './components/layouts/Footer'
import Navbar from './components/layouts/Navbar'
import Home  from './components/pages/Home';
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Message from './components/layouts/Message';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
