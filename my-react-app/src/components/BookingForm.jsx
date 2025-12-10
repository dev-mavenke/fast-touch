// src/components/BookingForm.jsx
import { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import styles from '../styles/BookingForm.module.css';

const girls = ['Aisha', 'Jamila', 'Nia', 'Maya', 'Lila', 'Sasha', 'Sophie'];
const locations = ['Westlands', 'Karen', 'Kileleshwa', 'Lavington', 'CBD', 'Thika Road', 'Ruiru', 'Mombasa Road'];

export default function BookingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [girl, setGirl] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Outcall');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const sendBooking = (e) => {
    e.preventDefault();
    if (!name || !phone || !girl || !date || !time) {
      alert('Please fill all required fields');
      return;
    }

    const msg = `NEW BOOKING%0A%0A` +
      `Name: ${name}%0A` +
      `Phone: ${phone}%0A` +
      `Girl: ${girl}%0A` +
      `Service: ${type}%0A` +
      `${type === 'Outcall' ? `Location: ${location || 'Hotel/Apartment'}` : 'Location: Incall (arranged)' }%0A` +
      `Date: ${date}%0A` +
      `Time: ${time}`;

window.open(`https://wa.me/254107316236?text=${msg}`, '_blank'); 
    alert('Booking sent! Check WhatsApp');
    setIsOpen(false);
    setName(''); setPhone(''); setGirl(''); setLocation(''); setDate(''); setTime('');
  };

  return (
    <>
      {/* HIDDEN TRIGGER – LETS "CONTACT US" IN HEADER OPEN THIS POPUP */}
      <button
        id="open-booking-popup"
        onClick={() => setIsOpen(true)}
        style={{ display: 'none' }}
      />

      {/* FLOATING WHATSAPP BUTTON */}
      <button onClick={() => setIsOpen(true)} className={styles.trigger}>
        <FaWhatsapp size={34} />
        <span>Book Now</span>
      </button>

      {/* FULL SCREEN POPUP */}
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <button onClick={() => setIsOpen(false)} className={styles.close}>
              <FaTimes />
            </button>

            <h2>Book Your Experience</h2>

            <form onSubmit={sendBooking}>
              <input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                placeholder="Phone Number (e.g. 0712345678)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <select value={girl} onChange={(e) => setGirl(e.target.value)} required>
                <option value="">Select Girl</option>
                {girls.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>

              {/* Incall / Outcall Toggle */}
              <div className={styles.toggle}>
                <button
                  type="button"
                  className={type === 'Outcall' ? styles.active : ''}
                  onClick={() => setType('Outcall')}
                >
                  Outcall
                </button>
                <button
                  type="button"
                  className={type === 'Incall' ? styles.active : ''}
                  onClick={() => setType('Incall')}
                >
                  Incall
                </button>
              </div>

              {/* Location – only for Outcall */}
              {type === 'Outcall' && (
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">Your Location (Hotel/Apartment)</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              )}

              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

              <button type="submit" className={styles.submit}>
                <FaWhatsapp /> Send Booking via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}