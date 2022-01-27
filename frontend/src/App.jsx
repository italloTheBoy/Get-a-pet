import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext';
import Navbar from './components/layouts/Navbar'
import Message from './components/layouts/Message';
import Container from './components/layouts/Container'
import Footer from './components/layouts/Footer'
import Home  from './components/pages/Home';
import Register from './components/pages/Auth/Register'
import Login from './components/pages/Auth/Login'
import Profile from './components/pages/User/Profile';

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
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
