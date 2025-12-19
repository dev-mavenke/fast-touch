// src/components/Profiles.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '../styles/Profiles.module.css';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Profiles() {
  const [girls, setGirls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGirls = async () => {
      try {
        const q = query(collection(db, "girls"), where("approved", "==", true));
        const snapshot = await getDocs(q);
        const girlsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGirls(girlsList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching girls:", err);
        setLoading(false);
      }
    };
    fetchGirls();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading girls...</div>;
  }

  return (
    <section className={styles.profiles}>
      <div className={styles.container}>
        <h1 className={styles.title}>Top Escorts in Nairobi</h1>

        <div className={styles.grid}>
          {girls.length === 0 ? (
            <p className={styles.noResults}>No girls available yet</p>
          ) : (
            girls.map(girl => (
              <Link to={`/girl/${girl.id}`} key={girl.id} className={styles.card}>
                <div 
                  className={styles.photo} 
                  style={{ backgroundImage: `url(${girl.photo || '/images/placeholder.jpg'})` }} 
                />
                <div className={styles.info}>
                  <h3>{girl.name}</h3>
                  <p>{girl.location}</p>
                  <p className={styles.service}>{girl.services?.join(', ')}</p>
                  <span className={styles.online}>● Online Now</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Profiles;