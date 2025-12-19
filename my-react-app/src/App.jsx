// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Profiles from './components/Profiles';
import Services from './components/Services';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import RegisterGirl from './pages/Registergirl';
import GirlProfile from './pages/GirlProfile';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/join" element={<RegisterGirl />} />
          <Route path="/girl/:id" element={<GirlProfile />} />
          <Route path="/admin" element={<AdminPanel />} />

          <Route path="*" element={<Hero />} />  {/* fallback to home */}
        </Routes>
      </main>

      <Footer />

      {/* Your popup stays on every page */}
      <BookingForm />
    </BrowserRouter>
  );
}

export default App;