import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from '../assets/css/signup.module.css';
import { UserService } from "../app/service/UserService";
import Loading from "./Loading";

function Signup() {

    const [data, setData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    })
    const [response, setResponse] = useState({
        status : null,
        data : ""
    })
    const [loading, setLoading] = useState(false)
    const confirmPass = useRef(null);
    const userService = new UserService();
    const history = useHistory()
    let errors = [];


    useEffect( () => {

        if (response.status === 201 && response.data !== "Email already exists") {
                history.push('/login')
            }
        
        
        else if (response.data === "Email already exists") {
            document.querySelector("#errorSameEmail").className = styles.error
            document.querySelector("#inputEmail").className = styles.inputError
        }  
        
    },[response])

    const validate = () => {

        const inputName = document.querySelector("#inputName")
        const errorName = document.querySelector("#errorName")
        const inputSurname = document.querySelector("#inputSurname")
        const errorSurname = document.querySelector("#errorSurname")
        const inputEmail = document.querySelector("#inputEmail")
        const errorEmail = document.querySelector("#errorEmail")
        const inputPassword = document.querySelector("#inputPassword")
        const errorPassword = document.querySelector("#errorPassword")
        const inputConfirmPassword = document.querySelector("#inputConfirmPassword")
        const errorConfirmPassword = document.querySelector("#errorConfirmPassword")
        document.querySelector("#errorSameEmail").className = styles.hide

        !data.name ? (errorName.className = styles.error) && (inputName.className = styles.inputError) && errors.push(1) : (errorName.className = styles.hide) && (inputName.className = styles.input);
        !data.lastName ? (errorSurname.className = styles.error) && (inputSurname.className = styles.inputError) && errors.push(1) : (errorSurname.className = styles.hide) && (inputSurname.className = styles.input);
        !data.email.includes("@") || !data.email.includes(".com") ? (errorEmail.className = styles.error) && (inputEmail.className = styles.inputError) && errors.push(1) : (errorEmail.className = styles.hide) && (inputEmail.className = styles.input);
        data.password.length < 6 ? (errorPassword.className = styles.error) && (inputPassword.className = styles.inputError) && errors.push(1) : (errorPassword.className = styles.hide) && (inputPassword.className = styles.input);
        data.password !== confirmPass.current.value ? (errorConfirmPassword.className = styles.error) && (inputConfirmPassword.className = styles.inputError) && errors.push(1) : (errorConfirmPassword.className = styles.hide) && (inputConfirmPassword.className = styles.input);
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validate();
        if (!errors[0]) {
            setLoading(true)
            try{
               await userService.register(data).then(res => setResponse(res))
               setLoading(false)
            }
            catch(e){
                setLoading(false)
                setResponse(e.response)
            }
        }
        errors = [];
    }

    return(
        <div className={styles.signAll} data-testid="test-signup">
             {loading ?
                <Loading />
            :
                ""
            }
            <div className={styles.box}>
                <h2 className={styles.title}>Crear cuenta</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.box_segment}>
                        <div className={styles.segment}>
                            <label className={styles.label}>Nombre</label>
                            <input className= {styles.input} type="text" name="name" onChange={handleChange} id="inputName"></input>
                            <p className={styles.hide} id="errorName">Campo obligatorio</p>
                        </div>
                        <div className={styles.segment}>
                            <label className={styles.label}>Apellido</label>
                            <input className={styles.input} type="text" name="lastName" onChange={handleChange} id="inputSurname"></input>
                            <p className={styles.hide} id="errorSurname">Campo obligatorio</p>
                        </div>
                    </div>
                    <div className={styles.segment}>
                        <label className={styles.label}>Correo electrónico</label>
                        <input className={styles.input} type="text" name="email" onChange={handleChange} id="inputEmail"></input>
                        <p className={styles.hide} id="errorEmail">Correo electrónico inválido</p>
                        <p className={styles.hide} id="errorSameEmail"> El email ya se encuentra registrado </p>
                    </div>
                    <div className={styles.segment}>
                        <label className={styles.label}>Contraseña</label>
                        <input className={styles.input} type="password" name="password" onChange={handleChange} id="inputPassword"></input>
                        <p className={styles.hide} id="errorPassword">La contraseña debe tener al menos 6 caracteres</p>
                    </div>
                    <div className={styles.segment}>
                        <label className={styles.label}>Confirmar contraseña</label>
                        <input className={styles.input} ref={confirmPass} type="password" name="confirmPassword" onChange={handleChange} id="inputConfirmPassword"></input>
                        <p className={styles.hide} id="errorConfirmPassword">Las contraseñas no coinciden</p>
                    </div>
                    <div className={styles.box_button}>
                    <button className={styles.button} type="submit">Crear cuenta</button>
                    </div>
                </form>
                <p className={styles.redirect}>¿Ya tienes una cuenta? <Link to="/login"><span className="login">Iniciar sesión</span></Link></p>
            </div>
        </div>
    )

}

export default Signup;