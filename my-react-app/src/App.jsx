// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Profiles from './components/Profiles';
import Services from './components/Services';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';

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