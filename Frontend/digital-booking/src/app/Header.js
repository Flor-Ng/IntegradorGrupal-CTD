import React, {useContext} from 'react'
import styles from '../assets/css/header.module.css';
import Logo from "../assets/img/logo.png";
import { Link, useLocation, useHistory } from 'react-router-dom'
import NavBar from '../components/NavBar';
import { UserContext } from './service/UserContext';

function Header() {

    const {user, setUser} = useContext(UserContext); 
    const history = useHistory();
    let location = useLocation();
    
    const handleClickLogout = (e) => {
        setUser(null);
        localStorage.removeItem("token")
        history.push("/")
    }

    return (
        <div className={styles.header}>
                <Link to="/" className={styles.logo_phr}>
                    <img
                        className={styles.header_icon}
                        src={Logo}
                        alt="Logo"
                    />
                    <p>Sentite como en tu hogar</p>
                </Link>
            <div className={styles.menu}>
                <NavBar />
            </div>
            <div className={styles.log_sign}>
                {
                !user ? 
                    <> 
                        {
                        location.pathname === "/signup" ?
                            <>
                                <Link to="/login" className={styles.logSign} id="login"> Iniciar Sesión </Link>
                            </>
                            : 
                        location.pathname === "/login" ?
                            <>
                                <Link to="/signup" className={styles.logSign} id="signup"> Crear Cuenta </Link>
                            </>
                            : 
                            <>
                                <Link to="/signup" className={styles.logSign} id="signup"> Crear Cuenta </Link>
                                <Link to="/login" className={styles.logSign} id="login"> Iniciar Sesión </Link>
                            </>
                            
                        }
                    </>
                :
                    ""
                    }
                { 
                user && user.authority[0].authority === "ROLE_ADMIN" ?
                    <Link to="/newProduct" className={styles.administration}> Administración </Link>
                :
                    ""
                }
                {
                user ?
                    <div className={styles.user} id="userGreeting">
                        <div className={styles.avatarBox}>
                            <h3 className={styles.avatar}>{user.name[0].toUpperCase()}{user.lastName[0].toUpperCase()}</h3>
                        </div>
                        <div>
                            <div className={styles.logoutBox}><button className={styles.logout} onClick={handleClickLogout}>X</button></div>
                            <p className={styles.greeting}>Hola,</p>
                            <p className={styles.greetingName}>{user.name[0].toUpperCase() + user.name.slice(1)} {user.lastName[0].toUpperCase() + user.lastName.slice(1)}</p>
                        </div>
                    </div>
                :
                    ""
                }
            </div>
        </div>
    )
}

export default Header