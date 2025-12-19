// src/pages/AdminPanel.jsx
import { useState, useEffect } from 'react';
import styles from '../styles/AdminPanel.module.css';
import { db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const ADMIN_PASSWORD = "fasttouch2025";   // ← CHANGE THIS TO YOUR STRONG PASSWORD

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticated) {
      fetchApplications();
    }
  }, [authenticated]);

  const fetchApplications = async () => {
    try {
      const snapshot = await getDocs(collection(db, "girls"));
      const apps = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(apps);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const login = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  const approve = async (id) => {
    await updateDoc(doc(db, "girls", id), { approved: true });
    fetchApplications();
  };

  const reject = async (id) => {
    if (window.confirm('Delete this application?')) {
      await deleteDoc(doc(db, "girls", id));
      fetchApplications();
    }
  };

  if (!authenticated) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginBox}>
          <h2>Admin Login</h2>
          <form onSubmit={login}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <div className={styles.loading}>Loading applications...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Admin Panel – Girl Applications ({applications.length})</h1>

        {applications.length === 0 ? (
          <p>No applications yet</p>
        ) : (
          <div className={styles.grid}>
            {applications.map(app => (
              <div key={app.id} className={styles.card}>
                <h3>{app.name}, {app.age}</h3>
                <p><strong>Location:</strong> {app.location}</p>
                <p><strong>Phone:</strong> {app.phone}</p>
                <p><strong>Services:</strong> {app.services.join(', ')}</p>
                {app.message && <p><strong>Message:</strong> {app.message}</p>}
                <p><strong>Status:</strong> {app.approved ? 'Approved' : 'Pending'}</p>

                <div className={styles.actions}>
                  {!app.approved && (
                    <button onClick={() => approve(app.id)} className={styles.approve}>
                      Approve
                    </button>
                  )}
                  <button onClick={() => reject(app.id)} className={styles.reject}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}