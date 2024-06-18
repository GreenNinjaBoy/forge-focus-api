import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <p>
                <span className={styles.DesktopOnly}>Created by </span>
                Jamie Connell Student of Code Institute
                <span className={styles.DesktopOnly}> for educational purposes only </span>
                <span className={styles.DesktopOnly}>2024</span>
            </p>
            <span>
                <a href="https://github.com/GreenNinjaBoy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my GitHub profile (opens in a new tab)"
                    className={styles.Icons}
                >
                    <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/jamie-connell-995748193/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my linkedin profile (opens in a new tab)"
                    className={styles.Icons}
                >
                    <i className="fa-brands fa-linkedin"></i>
                </a>
            </span>
        </footer>
    )
}


export default Footer