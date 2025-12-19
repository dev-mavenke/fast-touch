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

  // WHATSAPP BOOKING (your original – working)
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

  // M-PESA PAYMENT – TEST MODE (sandbox)
  const payWithMpesa = async (e) => {
    e.preventDefault();
    if (!name || !phone || !girl || !date || !time) {
      alert('Please fill all required fields');
      return;
    }

    // Format phone to 254XXXXXXXXXX
    const formattedPhone = phone.startsWith('0') ? '254' + phone.slice(1) : 
                          phone.startsWith('254') ? phone : '254' + phone;

    const payload = {
      public_key: "ISPubKey_test_90905444-bba8-44fd-aae0-872f16cc31bd",   // ← GET THIS FROM https://sandbox.intasend.com
      amount: 100,                                            // Test amount (minimum 100 KSh)
      phone_number: formattedPhone,
      currency: "KES",
      first_name: name,
      email: "test@fasttouch.com",
      method: "M-PESA",
      api_ref: `test-${Date.now()}`
    };

    try {
      const response = await fetch('https://sandbox.intasend.com/api/v1/checkout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Payment error: ' + (errorData.message || 'Try again'));
        console.error(errorData);
        return;
      }

      const data = await response.json();

      if (data.url) {
        window.open(data.url, '_blank');
        alert('M-Pesa STK Push sent – check your phone!');
        setIsOpen(false);
      } else {
        alert('Payment failed – no link returned');
        console.error(data);
      }
    } catch (err) {
      alert('Network error – check internet');
      console.error(err);
    }
  };

  return (
    <>
      {/* HIDDEN TRIGGER – for "Contact Us" */}
      <button
        id="open-booking-popup"
        onClick={() => setIsOpen(true)}
        style={{ display: 'none' }}
      />

      {/* FLOATING BUTTON */}
      <button onClick={() => setIsOpen(true)} className={styles.trigger}>
        <FaWhatsapp size={34} />
        <span>Book Now</span>
      </button>

      {/* POPUP */}
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <button onClick={() => setIsOpen(false)} className={styles.close}>
              <FaTimes />
            </button>

            <h2>Book Your Experience</h2>

            <form onSubmit={sendBooking}>
              <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
              <input placeholder="Phone Number (e.g. 0712345678)" value={phone} onChange={e => setPhone(e.target.value)} required />

              <select value={girl} onChange={e => setGirl(e.target.value)} required>
                <option value="">Select Girl</option>
                {girls.map(g => <option key={g}>{g}</option>)}
              </select>

              <div className={styles.toggle}>
                <button type="button" className={type === 'Outcall' ? styles.active : ''} onClick={() => setType('Outcall')}>
                  Outcall
                </button>
                <button type="button" className={type === 'Incall' ? styles.active : ''} onClick={() => setType('Incall')}>
                  Incall
                </button>
              </div>

              {type === 'Outcall' && (
                <select value={location} onChange={e => setLocation(e.target.value)}>
                  <option value="">Your Location (Hotel/Apartment)</option>
                  {locations.map(loc => <option key={loc}>{loc}</option>)}
                </select>
              )}

              <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required />
              <input
                type="time"
                value={time || ''}
                onChange={(e) => setTime(e.target.value)}
                step="60"
                required
              />

              {/* WHATSAPP BUTTON */}
              <button type="submit" className={styles.submit}>
                <FaWhatsapp /> Send Booking via WhatsApp
              </button>

              {/* M-PESA BUTTON (TEST MODE) */}
              <button type="button" onClick={payWithMpesa} className={styles.mpesaBtn}>
                Pay KSh 100 with M-Pesa (Test Mode)
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}