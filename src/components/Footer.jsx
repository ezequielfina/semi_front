// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} PulseNews. Todos los derechos reservados.
      </p>
      <div style={styles.links}>
        <a href="/" style={styles.link}>Home</a>
        <a href="/bloq-portal" style={styles.link}>Portales</a>
        <a href="/preferencias" style={styles.link}>Preferencias</a>
        <a href="/config" style={styles.link}>Config</a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    borderTop: "1px solid #e0e0e0"
  },
  text: {
    margin: "0 0 10px 0",
    color: "#6c757d",
    fontSize: "14px",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "15px"
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "14px"
  }
};

export default Footer;
