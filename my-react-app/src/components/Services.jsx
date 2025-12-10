import { Link } from 'react-router-dom';
import styles from '../styles/Services.module.css';
import { FaWhatsapp } from 'react-icons/fa';   // npm install react-icons   (one-time)

function Services() {
  const phone = "+254712345678";   // ← CHANGE TO YOUR REAL WHATSAPP NUMBER

  const services = [
    { name: "Full Service",       desc: "Everything you want – no limits",         price: "KSh 5,000 – 15,000",    emoji: "fire" },
    { name: "Massage + Happy Ending", desc: "Relax then explode",                  price: "KSh 3,000 – 8,000",     emoji: "oil" },
    { name: "Oral Only (BJ)",     desc: "Deep throat, CIM, swallow",               price: "KSh 3,000 – 6,000",     emoji: "lips" },
    { name: "Anal Sex",           desc: "Tight backdoor fun",                      price: "KSh 8,000 – 20,000",    emoji: "peach" },
    { name: "Threesome (2 Girls)",desc: "Double the girls, double the fun",        price: "From KSh 15,000",       emoji: "smiling face with hearts" },
    { name: "Girlfriend Experience", desc: "Kissing, cuddling, real passion",      price: "KSh 10,000+",           emoji: "heart" },
    { name: "Golden Shower",      desc: "Pee play – giving or receiving",          price: "KSh 5,000 extra",       emoji: "droplet" },
    { name: "Overnight (8hrs+)",  desc: "Sleep, fuck, repeat all night",           price: "KSh 25,000 – 50,000",   emoji: "night with stars" },
  ];

  const sendWhatsApp = (serviceName) => {
    const message = `Hey baby fire I'm interested in: *${serviceName}* heart eyes  
Can you send photos, rates & availability tonight? smiling face with hearts`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <h1 className={styles.title}>Our Naughty Services</h1>
        <p className={styles.subtitle}>Discreet • Verified • Available 24/7 in Nairobi & beyond</p>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <div key={i} className={styles.card} onClick={() => sendWhatsApp(s.name)}>
              <div className={styles.icon}>{s.emoji}</div>
              <h3>{s.name}</h3>
              <p className={styles.desc}>{s.desc}</p>
              <div className={styles.price}>{s.price}</div>
              <button className={styles.wabtn}>
                <FaWhatsapp /> Book on WhatsApp
              </button>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>We also serve Thika • Ruiru • Kiambu • Dar es Salaam • Mombasa</p>
          <Link to="/profiles" className={styles.bigbtn}>
            Browse Girls Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Services;