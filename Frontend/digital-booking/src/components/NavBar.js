import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import styles from '../assets/css/navbar.module.css';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { UserContext } from '../app/service/UserContext';

function NavBar() {

    const [sidebar, setSidebar] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const showSidebar = () => setSidebar(!sidebar);
    const history = useHistory();

    const handleClickLogout = (e) => {
        setUser(null);
        localStorage.removeItem("token")
        history.push("/")
    }

    return (
        <>
            <FiMenu className={styles.navbar} onClick={showSidebar} />
            <nav className={sidebar ? [styles.navMenuActive] : styles.navMenu}>
                <div className={styles.topNav}>
                    <AiOutlineClose className={styles.navbarToggle} onClick={showSidebar} />
                    {
                        !user?
                            <p>Menú</p>
                        :
                            ""
                    }   
                    {
                        user?
                            <div className={styles.avatarBox}>
                                    <h3 className={styles.avatar}>
                                        {user.name[0].concat(user.lastName[0]).toUpperCase()}
                                    </h3>

                                    <div className={styles.helloUser}>
                                        <p className={styles.greeting}>Hola,</p>
                                        <p className={styles.greetingName}>{user.name[0].toUpperCase() + user.name.slice(1)} {user.lastName[0].toUpperCase() + user.lastName.slice(1)}</p>
                                    </div>
                            </div>
                        :
                            ""
                    }
                </div>
                { 
                    user && user.authority[0].authority === "ROLE_ADMIN" ?
                        <Link to="/newProduct" className={styles.administration}> Administración </Link>
                    :
                        ""
                } 
                <div className={!user ? styles.bottomNav: styles.bottomNavLog}>
                          {!user?  
                                <ul className={styles.navMenuItems} >
                                    <li className={styles.navLink}>

                                        <Link to="/login" onClick={showSidebar}>
                                            Iniciar Sesión
                                        </Link>
                                    </li>
                                    <hr />
                                    <li className={styles.navLink} onClick={showSidebar}>
                                        <Link to="/signup">
                                            Crear Cuenta
                                        </Link>
                                    </li>
                                </ul>
                           
                            :
                                <p className={styles.navLogt}>
                                    ¿Deseas <span onClick={handleClickLogout}>cerrar sesión</span>?
                                </p>
                    } 
                <div className={styles.footerNav}>
                    <FaFacebook />
                    <FaLinkedinIn />
                    <FaTwitter />
                    <FaInstagram />
                </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar