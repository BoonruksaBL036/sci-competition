import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" style={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    color: "#333",
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  link: {
    fontSize: "1.1rem",
    color: "#007BFF",
    textDecoration: "none",
    padding: "10px 20px",
    border: "1px solid #007BFF",
    borderRadius: "5px",
  },
};

export default NotFound;
