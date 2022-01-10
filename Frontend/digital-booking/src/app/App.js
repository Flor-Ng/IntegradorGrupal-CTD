import React, {useState, useEffect} from "react";
import Body from './Body';
import styles from '../assets/css/app.module.css';
import Footer from './Footer';
import Header from './Header';
import Home from './home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { UserContext } from './service/UserContext';
import CardProduct from "../components/CardProduct";
import CardReservation from "../components/CardReservation";
import ReservSucceed from "../components/ReservSucceed";
import ReservDenied from "../components/ReservDenied";
import { UserService } from "./service/UserService";
import NewProduct from "../components/NewProduct";
import NewProdSucceed from "../components/NewProdSucceed";
import NewProdDenied from "../components/NewProdDenied";

function App() {
  
  const [user, setUser] = useState(null);
  const userService = new UserService() 
  let token = JSON.parse(localStorage.getItem('token'))
    
  useEffect(() => { 
    if (user === null && token !== null){
      userService.dataUser(token).then(user => setUser(user)) 
    }
    else if (token === null) {
      setUser(null)
    } 
  }, [token]);

  return (
    <UserContext.Provider value={({user, setUser})}>
      <div className={styles.app}>
        <Router>
          <Header />
          <Body>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/signup" exact>
                <Signup />
              </Route>
              <Route path="/product/:id" exact>
                <CardProduct />
              </Route>
              <Route path="/product/:id/reservation" exact>
                <CardReservation />
              </Route>
              <Route path="/succeed" exact>
                <ReservSucceed />
              </Route>
              <Route path="/denied" exact>
                <ReservDenied />
              </Route>
              <Route path="/newProduct" exact>
                <NewProduct />
              </Route>
              <Route path="/newProdSucceed" exact>
                <NewProdSucceed />
              </Route>
              <Route path="/newProdDenied" exact>
                <NewProdDenied />
              </Route>
            </Switch>
          </Body>
          <Footer />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
