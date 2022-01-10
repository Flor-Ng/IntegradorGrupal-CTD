import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { CategorieService } from '../app/service/CategorieService';
import { CitiesService } from '../app/service/CitiesService';
import { FeaturesService } from '../app/service/FeaturesService';
import { RecommendationService } from '../app/service/RecommendationService';
import styles from '../assets/css/newProduct.module.css'
import TitleProduct from './TitleProduct';
import Loading from "./Loading";
import { UserContext } from '../app/service/UserContext';

function NewProduct() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [cities, setCities] = useState([]);
    const [features, setFeatures] = useState([]);
    const [iconCode, setIconCode] = useState("Código del ícono");
    const [featuresList] = useState([]);
    const [imgsList] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const recommendationService = new RecommendationService();
    const token = JSON.parse(localStorage.getItem('token'));
    const [featureEach, setFeatureEach] = useState({
        name: "",
        icon: ""
    })
    const [imgEach, setImgEach] = useState({
        url: ""
    })
    const [data, setData] = useState({
        name: "",
        description: "",
        categories: {
            id: ""
        },
        city: {
            id: ""
        },
        latitude: null,
        longitude: null,
        features: [],
        houseRules: "",
        healthAndSecurity: "",
        cancellationPolicy: "",
        images: imgsList
    })
    const {user} = useContext(UserContext);
    let errors = [];

    // Llamo a la api para traer las categorias
     useEffect(() => {
        if (!user || user.authority[0].authority !== "ROLE_ADMIN") {
            history.push('/')
        }

         const categorieService = new CategorieService();
         categorieService.getCategories().then(categs => setCategories(categs));

        // Llamo a la api para traer las ciudades
         const citiesService = new CitiesService();
         citiesService.getCities().then(cts => setCities(cts))

         // Llamo a la api para traer las features
         const featuresService = new FeaturesService();
         featuresService.getFeatures().then(ftrs => setFeatures(ftrs))
     },[])

    // Actualizo map de features y imgs
    useEffect(() => {
        setTrigger(false);
    }, [trigger, data])

    // Autocompleto el input del código del ícono y retengo los valores de la feature
    const handleChangeFeature = (e) => {
        setIconCode(e.target.value.split("|")[1]);
        setFeatureEach({
            name: e.target.value.split("|")[0],
            icon: e.target.value.split("|")[1],
            id: e.target.value.split("|")[2]
        })   
    }

    // Guardo la feature en la lista para el map y pido actualización
    const handleClickFeature = () => {
        let isPresent = false;
        featuresList.forEach(ftr => {
            if (ftr.name === featureEach.name) {
                isPresent = true;
            }
        })
        if ((featureEach.name !== "") && (featureEach.name !== "Seleccionar atributo") && !isPresent) {
            featuresList.push(featureEach);
            setTrigger(true);    
        }
        isPresent = false;
        let feature = featuresList.map(feature =>{return {id: feature.id}})
        setData({
            ...data,
            features: feature
        })
    }

    // Elimino la feature de la lista para el map
    const handleClickDeleteFeature = (e) => {
        featuresList.forEach(feature => {
            if ( e.target.value === feature.name) {
                featuresList.splice(featuresList.indexOf(feature), 1)
            }
        })
        let feature = featuresList.map(feature =>{return {id: feature.id}})
        setData({
            ...data,
            features: feature
        })
        setTrigger(true);
    }

    // Retengo el valor de la imagen
    const handleChangeImg = (e) => {
        setImgEach({
            url: e.target.value
        });
    }

    // Guardo la imagen en la lista para el map y pido actualización
    const handleClickImg = () => {
        let isPresent = false;
        imgsList.forEach(img => {
            if (img.url === imgEach.url) {
                isPresent = true;
            }
        })
        if (imgEach.url !== "" && !isPresent) {
            imgsList.push(imgEach);
            setTrigger(true);    
        }
        isPresent = false;
    }

    // Elimino la imagen de la lista para el map
    const handleClickDeleteImg = (e) => {
        imgsList.forEach(img => {
            if ( e.target.value === img.url) {
                imgsList.splice(imgsList.indexOf(img), 1)
            }
        })
        setTrigger(true);
    }

    // Retengo todos los datos para enviar
    const handleChangeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleChangeDataCatOrCity = (e) => {
        setData({
            ...data,
            [e.target.name]: {
                id: e.target.value}
        })
    }

    // Valido los campos del formulario
    const validate = () => {
        const propName = document.querySelector("#propName");
        const propNameError = document.querySelector("#propNameError");
        const category = document.querySelector("#category");
        const categoryError = document.querySelector("#categoryError");
        const address = document.querySelector("#address");
        const addressError = document.querySelector("#addressError");
        const city = document.querySelector("#city");
        const cityError = document.querySelector("#cityError");
        const latitude = document.querySelector("#latitude");
        const latitudeError = document.querySelector("#latitudeError");
        const longitude = document.querySelector("#longitude");
        const longitudeError = document.querySelector("#longitudeError");
        const propDescription = document.querySelector("#propDescription");
        const propDescriptionError = document.querySelector("#propDescriptionError");
        const lengthDescError = document.querySelector("#lengthDescError")
        const info1 = document.querySelector("#info1");
        const info1Error = document.querySelector("#info1Error");
        const info2 = document.querySelector("#info2");
        const info2Error = document.querySelector("#info2Error");
        const info3 = document.querySelector("#info3");
        const info3Error = document.querySelector("#info3Error");
        const feature = document.querySelector("#feature");
        const featureError = document.querySelector("#featureError");
        const img = document.querySelector("#img");
        const imgErrorLength = document.querySelector("#imgErrorLength");

        !data.name ? (propNameError.className = styles.error) && (propName.className = styles.inputError) && errors.push(1) : (propNameError.className = styles.hide) && (propName.className = styles.input);
        !data.categories ? (categoryError.className = styles.error) && (category.className = styles.inputError) && errors.push(1) : (categoryError.className = styles.hide) && (category.className = styles.input);
        !address.value ? (addressError.className = styles.error) && (address.className = styles.inputError) && errors.push(1) : (addressError.className = styles.hide) && (address.className = styles.input);
        !data.city ? (cityError.className = styles.error) && (city.className = styles.inputError) && errors.push(1) : (cityError.className = styles.hide) && (city.className = styles.input);
        !data.latitude ? (latitudeError.className = styles.error) && (latitude.className = styles.inputError) && errors.push(1) : (latitudeError.className = styles.hide) && (latitude.className = styles.input);
        !data.longitude ? (longitudeError.className = styles.error) && (longitude.className = styles.inputError) && errors.push(1) : (longitudeError.className = styles.hide) && (longitude.className = styles.input);
        !data.description ? (propDescriptionError.className = styles.error) && (propDescription.className = styles.textareaError) && errors.push(1) : (propDescriptionError.className = styles.hide) && (propDescription.className = styles.textarea);
        (data.description && data.description.length < 190) ? (lengthDescError.className = styles.error) && (propDescription.className = styles.textareaError) && errors.push(1) : (lengthDescError.className = styles.hide) && (propDescription.className = styles.textarea);
        !data.houseRules ? (info1Error.className = styles.error) && (info1.className = styles.textareaError) && errors.push(1) : (info1Error.className = styles.hide) && (info1.className = styles.textarea);
        !data.healthAndSecurity ? (info2Error.className = styles.error) && (info2.className = styles.textareaError) && errors.push(1) : (info2Error.className = styles.hide) && (info2.className = styles.textarea);
        !data.cancellationPolicy ? (info3Error.className = styles.error) && (info3.className = styles.textareaError) && errors.push(1) : (info3Error.className = styles.hide) && (info3.className = styles.textarea);
        !data.features[0] ? (featureError.className = styles.error) && (feature.className = styles.inputError) && errors.push(1) : (featureError.className = styles.hide) && (feature.className = styles.input);
        !data.images || data.images.length < 5 ? (imgErrorLength.className = styles.error) && (img.className = styles.inputError) && errors.push(1) : (imgErrorLength.className = styles.hide) && (img.className = styles.input);
    }

    // Envío la data del formulario
    const responseSubmit = (response) => {
        if (response === 201) {
            history.push("/newProdSucceed")
        }
        setLoading(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validate();
        if (!errors[0]) {
            setLoading(true)
            try {
                recommendationService.addProduct(data, token).then(status => responseSubmit(status))
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                    history.push("/newProdDenied");
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
        <div className={styles.background}>
            {loading ?
                <Loading />
                :
                ""
            }
            <div className={styles.subHeader}>
                <TitleProduct category="" name="Administración" />
            </div>
            <div className={styles.mainContainer}>
                <h3 className={styles.title}>Crear Propiedad</h3>
                <form  onSubmit={handleSubmit}>
                    <div className={styles.cardContainer}>
                        <div className={styles.dataBox}>
                            <div className={styles.dataSection}>
                                <label className={styles.label}>Nombre de la propiedad</label>
                                <input className={styles.input} name="name" onChange={handleChangeData} id="propName" data-testid="input-property-name"></input>
                                <p className={styles.hide} id="propNameError">Campo obligatorio</p>
                            </div>
                            <div className={styles.dataSection}>
                                <label className={styles.label}>Categoría</label>
                                <select className={styles.input} name="categories" onChange={handleChangeDataCatOrCity} id="category">
                                    <option disabled selected>Seleccionar categoría</option>
                                    {categories.map(category => {
                                        return(
                                            <option key={category.title} value={category.id}>{category.title}</option>
                                        )
                                    })}
                                </select>
                                <p className={styles.hide} id="categoryError">Campo obligatorio</p>
                            </div>
                            <div className={styles.dataSection}>
                                <label className={styles.label}>Dirección</label>
                                <input className={styles.input} name="address" id="address"></input>
                                <p className={styles.hide} id="addressError">Campo obligatorio</p>
                            </div>
                            <div className={styles.dataSection}>
                                <label className={styles.label}>Ciudad</label>
                                <select className={styles.input} name="city" onChange={handleChangeDataCatOrCity} id="city">
                                    <option disabled selected>Seleccionar ciudad</option>
                                    {cities.map(city => {
                                        return(
                                            <option key={city.name} value={city.id}>{`${city.name}, ${city.country}`}</option>
                                        )
                                    })}
                                </select>
                                <p className={styles.hide} id="cityError">Campo obligatorio</p>
                            </div>
                            <div className={styles.dataSection}>
                                <label className={styles.label}>Latitud</label>
                                <input className={styles.input} name="latitude" onChange={handleChangeData} id="latitude"></input>
                                <p className={styles.hide} id="latitudeError">Campo obligatorio</p>
                            </div>
                            <div className={styles.dataSection}>
                                <label className={styles.label}>Longitud</label>
                                <input className={styles.input} name="longitude" onChange={handleChangeData} id="longitude"></input>
                                <p className={styles.hide} id="longitudeError">Campo obligatorio</p>
                            </div>
                            <div className={styles.dataDescription}>
                                <label className={styles.label}>Descripción</label>
                                <textarea className={styles.textarea} name="description" placeholder="Escribir aquí" onChange={handleChangeData} id="propDescription"></textarea>
                                <p className={styles.hide} id="propDescriptionError">Campo obligatorio</p>
                                <p className={styles.hide} id='lengthDescError'>La descripción debe tener al menos 190 caracteres</p>
                            </div>
                        </div>
                        <div className={styles.featuresBox}>
                            <h4 className={styles.subTitle}>Agregar atributos</h4>
                            <div className={styles.featureEach}>
                                <div className={styles.featureSection}>
                                    <div className={styles.featureSectionOne}>
                                        <label className={styles.label}>Nombre</label>
                                        <select className={styles.input} name="iconName" onChange={handleChangeFeature} id="feature">
                                            <option disabled selected>Seleccionar atributo</option>
                                            {/* Ver de deshabilitar las opciones ya elegidas */}
                                            {features.map(feature => {
                                                return(
                                                    <option key={feature.name} value={`${feature.name}|${feature.icon}|${feature.id}`}>{feature.name}</option>
                                                )
                                            })}
                                        </select>
                                        <p className={styles.hide} id="featureError">Campo obligatorio</p>
                                    </div>
                                    <div className={styles.featureSectionTwo}>
                                        <label className={styles.label}>Ícono</label>
                                        <input className={styles.input} name="iconCode" placeholder={iconCode} disabled></input>
                                    </div>
                                </div>
                                <div className={styles.buttonSection}>
                                    <button className={styles.button} type="button" onClick={handleClickFeature}>+</button>
                                </div>
                            </div>
                            {featuresList.map(feature => {
                                return (
                                    <div className={styles.featureEach} key={feature.name}>
                                        <div className={styles.featureSection}>
                                            <div className={styles.featureSectionOne}>
                                                <label className={styles.label}>Nombre</label>
                                                <input className={styles.input} placeholder={feature.name} disabled></input>
                                            </div>
                                            <div className={styles.featureSectionTwo}>
                                                <label className={styles.label}>Ícono</label>
                                                <input className={styles.input} placeholder={feature.icon} disabled></input>
                                            </div>
                                        </div>
                                        <div className={styles.buttonSection}>
                                            <button className={styles.buttonX} type="button" value={feature.name} onClick={handleClickDeleteFeature}>x</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.infoBox}>
                            <h4 className={styles.subTitle}>Políticas del producto</h4>
                            <div className={styles.infoSubBox}>
                                <div className={styles.infoSection}>
                                    <h5 className={styles.infoTitle}>Normas de la casa</h5>
                                    <label className={styles.label}>Descripción</label>
                                    <textarea className={styles.textarea} name="houseRules" placeholder="Escribir aquí" onChange={handleChangeData} id="info1"></textarea>
                                    <p className={styles.hide} id="info1Error">Campo obligatorio</p>
                                </div>
                                <div className={styles.infoSection}>
                                    <h5 className={styles.infoTitle}>Salud y seguridad</h5>
                                    <label className={styles.label}>Descripción</label>
                                    <textarea className={styles.textarea} name="healthAndSecurity" placeholder="Escribir aquí" onChange={handleChangeData} id="info2"></textarea>
                                    <p className={styles.hide} id="info2Error">Campo obligatorio</p>
                                </div>
                                <div className={styles.infoSection}>
                                    <h5 className={styles.infoTitle}>Política de cancelación</h5>
                                    <label className={styles.label}>Descripción</label>
                                    <textarea className={styles.textarea} name="cancellationPolicy" placeholder="Escribir aquí" onChange={handleChangeData} id="info3"></textarea>
                                    <p className={styles.hide} id="info3Error">Campo obligatorio</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.imgBox}>
                            <h4 className={styles.subTitle}>Cargar imágenes</h4>
                            <div className={styles.imgEach}>
                                <div className={styles.imgSection}>
                                    <input className={styles.input} name="imgCode" placeholder="Insertar https://" onChange={handleChangeImg} id="img"></input>
                                    <p className={styles.hide} id="imgErrorLength">Debe ingresar al menos 5 imágenes</p>
                                </div>
                                <div className={styles.buttonSection}>
                                    <button className={styles.button} type="button" onClick={handleClickImg}>+</button>
                                </div>
                            </div>
                            {imgsList.map(img => {
                                return (
                                    <div className={styles.imgEach} key={img.url}>
                                        <div className={styles.imgSection}>
                                            <input className={styles.input} placeholder={img.url} disabled></input>
                                        </div>
                                        <div className={styles.buttonSection}>
                                            <button className={styles.buttonX} type="button" value={img.url} onClick={handleClickDeleteImg}>x</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.btnBox}>
                            <button className={styles.btn} type="submit">Crear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewProduct;