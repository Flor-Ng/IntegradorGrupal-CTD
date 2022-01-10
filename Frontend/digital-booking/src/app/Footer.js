import React from 'react';
import styles from '../assets/css/footer.module.css';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        

        <div className={styles.footer}> 
            <div>
                <p className={styles.rights}>@2021 Digital Booking</p>
            </div>
            <div className={styles.footer_icons}>
            <FaFacebook />
            <FaLinkedinIn />
            <FaTwitter />
            <FaInstagram />
            </div>

        </div>
    )
}

export default Footer