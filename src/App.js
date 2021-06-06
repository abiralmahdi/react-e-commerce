import './App.css';
import Header from './components/Header'
import  HomeCarousel from './components/HomeCarousel'
import ItemCards from './components/ItemCards'
import Footer from './components/Footer'
import Features from './components/Features'
import ContactForm from './components/ContactForm'
import IndivProduct from './components/IndivProduct'
import AllProds from './components/AllProducts'
import Login from './components/Login'
import Checkout from './components/Checkout'
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import axios from 'axios';
import {URLS} from './components/urls'
import Cookies from 'universal-cookie';
import React, { useState, useEffect } from 'react'
import Registration from './components/Registration';
import CheckoutResults from './components/CheckoutResults';
import AccountDashboard from './components/Dashboard/AccountDashboard'

function App() {
  const [categories, setcategories] = useState([])
  const [loggedIn, setloggedIn] = useState(false)
  
  // States for routing 
  const [prodID, setprodID] = useState()
  const [catID, setcatID] = useState()
  const [subCatID, setsubCatID] = useState()

  //Cart 
  const [cart, setcart] = useState({})

  //State for searching Item
  const [searchedItem, setsearchedItem] = useState()



  // The progressBar function 
  var progressBar = 0;
  function move() {
    if (progressBar == 0) {
      progressBar = 1;
      var elem = document.getElementById("myBar");
      var width = 1;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          progressBar = 0;
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
    }
  }

  const cookies = new Cookies();


    useEffect(() => {
      if (cookies.get('username') != undefined){
        setloggedIn(true)
      }
    }, [loggedIn])

    


  useEffect(()=>{
    async function fetchData() {
        const request = await axios.get(`${URLS}/fetchAllCategories`)
        setcategories(request.data)
    
    }
    
    fetchData()
    
}, [])

useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Header category={setcatID} setprodID={setprodID} subcategory={setsubCatID} searchedItem={searchedItem} setsearchedItem={setsearchedItem} cart={cart} setcart={setcart} move={move}/>
        <Switch>
          <Route exact path='/'>
            <HomeCarousel/>
            {categories.map(
              category => (
                <>
                <ItemCards category={category} setprodID={setprodID} setcatID={setcatID} setsubCatID={setsubCatID} cart={cart} setcart={setcart} move={move}/>
                <Features/>
                </>
                  )
            )}
            <ContactForm move={move}/>
          </Route>

{/* for github pages */}
          <Route exact path='/react-e-commerce'>
            <HomeCarousel/>
            {categories.map(
              category => (
                <>
                <ItemCards category={category} setprodID={setprodID} setcatID={setcatID} setsubCatID={setsubCatID} cart={cart} setcart={setcart} move={move}/>
                <Features/>
                </>
                  )
            )}
            <ContactForm move={move}/>
          </Route>


          <Route exact path='/allProducts'>
            <AllProds/>
          </Route>
          <Route exact path='/products/:category'>
              <AllProds move={move} catID={catID} setcatID={setcatID} setsubCatID={setsubCatID} cart={cart} setcart={setcart}/>
          </Route>
          <Route exact path='/products/:category/:subcategory'>
            <AllProds move={move} catID={catID} subCatID={subCatID} setcatID={setcatID} setsubCatID={setsubCatID} setprodID={setprodID} cart={cart} setcart={setcart}/>
          </Route>
          <Route exact path='/products/:category/:subcategory/:product'>
            <IndivProduct move={move} catID={catID} subCatID={subCatID} prodID={prodID} cart={cart} setcart={setcart}/>
          </Route>

          <Route exact path='/checkout/:user'>
            {
              loggedIn
              ?
              <Checkout move={move}/>
              :
              <Login move={move}/>
            }
          </Route>
          <Route exact path='/login'>
              <Login move={move}/>            
          </Route>
          <Route exact path='/registration'>
            {
              loggedIn === false
              ?
              <Registration move={move}/>
              :
              <h3 className='mt-3 text-center'>Please log out to create a new user</h3>
            }
          </Route>
          <Route exact path='/checkoutSuccess'>
            <CheckoutResults move={move} status='success' urlStatus='Success' message={`Successfully purchased your product. Please visit your account log for more details.`}/>
          </Route> 
          <Route exact path='/checkoutFail'>
            <CheckoutResults move={move} status='danger' urlStatus='Fail' message={`Failed to purchase your product. Please visit your account log for more details. For more information, please send us a message.`}/>
          </Route>  
          <Route exact path='/myAccount/:type'>
            {
              loggedIn === false?
              <Login move={move}/> : 
              <AccountDashboard move={move}/>
            }
              
          </Route>
          
        </Switch>
      </Router>
      <Footer/> 
    </div>
  );
}

export default App;
