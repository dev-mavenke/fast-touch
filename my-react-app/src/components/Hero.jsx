// src/components/Hero.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '../styles/Hero.module.css';

const slides = [
  '/images/Hero-slides1.jpg',
  '/images/Hero-slides2.jpg',
  '/images/Hero-slides3.jpg',
  '/images/Hero-slides4.jpg',
  '/images/Hero-slides5.jpg',
].filter(Boolean);

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Left: Text */}
      <div className={styles.left}>
        <h1 className={styles.title}>
          Welcome to Fast Touch <br />
          <span className={styles.highlight}>Discover Hot, Classy & Sweet in Nairobi</span>
        </h1>
        <p className={styles.description}>
          Petite, outgoing call girls from top universities — perfect for unforgettable nights in Westlands, Karen, Kileleshwa, or your hotel. Incall & outcall available 24/7. Discretion guaranteed.
        </p>
        <Link to="/profiles" className={styles.cta}>
          Browse Vibes
        </Link>
      </div>

      {/* Right: Rotating Slides */}
      <div className={styles.right}>
        {slides.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Hot escort in Nairobi ${index + 1}`}
            className={`${styles.slide} ${index === current ? styles.activeSlide : ''}`}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;