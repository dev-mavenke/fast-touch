// src/pages/RegisterGirl.jsx
import { useState } from 'react';
import styles from '../styles/RegisterGirl.module.css';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const locations = ['Westlands', 'Karen', 'Kileleshwa', 'Lavington', 'CBD', 'Thika Road', 'Ruiru', 'Mombasa Road'];
const servicesList = [
  'Full Service', 'Anal Sex', 'BDSM', 'Threesome', 'Deep Throat', 'French Kissing',
  'Girlfriend Experience', 'Dinner Date', 'CIM', 'COB', 'Lesbian Shows', 'Foot Fetish',
  'Face Sitting', 'Golden Shower', 'Overnight', 'Stripping', 'Webcam Sex'
];

export default function RegisterGirl() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleServiceChange = (s) => {
    setServices(prev => 
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    if (!name || !age || !location || !phone || services.length === 0) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    const application = {
      name,
      age: Number(age),
      location,
      phone,
      services,
      message: message || '',
      approved: false,
      createdAt: new Date()
    };

    try {
      await addDoc(collection(db, "girls"), application);
      setSuccess(true);
      alert('Application submitted! We will review and contact you soon.');
      setName(''); setAge(''); setLocation(''); setPhone(''); setServices([]); setMessage('');
    } catch (err) {
      alert('Error submitting application – please try again');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Register as Girl</h1>
        <p className={styles.subtitle}>
          Join Nairobi's #1 premium escort directory & earn more tonight
        </p>

        {success && <p className={styles.success}>Application submitted successfully!</p>}

        <form onSubmit={submitApplication} className={styles.form}>
          <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="number" placeholder="Age (18+)" value={age} onChange={e => setAge(e.target.value)} min="18" required />

          <select value={location} onChange={e => setLocation(e.target.value)} required>
            <option value="">Select Your Location</option>
            {locations.map(loc => <option key={loc}>{loc}</option>)}
          </select>

          <input placeholder="WhatsApp Number (e.g. 0712345678)" value={phone} onChange={e => setPhone(e.target.value)} required />

          <div className={styles.services}>
            <p>Select services you offer:</p>
            <div className={styles.checkboxGrid}>
              {servicesList.map(s => (
                <label key={s} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={services.includes(s)}
                    onChange={() => handleServiceChange(s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Additional message (optional)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows="4"
          />

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}