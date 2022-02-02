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
import { MyPets } from './components/pages/Pets/MyPets';
import { AddPet } from './components/pages/Pets/AddPet';
import { EditPet } from './components/pages/Pets/EditPet';
import { Pet } from './components/pages/Pets/Pet';

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
            <Route path="/pet/my" element={<MyPets />} /> 
            <Route path="/pet/register" element={<AddPet />} />
            <Route path="/pet/edit/:id" element={<EditPet />} />
            <Route path="/pet/:id" element={<Pet />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
