import { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router';
import styles from '../assets/css/product.module.css'
import { FaMapMarkerAlt, FaHeart, FaShareAlt } from "react-icons/fa";
import { RecommendationService } from '../app/service/RecommendationService'
import { useParams } from 'react-router-dom'
import { Galleria } from 'primereact/galleria';
import { Calendar } from 'primereact/calendar';
import MapComponent from "../components/MapComponent"
import "../assets/css/componentsProduct.css"
import { addLocale } from 'primereact/api';
import PoliticsProduct from './PoliticsProduct';
import TitleProduct from './TitleProduct'
import { UserContext } from '../app/service/UserContext';

function CardProduct () {
    const { user } = useContext(UserContext); 
    const [data, setData] = useState([]);
    const [width, setWidth] = useState(null);
    const [indexImg, setIndexImg] = useState(0);
    const [onShow, setOnshow] = useState(false);
    const product = useParams().id;
    const galleria = useRef(null);
    const history = useHistory();
    let minDate = new Date();
    const [invalidDates, setInvalidDates] = useState([])
    
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

    const responsiveOptions = [
        {
            breakpoint: '1500px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '643px',
            numVisible: 1,
        }
    ];

  const itemTemplate = (item) => {
        return <img alt= "" src={item} style={{ width: '100%', display: 'block' }} />;
    }

   const thumbnailTemplate= (item) => {
        return <img alt= "" src={item} style={{ display: 'block' }} />;
    }

    useEffect(() => {   
        const recomendationsService = new RecommendationService()
        recomendationsService.getRecommendationsById(product).then(data => setData(data))
        recomendationsService.getInvalidDates(product).then(data => setInvalidDates(data))
    }, []);

     useEffect(() => {
         function handleResize() { 
                setWidth(window.innerWidth)
                setIndexImg(0)                             
              } 
        handleResize() 
        if (width>1024) {
            clearInterval(galleria.current.interval)
        }  
        window.addEventListener('resize', handleResize)
    },[window.innerWidth]); 

    const onItemChange = (event) => {
        setIndexImg(event.index)
    } 

    const onShowGal = () => {
        setOnshow(!onShow)
        setIndexImg(0)
    }

    const clickButton = () =>{
        if (!user) {
            history.push("/login", {params: "error"})
        }
        else{
            history.push(`/product/${product}/reservation`)
        }
    }

    return (
        <div>
            <div className={styles.subHeader} data-testid="test-cardproduct">
                {
                data.categories?
                    <TitleProduct category={data.categories.title} name={data.name}/>
                    :
                    ""
                } 
            </div>
            <div className={styles.locationContainer}>
                <div className={styles.locationBox}>
                    <div>
                        <FaMapMarkerAlt className={styles.iconLocation} />
                    </div>
                    <div>
                        {
                        data.city?
                        <>
                        <p className={styles.location}>{data.city.name}</p>
                        <p className={styles.location}>{data.locationTip}</p>
                        </>
                        :
                        ""
                        }
                    </div>    
                </div>
                <div>
                    <p className={styles.location}>Puntuación</p>
                </div>
            </div>
            <div className={styles.phoneFavShare}>
                <div className={styles.iconsBox} >
                    <FaShareAlt className={styles.icons}/>
                    <FaHeart className={styles.icons}/>
                </div>
                {
                    data.images?
                    <>
                        <div className={styles.galBox}>
                            <Galleria className={styles.galleria} ref={galleria} value={data.images.map(img => img.url)} responsiveOptions={responsiveOptions} numVisible={4} style={{ maxWidth: '50%' }}
                            circular fullScreen={width <= 1024 ? false : true} showItemNavigators showThumbnailNavigators={false} showIndicatorsOnItem={true} item={itemTemplate} thumbnail={thumbnailTemplate} 
                            autoPlay={width <= 1024 ? true : false} transitionInterval={3000} activeIndex={indexImg} onItemChange={onItemChange} onShow={onShowGal} onHide={onShowGal}/>
                            {width <= 1024 ? <span className={styles.indexTP}>{indexImg+1}/{data.images.length}</span> : ""}
                        </div>
                        <div className={styles.imgBox}>
                            {width > 1024 ?
                            <>
                            {
                            onShow === true ?
                                <span className={styles.indexDesk}>{indexImg+1}/{data.images.length}</span>
                            :
                                ""
                            }
                            <div className={styles.subImgBox} >
                                <div className={styles.principalImg} style={{ backgroundImage: `url("${data.images[0].url}")` }} onClick={() => galleria.current.show()}/>
                            </div>
                            
                            <div className={styles.subImgBox2}>
                                {
                                    data.images.slice(1, 5).map((e) => <div key={e.url} className={styles.otherImg} style={{ backgroundImage: `url("${e.url}")` }}></div>)
                                }
                                <span onClick={() => galleria.current.show()}>Ver más</span>
                            </div>
                            </>
                            :
                            ""
                            }
                        </div>
                    </>
                    :
                    ""
                    }
            </div>
                <div className={styles.descriptionBox}>
                    <h3 className={styles.descAndDateTitle}>Descripción</h3>
                    <p className={styles.description}>{data.description}</p>
                </div>
                <div className={styles.featuresBox}>
                    <h3 className={styles.title}>¿Qué ofrece este lugar?</h3>
                {
                    data.features?
                        <ul className={styles.features} type="none">{data.features.map(feature => {
                            return <li key={feature.name} className={styles.feature}><i class={feature.icon}></i>{feature.name}</li>
                        })}</ul>
                    :
                        ""
                }
                </div>
                <div className={styles.calendarBox}>
                    <h3 className={styles.descAndDateTitle}>Fechas disponibles</h3>
                    <div className={styles.calendarAndRes}>
                        <Calendar inline numberOfMonths={width <= 643 ? 1 : 2} locale="es" readOnlyInput showOnFocus={false} minDate={minDate} disabledDates={invalidDates ? invalidDates.map(date => new Date(date)) : []}/>               
                        <div className={styles.goReserv}>
                            <p>Agregá tus fechas de viaje para obtener precios exactos</p>
                            <button data-testid="test-button" type="button" onClick={clickButton}> Iniciar reserva </button>
                        </div>
                    </div>
                </div>
                <div className={styles.mapBox}>
                    <h3 className={styles.title}>¿Dónde vas a estar?</h3>
                    <p>{data.location}</p>
                    {
                    data.latitude?
                        <MapComponent latitud={data.latitude} longitud={data.longitude}/>
                    : 
                        ""
                    }
                </div>
                <div className={styles.infoBox}>
                    {
                        data.houseRules && data.healthAndSecurity && data.cancellationPolicy?
                            <PoliticsProduct norms={data.houseRules} health={data.healthAndSecurity} politics={data.cancellationPolicy} />
                        :
                        ""
                    }
                </div>
        </div>
    )

}

export default CardProduct;