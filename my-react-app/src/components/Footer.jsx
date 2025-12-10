import { Link } from 'react-router-dom';
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        Fast Touch © 2025 – Nairobi After Dark
      </p>

      <p className={styles.tagline}>
        Good Girls Go To Heaven • Bad Girls Go To Mirema Us
      </p>

      <p className={styles.discreet}>
        100% Discreet • Real Photos • Available Right Now
      </p>
    </footer>
  );
}

export default Footer;