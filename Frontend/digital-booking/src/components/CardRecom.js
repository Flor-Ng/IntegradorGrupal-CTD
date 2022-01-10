import React, { useState, useContext, useEffect } from 'react'
import styles from '../assets/css/recommendations.module.css'
import { FaHeart } from "react-icons/fa"
import { UserContext } from '../app/service/UserContext';
import { Link } from 'react-router-dom'


function CardRecom(props) {

    const {user, setUser} = useContext(UserContext); 
    const { id, img, category, title, location, description } = props;
    const [heart, setHeart] = useState(false)

    useEffect(() =>{
        if (!user) {
            setHeart(false)
        }
        if (user && user.favorites && user.favorites.find(favorite => favorite === title) && !heart) {
            setHeart(true);
        }
        if (user && user.favorites && !user.favorites.find(favorite => favorite === title) && heart) {
            setHeart(false);
        }
    }, [user])

    const handleClick = () =>{
        if(user){
            if (!user.favorites) user.favorites = [];
            if (!heart) {
                user.favorites = user.favorites.concat(title);
            } else {
                user.favorites = user.favorites.filter(favorite => favorite !== title);
            }
            setUser(user);
            setHeart(!heart)
            console.log(user.favorites);
        }
        if(!user){
            alert("Debe iniciar sesión para agregar el alojamiento a favoritos")
        }
    }

    return (
        <div className = {styles.cardRecom}>
            <div className={styles.imgRecom} style={{
                backgroundImage: `url("${img}")`
            }}><FaHeart onClick={handleClick} className={heart ? styles.heartActive : styles.heart}/></div>
            <div className={styles.cardDescription}> 
                <h4 className={styles.cardCatTitl}>{category}</h4>
                <h3 className={styles.cardCatTitl}>{title}</h3>
                <h4 className={styles.cardLoc}>{location}</h4>
                <p className={styles.cardDes}>{description.length>50 ? description.slice(0, 190).concat("..."): description}</p>
                <Link to={`/product/${id}`} className={styles.logo_phr}>
                    <input className={styles.buttonRecom} type="button" value="Ver Más" />
                </Link>
            </div>
        </div>
    )
}

export default CardRecom