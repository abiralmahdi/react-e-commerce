import React, { useEffect, useState } from "react";
import "./AccountDashboard.css";
import Menus from './Menus'
import AccountCard from './AccountCard'
import Tables from './Tables'
import Settings from './Settings'
import PrivacyPolicy from './PrivacyPolicy'
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";
import Cookies from'universal-cookie'
import axios from 'axios'

function AccountDashboard(props) {

    
    const cookies = new Cookies();
    let userName = cookies.get('username', {path: '/'})

    const [userData, setuserData] = useState('')
    useEffect(()=>{
        async function fetchData() {
            const request = await axios.get(`https://abirs-django-ecommerce-api.herokuapp.com/accounts/fetchSingleUser/${userName}`);  

            setuserData(request.data)
            // console.log(request.data.username)

            localStorage.setItem('userID', request.data.username)
        }
        fetchData()
    }, [])


    const [contents, setcontents] = useState([])
    useEffect(()=>{
        async function fetchData() {
            const request = await axios.get(`https://abirs-django-ecommerce-api.herokuapp.com/fetchIndivPurchases/${localStorage.getItem('userID')}`);  
            setcontents(request.data)
            console.log(request.data)
        }
        fetchData()
    }, [])
    


    const [fav, setfav] = useState([])
    useEffect(()=>{
        async function fetchData() {
            const request = await axios.get(`https://abirs-django-ecommerce-api.herokuapp.com/fetchUsersFavourites/${localStorage.getItem('userID')}`);  
            setfav(request.data)
        }
        fetchData()
    }, [])


    const [orders, setorders] = useState([])
    useEffect(()=>{
        async function fetchData() {
            const request = await axios.get(`https://abirs-django-ecommerce-api.herokuapp.com/fetchIndivOnOrders/${localStorage.getItem('userID')}`);  
            setorders(request.data)
        }
        fetchData()
    }, [])


    function openNavBar(){
        let navbar = document.getElementById('sidenavbar')
        let main = document.getElementById('page-wrapper')
        navbar.style.display = 'flex'
        


    }

    
    function closeNavBar(){
        let navbar = document.getElementById('sidenavbar')
        let main = document.getElementById('page-wrapper')
        navbar.style.display = 'none'
        main.style.marginLeft = '0'



    }



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Router>
      <div id="wrapper">
      <nav className="navbar-default navbar-side" role="navigation" id='sidenavbar' style={{display:'none'}}>
            <div className="sidebar-collapse">
                <ul className="nav" id="main-menu">
                    <button onClick={closeNavBar} className='btn btn-dark ml-auto'><i class="fas fa-window-close"></i></button>
                    <Menus move={props.move} closeNavBar={closeNavBar} title='Dashboard' url='dashboard'/>
                    <Menus move={props.move} closeNavBar={closeNavBar} title='Purchases' url='purchases'/>
                    <Menus move={props.move} closeNavBar={closeNavBar} title='Favourites' url='favourites'/>
                    <Menus move={props.move} closeNavBar={closeNavBar} title='On Order' url='on-order'/>
                    <Menus move={props.move} closeNavBar={closeNavBar} title='Account Settings' url='settings'/>
                    <Menus move={props.move} closeNavBar={closeNavBar} title='Privacy Policy' url='privacy-policy'/>
                </ul>
               
            </div>
            
        </nav>
        
            
            <div id="page-wrapper" style={{marginLeft:'0'}}>
                <div id="page-inner">
                    
                <Switch>
                    <Router basename={process.env.PUBLIC_URL}>
                    <Route exact path='/myAccount/purchases'>
                        <Tables 
                            move={props.move}
                            url={`https://abirs-django-ecommerce-api.herokuapp.com/fetchIndivPurchases/${localStorage.getItem('userID')}`} 
                            title='Purchase Details'
                            rows={['Purchase ID', 'Purchased Items', 'Qty', 'Individual Price', 'Cumulative Price', 'Total Price', 'Date']}
                        />
                    </Route>
                    <Route exact path='/myAccount/favourites'>
                        <Tables 
                            move={props.move}
                            url={`https://abirs-django-ecommerce-api.herokuapp.com/fetchUsersFavourites/${localStorage.getItem('userID')}`}
                            title='My Favourites'
                            rows={['Product ID', 'Name', 'Category', 'SubCategory', 'Actual Price', 'Discount']}
                        />
                    </Route>
                    <Route exact path='/myAccount/on-order'>
                        <Tables
                            move={props.move}
                            url={`https://abirs-django-ecommerce-api.herokuapp.com/fetchIndivOnOrders/${localStorage.getItem('userID')}`} 
                            title='On Orders'
                            rows={['Order ID', 'Purchased Items', 'Qty', 'Individual Price', 'Cumulative Price', 'Total Price', 'Date of Order']}
                        />
                    </Route>
                    <Route exact path='/myAccount/privacy-policy'>
                        <PrivacyPolicy move={props.move}/>
                    </Route>
                    <Route exact path='/myAccount/settings'>
                        <Settings move={props.move}/>
                    </Route>


                    <Route exact path='/myAccount/dashboard'>
                    <div className="row">
                        <div className="col-md-12 d-flex">
                        <button onClick={openNavBar} className='btn btn-light mb-2 mr-3'><i class="fas fa-bars"></i></button>
                        <h2 className='text-dark'>Admin Dashboard</h2>
                        </div>
                    </div>

                
                        <>
                            <hr />
                            <div className='row ml-3'>
                                <AccountCard count={contents.length} title='Purchases' cardType='fa fa-shopping-cart'/>
                                <AccountCard count={fav.length} title='Favourites' cardType='fa fa-heart'/>
                                <AccountCard count={`${userData.moneySpent}`} title='Expenses' cardType='fa fa-dollar'/>
                                <AccountCard count={`${orders.length}`} title='On Orders' cardType='fa fa-dollar'/>

                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-6 col-sm-12 col-xs-12"></div>
                            </div>
                        </>
                    </Route>
                    </Router>
                    </Switch>
                </div>
            </div>
        
      </div>
    </Router>
  );
}

export default AccountDashboard;
