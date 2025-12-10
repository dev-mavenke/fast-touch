// src/components/Profiles.jsx
import { Link } from 'react-router-dom';
import styles from '../styles/Profiles.module.css';

// FIXED: renamed from "profiles" → "girls" + added image to every girl
const girls = [
  { id: 1, name: "Aisha",   image: "/images/Aisha.jpg",   location: "Westlands",   service: "Full Service" },
  { id: 2, name: "Jamila",  image: "/images/Jamila.jpg",  location: "Karen",       service: "Massage + Full" },
  { id: 3, name: "Nia",     image: "/images/Nia.jpg",     location: "Kileleshwa",  service: "Full Service" },
  { id: 4, name: "Maya",    image: "/images/Maya.jpg",    location: "Lavington",   service: "Girlfriend Experience" },
  { id: 5, name: "Lila",    image: "/images/Lila.jpg",    location: "Westlands",   service: "Full Service" },
  { id: 6, name: "Sasha",   image: "/images/Sasha.jpg",   location: "CBD",         service: "Full Service" },
  { id: 7, name: "Sophie",  image: "/images/Sophie.jpg",  location: "Mirema",      service: "All Services" },
];

function Profiles() {
  return (
    <section className={styles.profiles}>
      <div className={styles.container}>

        <h1 className={styles.title}>Top Escorts in Nairobi</h1>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label>Service:</label>
            <select>
              <option>All</option>
              <option>Full Service</option>
              <option>Massage + Full</option>
              <option>Girlfriend Experience</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Location:</label>
            <select>
              <option>All</option>
              <option>Westlands</option>
              <option>Karen</option>
              <option>Kileleshwa</option>
              <option>Lavington</option>
              <option>Mirema</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {girls.map(girl => (
            <Link to={`/profile/${girl.id}`} key={girl.id} className={styles.card}>
              {/* FIXED: now uses real image */}
              <div 
                className={styles.photo} 
                style={{ backgroundImage: `url(${girl.image || '/images/placeholder.jpg'})` }} 
              />
              <div className={styles.info}>
                <h3>{girl.name}</h3>
                <p>{girl.location} • {girl.service}</p>
                <span className={styles.online}>● Online Now</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Profiles;