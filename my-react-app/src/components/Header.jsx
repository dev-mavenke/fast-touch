// src/components/Header.jsx
import { NavLink } from 'react-router-dom';
import styles from '../styles/Header.module.css';

function Header() {
  const openBookingPopup = () => {
    document.getElementById('open-booking-popup')?.click();
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        {/* Logo */}
        <a href="/" className={styles.logoLink}>
          <img src="/logo.png" alt="Fast Touch - Home" className={styles.logo} />
        </a>

        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              end
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profiles"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Profiles
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Services
            </NavLink>
          </li>

          {/* CONTACT US – same style, opens your popup */}
          <li>
            <button
              onClick={openBookingPopup}
              className={`${styles.navLink} ${styles.contactLink}`}
            >
              Contact Us
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;