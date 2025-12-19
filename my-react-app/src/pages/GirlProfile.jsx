// src/pages/GirlProfile.jsx
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/GirlProfile.module.css';

const girlsData = [
  { 
    id: 1, 
    name: "Aisha", 
    age: 22, 
    location: "Westlands", 
    photo: "/images/Aisha.jpg", 
    services: ["Full Service", "Deep Throat", "French Kissing", "Anal"], 
    rates: { "1 Hour": "KSh 8,000", "2 Hours": "KSh 15,000", "Overnight": "KSh 40,000" },
    bio: "Classy university girl with a wild side. Loves GFE and making your night unforgettable.",
    height: "5'6\"", bust: "34C", body: "Slim & Curvy"
  },
  { 
    id: 2, 
    name: "Jamila", 
    age: 24, 
    location: "Karen", 
    photo: "/images/Jamila.jpg", 
    services: ["Massage + Full", "Anal Sex", "Threesome", "BDSM"], 
    rates: { "1 Hour": "KSh 10,000", "2 Hours": "KSh 18,000", "Overnight": "KSh 50,000" },
    bio: "Exotic beauty with massage skills. Expert in relaxation and intense pleasure.",
    height: "5'7\"", bust: "36D", body: "Curvy"
  },
  { 
    id: 3, 
    name: "Nia", 
    age: 21, 
    location: "Kileleshwa", 
    photo: "/images/Nia.jpg", 
    services: ["Full Service", "Girlfriend Experience", "Dinner Date", "Oral"], 
    rates: { "1 Hour": "KSh 7,000", "2 Hours": "KSh 13,000", "Overnight": "KSh 35,000" },
    bio: "Sweet and passionate student. Perfect for romantic dates and intimate nights.",
    height: "5'5\"", bust: "32B", body: "Petite"
  },
  { 
    id: 4, 
    name: "Maya", 
    age: 23, 
    location: "Lavington", 
    photo: "/images/Maya.jpg", 
    services: ["Girlfriend Experience", "Anal Sex", "BDSM", "Role Play"], 
    rates: { "1 Hour": "KSh 12,000", "2 Hours": "KSh 22,000", "Overnight": "KSh 60,000" },
    bio: "High-class companion for VIP clients. Discreet, educated, and extremely open-minded.",
    height: "5'8\"", bust: "34D", body: "Athletic"
  },
  { 
    id: 5, 
    name: "Lila", 
    age: 22, 
    location: "Westlands", 
    photo: "/images/Lila.jpg", 
    services: ["Full Service", "Foot Fetish", "Role Play", "CIM"], 
    rates: { "1 Hour": "KSh 8,000", "2 Hours": "KSh 15,000", "Overnight": "KSh 40,000" },
    bio: "Playful and naughty. Loves fetishes and making fantasies come true.",
    height: "5'4\"", bust: "34C", body: "Curvy"
  },
  { 
    id: 6, 
    name: "Sasha", 
    age: 25, 
    location: "CBD", 
    photo: "/images/Sasha.jpg", 
    services: ["Full Service", "CIM", "COB", "Lesbian Shows", "Threesome"], 
    rates: { "1 Hour": "KSh 6,000", "2 Hours": "KSh 11,000", "Overnight": "KSh 30,000" },
    bio: "Experienced and passionate. Available for quick visits or long nights.",
    height: "5'9\"", bust: "36C", body: "Tall & Slim"
  },
  { 
    id: 7, 
    name: "Sophie", 
    age: 23, 
    location: "Mirema", 
    photo: "/images/Sophie.jpg", 
    services: ["All Services", "Overnight", "Webcam Sex", "Couples"], 
    rates: { "1 Hour": "KSh 10,000", "2 Hours": "KSh 18,000", "Overnight": "KSh 50,000" },
    bio: "Your ultimate fantasy girl. No limits, no rush, total satisfaction guaranteed.",
    height: "5'6\"", bust: "34D", body: "Curvy"
  },
];

export default function GirlProfile() {
  const { id } = useParams();
  const girl = girlsData.find(g => g.id === parseInt(id));

  if (!girl) {
    return <div className={styles.notFound}>Girl not found</div>;
  }

  const openBooking = () => {
    document.getElementById('open-booking-popup')?.click();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.gridLayout}>
          {/* Left: Photo */}
          <div className={styles.photoSection}>
            <img src={girl.photo} alt={girl.name} className={styles.mainPhoto} />
          </div>

          {/* Right: Details */}
          <div className={styles.detailsSection}>
            <h1>{girl.name}, {girl.age}</h1>
            <p className={styles.location}>{girl.location} • ● Online Now</p>

            <div className={styles.rates}>
              <h3>Rates</h3>
              {Object.entries(girl.rates).map(([duration, price]) => (
                <p key={duration}><strong>{duration}:</strong> {price}</p>
              ))}
            </div>

            <div className={styles.services}>
              <h3>Services</h3>
              <div className={styles.serviceTags}>
                {girl.services.map(s => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>

            <div className={styles.stats}>
              <p>Height: {girl.height}</p>
              <p>Bust: {girl.bust}</p>
              <p>Body: {girl.body}</p>
            </div>

            <p className={styles.bio}>{girl.bio}</p>

            <button onClick={openBooking} className={styles.bookBtn}>
              Book {girl.name} Now – Instant Reply
            </button>
          </div>
        </div>

        <Link to="/profiles" className={styles.backBtn}>
          ← Back to All Girls
        </Link>
      </div>
    </div>
  );
}