import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import styles from '../assets/css/reservation.module.css'
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { RecommendationService } from '../app/service/RecommendationService'
import { UserContext } from '../app/service/UserContext';
import moment from 'moment';
import 'moment/locale/es'
import { ReservationService } from '../app/service/ReservationService';
import "../assets/css/componentsProduct.css"
import TitleProduct from './TitleProduct';
import PoliticsProduct from './PoliticsProduct';
import Loading from "./Loading";

function CardReservation() {

    const [width, setWidth] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [date, setDate] = useState([]);
    const productId = useParams().id;
    const options = [];
    const reservationService = new ReservationService()
    const token = JSON.parse(localStorage.getItem('token'));
    let minDate = new Date();
    const [reservation, setReservation] = useState({
        startTime: null,
        startDate: null,
        endDate: null,
        product: null,
        user: null
    });
    const [invalidDates, setInvalidDates] = useState([])

    useEffect(() => {
        if (!user) {
            history.push('/')
        }
        function handleResize() {
            setWidth(window.innerWidth)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
    }, [window.innerWidth]);

    useEffect(() => {
        window.scrollTo(0, 0)
        const recomendationsService = new RecommendationService()
        // llamo a la api para conseguir el producto, y luego le ingreso el id del producto al objeto reserva
        recomendationsService.getRecommendationsById(productId).then(product => setData(product))
        recomendationsService.getInvalidDates(productId).then(data => setInvalidDates(data))
        setReservation({
            ...reservation,
            product: {
                id: productId
            },
            user: {
                id: user ? user.id : null
            }
        })
    }, []);

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });

    for (let i = 0; i < 24; i++) {
        if (i < 10) {
            options.push("0" + i + ":00")
        } else {
            options.push(i + ":00")
        }
    }

    //agrego las fechas de entrada y salida a la reserva
    const changeCalendar = (e) => {
        setDate(e.value)
        const dat = { startDate: moment(e.value[0]).format(moment.HTML5_FMT.DATE), endDate: moment(e.value[1]).format(moment.HTML5_FMT.DATE) }
        setReservation({
            ...reservation,
            ...dat
        })
    }

    //agrego a la reserva a enviar el horario de ingreso
    const changeSelector = (e) => {
        setReservation({
            ...reservation,
            startTime: e.target.value
        })
    }

    let errors = [];

    const validate = () => {

        const arrival = document.querySelector("#arrival");
        const arrivalError = document.querySelector("#arrivalError");
        const checkError = document.querySelector("#checkError");

        arrival.value === "Seleccionar hora de llegada" ? (arrivalError.className = styles.error) && (errors.push(1)) : (arrivalError.className = styles.hide);
        reservation.startDate === null || reservation.endDate === null || reservation.startDate === 'Fecha inválida' || reservation.endDate === 'Fecha inválida' ? (checkError.className = styles.error) && (errors.push(1)) : (checkError.className = styles.hide);

    }

    const responseSubmit = (response) => {
        if (response === 201) {
            history.push("/succeed")
        }
        setLoading(false)
    }

    const submitForm = (e) => {
        e.preventDefault()
        validate();
        if (!errors[0]) {
            setLoading(true)
            try {
                reservationService.sendReservation(reservation, token).then(status => responseSubmit(status))
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                    history.push("/denied")
                })
            }
            catch (e) {
                console.log("ERROR" + e);
                setLoading(false)
            }
        }
        errors = [];
    }



    return (
        <>
            {loading ?
                <Loading />
                :
                ""
            }
            <div className={styles.background}>
                <div className={styles.subHeader}>
                    {
                        data.categories ?
                            <TitleProduct category={data.categories.title} name={data.name} />
                            :
                            ""
                    }
                </div>
                <div className={styles.outsideMain}><h3 className={styles.title}>Completá tus datos</h3></div>
                <form data-testid="test-reservation-form">
                    <div className={styles.mainBox}>
                        <div className={styles.leftBox}>
                            <div className={styles.dataBox}>
                                <div className={styles.inputsBox}>
                                    <div className={styles.inputSection}>
                                        <label className={styles.label}>Nombre</label>
                                        <input className={styles.input} type="text" name="name" disabled defaultValue={user ? user.name : ""}></input>
                                    </div>
                                    <div className={styles.inputSection}>
                                        <label className={styles.label}>Apellido</label>
                                        <input className={styles.input} type="text" name="surname" disabled defaultValue={user ? user.lastName : ""}></input>
                                    </div>
                                    <div className={styles.inputSection}>
                                        <label className={styles.label}>Correo electrónico</label>
                                        <input className={styles.input} type="text" name="email" disabled defaultValue={user ? user.email : ""}></input>
                                    </div>
                                    <div className={styles.inputSection}>
                                        <label className={styles.label}>Ciudad</label>
                                        <input className={styles.input} type="text" name="city" placeholder="Ciudad"></input>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.calendarBox}>
                                <h3 className={styles.title}>Seleccioná tu fecha de reserva</h3>
                                <div className={styles.calendar}>
                                    <Calendar inline required dateFormat="dd/mm/yy"
                                        numberOfMonths={width <= 643 ? 1 : 2} name="date"
                                        locale="es"
                                        minDate={minDate}
                                        value={date}
                                        onChange={changeCalendar}
                                        selectionMode="range"
                                        disabledDates={invalidDates ? invalidDates.map(date => new Date(date)) : []} />
                                </div>
                            </div>
                            <div className={styles.arrivalBox}>
                                <h3 className={styles.title}>Tu horario de llegada</h3>
                                <div className={styles.arrivalTime}>
                                    <div className={styles.iconSection}>
                                        <FaCheckCircle className={styles.icon} />
                                        <p>Tu habitación va a estar lista para el check-in entre las 10:00 AM y las 11:00 PM</p>
                                    </div>
                                    <div className={styles.selectSection}>
                                        <label className={styles.label}>Indicá tu horario estimado de llegada</label>
                                        <select id="arrival" onChange={changeSelector} className={styles.input} name="time">
                                            <option disabled selected>Seleccionar hora de llegada</option>
                                            {options.map(option => {
                                                return <option key={option} value={option}>{option}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rightBox}>
                            <h3 className={styles.titleRight}>Detalle de la reserva</h3>
                            <div className={styles.mainRightContainer}>
                                <div className={styles.imageContainer}>
                                    {
                                        data.images ?
                                            <div className={styles.image} style={{ backgroundImage: `url("${data.images[0].url}")` }} />
                                            :
                                            ""
                                    }
                                </div>
                                <div className={styles.mainRight}>
                                    <div className={styles.infoSection}>
                                        <h4 className={styles.categoryNameRight}>{data.categories ? data.categories.title : ""}</h4>
                                        <h3 className={styles.nameRight}>{data.name ? data.name : ""}</h3>
                                        <div className={styles.locationBox}>
                                            <FaMapMarkerAlt className={styles.iconLocation} />
                                            <p className={styles.location}>{data.city ? data.city.name : ""}</p>
                                        </div>
                                    </div>
                                    <div className={styles.checkSection}>
                                        <h5>Check in</h5>
                                        <p id="checkIn">{date[0] ? `${moment(date[0]).format('L')}` : "__/__/__"}</p>
                                    </div>
                                    <div className={styles.checkSection}>
                                        <h5>Check out</h5>
                                        <p id="checkOut">{date[1] ? `${moment(date[1]).format('L')}` : "__/__/__"}</p>
                                    </div>
                                    <div className={styles.buttonBox}>
                                        <p className={styles.hide} id="arrivalError">Debe seleccionar un horario de llegada</p>
                                        <p className={styles.hide} id="checkError">Debe seleccionar una rango de fechas</p>
                                        <button className={styles.button} onClick={submitForm} type="submit">Confirmar reserva</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className={styles.infoBox} data-testid="test-politics">
                    {
                        data.houseRules && data.healthAndSecurity && data.cancellationPolicy?
                            <PoliticsProduct norms={data.houseRules} health={data.healthAndSecurity} politics={data.cancellationPolicy} />
                        :
                        ""
                    }
                </div>
            </div>
        </>
    )
}

export default CardReservation;