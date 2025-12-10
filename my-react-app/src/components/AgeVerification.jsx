// src/components/AgeVerification.jsx
import { useState, useEffect } from 'react';
import styles from '../styles/AgeVerification.module.css';

export default function AgeVerification() {
  const [verified, setVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('ageVerified') === 'true') {
      setVerified(true);
    }
  }, []);

  const openBooking = () => {
    if (verified) {
      document.getElementById('booking-trigger')?.click(); // triggers your original BookingForm popup
    } else {
      setShowPopup(true);
    }
  };

  const confirm = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setVerified(true);
    setShowPopup(false);
    document.getElementById('booking-trigger')?.click(); // opens your original form
  };

  return (
    <>
      {/* Floating Button – only handles age gate */}
      <button onClick={openBooking} className={styles.floatBtn}>
        Book Now
      </button>

      {/* Age Popup */}
      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>18+ Only</h2>
            <p>You must be 18 years or older to continue.</p>
            <div className={styles.btns}>
              <button onClick={confirm} className={styles.yes}>Yes, I'm 18+</button>
              <button onClick={() => window.location.href = 'https://google.com'} className={styles.no}>No, Exit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}