import React, { useState, useContext, useEffect  } from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import styles from '../assets/css/login.module.css';
import { UserContext } from '../app/service/UserContext';
import { UserService } from "../app/service/UserService";
import Loading from "./Loading";
import { IoIosAlert } from 'react-icons/io'

function Login() {

    const location = useLocation()
    const errorReserv = location.state
    const history = useHistory();
    const { user, setUser } = useContext(UserContext); 
    const [token, setToken] = useState("")
    const userService = new UserService()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    let errors = [];

    const [data, setData] = useState({
        email: "",
        password: ""
    }) 

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            setToken(null)
        }
        if (!user && localStorage.getItem("token") !== null) {
            userService.dataUser(token).then(user => setUser(user))  
        }       
                         
   },[token]); 

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const respAxios = (response) =>{
        localStorage.setItem("token", JSON.stringify(response))
        setToken(response)
        setLoading(false)
        history.push("/")
    }

    const validate = () => {
        const email = document.querySelector("#email");
        const emailError = document.querySelector("#emailError");
        const password = document.querySelector("#password");
        const passwordError = document.querySelector("#passwordError");

        !email.value ? (emailError.className = styles.errorForm) && (email.className = styles.inputError) && errors.push(1) : (emailError.className = styles.hide) && (email.className = styles.input);
        !password.value ? (passwordError.className = styles.errorForm) && (password.className = styles.inputError) && errors.push(1) : (passwordError.className = styles.hide) && (password.className = styles.input);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validate();
        if (!errors[0]) {
            setLoading(true)
            try{
            await userService.login(data).then(res => respAxios(res.data.token))
            }
            catch(e){
                setLoading(false)
                setError("Vuelva a intentarlo, sus credenciales son inválidas")
            }
        }
        errors = [];
    }

    return(
        <div className={styles.box} data-testid="test-login">
            {loading ?
                <Loading />
            :
                ""
            }
            {errorReserv !== undefined ?
                <div className={styles.errorReserv}>
                    <IoIosAlert />
                    <p className={styles.errorReservText}>Para realizar una reserva necesita estar logueado</p>
                </div>
            :
                ""
            }
            <h2 className={styles.title}>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.segment}>
                    <label className={styles.label}>Correo electrónico</label>
                    <input className={styles.input} type="text" name="email" onChange={handleChange} id="email"></input>
                    <p className={styles.hide} id="emailError">Campo obligatorio</p>
                </div>
                <div className={styles.segment}>
                    <label className={styles.label}>Contraseña</label>
                    <input className={styles.input} type="password" name="password" onChange={handleChange} id="password"></input>
                    <p className={styles.hide} id="passwordError">Campo obligatorio</p>
                </div>
                {
                error ?
                <p className={styles.error}>{error}</p>
                :
                ""
                }
                <div className={styles.box_button}>
                <button id="loginButton" className={styles.button} type="submit">Ingresar</button>
                </div>
            </form>
            <p className={styles.redirect}>¿Aún no tienes cuenta? <Link to="/signup"><span className={styles.signup}>Regístrate</span></Link></p>
        </div>
    )
}

export default Login;