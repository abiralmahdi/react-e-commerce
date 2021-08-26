import React, {useState, useEffect} from "react";
import {
  Nav,
  Navbar,
  Form,
  Button,
  FormControl,
  NavDropdown,
  Modal
} from "react-bootstrap";
import "./Header.css";

import axios from 'axios';
import {URLS} from './urls'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';
import Card from './ItemCard'


function Header(props) {
  const cart = JSON.parse(localStorage.getItem('cart'))
  const cookies = new Cookies();

  //ueState for form input 
  const [formInput, setformInput] = useState('')

    useEffect(() => {
      if (cookies.get('username') != undefined){
        props.setloggedIn(true)
      }
    }, [props.loggedIn])

  // Modal States
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

    
    
  function clearCart(){
    localStorage.removeItem('cart')
    localStorage.removeItem('totalPrice')
    setresultt({})
    settotalPrice(0)
  }

  const [resultt, setresultt] = useState([])

  if (cart === null){
    var result = []
  }
  else{
    var result = Object.entries(cart)
  }
    
  useEffect(() => {
    setresultt(result)
    return resultt
  }, [])


  const [quantity, setquantity] = useState([])
  const [totalPrice, settotalPrice] = useState(0)
  let qty = {}


  const [searchResults, setsearchResults] = useState([])

  function handleSearch(e){
    axios.post(`${URLS}/searchItems`, {"input":formInput})
    .then(
      res => {
        console.log(JSON.stringify(res.data))
        setsearchResults(res.data)
        handleShow2()
      }
    )
    e.preventDefault()
  }

  function removeIndivItemFromCart(item){
    let totalPricee = 0
    delete cart[item]
    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(cart))

    for (var i in cart) {
      totalPricee += cart[i]['totalPrice']
    }
    settotalPrice(totalPricee)
    localStorage.setItem('totalPrice', totalPricee)
    setquantity(cart)
    
  }


  
useEffect(() => {
  if (JSON.parse(localStorage.getItem('cart')) !=null){
      let totalPricee = 0
      for (var i in cart) {
        totalPricee += cart[i]['totalPrice']
      }
      settotalPrice(totalPricee)
      localStorage.setItem('totalPrice', totalPricee)
  }
  
  else{
    settotalPrice(0)
  }

}, [])



  function increaseQty(id){
    cart[id]['quantity'] = cart[id]['quantity'] + 1
    cart[id]['totalPrice'] = cart[id]['quantity']*cart[id]['price']

    localStorage.setItem('cart', JSON.stringify(cart))
    qty[id] = JSON.parse(localStorage.getItem('cart'))[id]['quantity']
    let totalPricee = 0

    for (var i in cart) {
      totalPricee += cart[i]['totalPrice']
    }
    settotalPrice(totalPricee)
    localStorage.setItem('totalPrice', totalPricee)
    setquantity(cart)
    console.log(quantity)

    }

 function decreaseQty(id){
    cart[id]['quantity'] = cart[id]['quantity'] - 1
    // cart[id]['quantity'] = Math.max(1, cart[id]['quantity'])
    cart[id]['totalPrice'] = cart[id]['quantity']*cart[id]['price']

    localStorage.setItem('cart', JSON.stringify(cart))  
    qty[id] = JSON.parse(localStorage.getItem('cart'))[id]['quantity']
    let totalPricee = 0
    for (var i in cart) {
      totalPricee += cart[id]['totalPrice']
    }
    settotalPrice(totalPricee)
    localStorage.setItem('totalPrice', totalPricee)
    setquantity(cart)
    console.log(quantity)

}
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [categories, setcategories] = useState([])
  const [subcategories, setsubcategories] = useState([])

  useEffect(()=>{
    async function fetchData() {
        const request = await axios.get(`${URLS}/fetchAllCategories`)
        const request2 = await axios.get(`${URLS}/fetchAllSubCategories`)
        setcategories(request.data)
        setsubcategories(request2.data)
    
    }
    fetchData()
}, [])

useEffect(() => {
  if (props.loggedIn === false){
      localStorage.setItem('message', 'Please log in first')
  }
}, [])

function storeCategory(item, item2){
  props.move()
  localStorage.setItem('category',item)
  localStorage.setItem('subcategory',item2)
  props.category(item)
  props.subcategory(item2)
  
}

//styles
let blogStyle = {}
let cartButtonStyle = {}
let nav2Style = {}
if (props.loggedIn){
  blogStyle = {
    paddingTop:'15px'
  }
  cartButtonStyle = {
    paddingTop:'15px'
  }
  nav2Style = {
    marginTop:'60px'
  }
}


// var progressBar = 0;
// function move() {
//   if (progressBar == 0) {
//     progressBar = 1;
//     var elem = document.getElementById("myBar");
//     var width = 1;
//     var id = setInterval(frame, 10);
//     function frame() {
//       if (width >= 100) {
//         clearInterval(id);
//         progressBar = 0;
//       } else {
//         width++;
//         elem.style.width = width + "%";
//       }
//     }
//   }
// }

  return (
    <>
    <div className='fixed-top'>
      <Navbar bg="" variant="dark" id="topNavbar" expand="lg">
        <Navbar.Brand id="NavbarBrand">
          Welcome To Imperia Pastry House (updated)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Link to='#' onClick={props.move} className="navLinks nav-link" style={blogStyle}>
              Blog
            </Link>
            <span href='' className="nav-link navLinks">

              {
            
            props.loggedIn === false?
              <Link to='/login' onClick={props.move} style={{color:'grey'}}>
                Log In
              </Link>
              :
        <> 
          <NavDropdown title={cookies.get('username')} id="accountDropdown">
          <a onClick={
                  () => {
                    cookies.remove('username', { path: '/' });
                    cookies.remove('password', { path: '/' });
                    localStorage.removeItem('userID')
                    localStorage.removeItem('cart')
                    localStorage.setItem('message', 'Logged Out Successfully')
                    props.setloggedIn(false)
                    window.location.href = '#/react-e-commerce/login'
                  }
                }
                    style={{color:'grey'}}
                    
                    >
            <NavDropdown.Item>
              
                  Log Out
             
            </NavDropdown.Item>
          </a>
            <NavDropdown.Item>
              <Link onClick={props.move} to='/myAccount/dashboard' style={{color:'black'}}>
                  My Account
              </Link>
            </NavDropdown.Item>
            </NavDropdown>  
          
        </>

              }
            </span>

            
            <a className="navLinks nav-link" id="cartButton" style={cartButtonStyle} onClick={handleShow}>
              <i
                className="fas fa-shopping-cart"
                style={{ paddingRight: "10px" }}
              ></i>
              Cart ({cart === null ? <>0</>:Object.keys(cart).length})
            </a>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
      <div id="myProgress">
          <div id="myBar"></div>
      </div>
    </div>

      <Navbar bg="" variant="light" style={nav2Style} className="navbarHeader" expand="lg">
          <Navbar.Brand>
            <label id="brandLabel">Imperia</label>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{ paddingLeft: "60px" }}>
              <Link to='/' onClick={props.move} className='nav-link blackLink'>Home</Link>
              {categories.map(
                category => (
                  
              <NavDropdown title={category.name} id="basic-nav-dropdown">
                {subcategories.map(
                  subcategory => (<>
                    {
                    subcategory.category == category.id
                    &&
                    <Link to={`/products/${category.id}/${subcategory.id}`} onClick={() => storeCategory(category.id, subcategory.id)} className='blackLink dropdown-item'>{subcategory.name}</Link>
                    }                    
                  </>
                  )
                )}
              
            </NavDropdown>              
                )
              )}

            </Nav>
            <form className='form form-inline' onSubmit={handleSearch}>
              <input type="text" required placeholder="Search" value={formInput} onChange={e => setformInput(e.target.value)} style={{borderColor:"black"}} className="form-control mr-sm-2" />
              <Button variant="dark" type='submit' onClick={props.move}>Search</Button>
            </form>
          </Navbar.Collapse>
      </Navbar>





    {/* The Cart modal */}
      <Modal show={show} className='cardd' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <h5 className='text-center'>Total Cost : {localStorage.getItem('totalPrice')} /-</h5>
        <div className=' cardBody mt-3 shadow-lg bg-white rounded' style={{width: '100%'}}>
          
          {result != null ?
          result.map(
            item => (
                <div className='row no-gutters'>
                    <div className='col-sm-5'>
                    <img className='card-img' src={`https://abirs-django-ecommerce-api.herokuapp.com${item[1]['image']}`} style={{height:'100%', padding:'10px'}}/>
                    </div>
                    <div className='col-sm-7'>
                      <div className='card-body cart-items'>
                        <h5 className='card-title'><b>{item[1]['name']} </b></h5>
                        <p className='card-text cart-text'>
                          <p ><b>Individual Price: </b>{item[1]['price']}</p>
                          <p className='mb-1'><b>Total Price: </b> Tk. <span id='totPrice'>{item[1]['totalPrice']}</span></p>
                          <button className='removeBtn btn btn-dark btn-sm btn-rounded bg-black' onClick={()=>removeIndivItemFromCart(item[1]['id'])}>Remove</button>
                          <button className='bg-dark' onClick={() => decreaseQty(item[1]['id'])} style={{marginLeft:'10px'}}><i className="fas fa-minus" style={{color:'white'}}></i></button>
                          <span id='vall' style={{paddingLeft:'10px', paddingRight:'10px'}}>
                            {item[1]['quantity']}
                          </span>
                          <button className='bg-dark' onClick={() => increaseQty(item[1]['id'])} ><i className="fas fa-plus" style={{color:'white'}}></i></button>
                        </p>
                      </div>
                    </div>
                </div>
            )
          )
        :
        <h3>
          There are no items in your cart
        </h3>
        }
          <input hidden={true} value={JSON.stringify(result)} readOnly/>
      </div>




        </Modal.Body>
        <Modal.Footer>
          {
          cart === null 
          ? 
          <>
          <Button variant="success" disabled style={{cursor: 'not-allowed'}}>
            Proceed to Checkout
          </Button>
          <Button variant="danger" disabled style={{cursor: 'not-allowed'}}>
            Clear Cart
          </Button>
          </>
          :
          <>
          {
          props.loggedIn === false
          ?
          <a href='/react-e-commerce/#/react-e-commerce/login'>
            <Button variant="success" onClick={
              () => {
                setShow(false); 
                localStorage.setItem('message', 'Please log in to access the checkout page')
                }
              }>
              Proceed to Checkout
            </Button>
          </a>
          :
          <>
          {
          totalPrice === 0
          ?
            <Button variant="success" onClick={() => alert('Please adjust the quantity of the items you want to take')}>
              
                Proceed to Checkout
              
            </Button>
          :
          <Link to={`/checkout/${cookies.get('username')}`}>
            <Button variant="success" onClick={() => setShow(false)}>
              
                Proceed to Checkout
              
            </Button>
          </Link>
          }
          
          </>
          }

          <Button variant="danger" onClick={clearCart}>
            Clear Cart
          </Button>
          </>
          }
        </Modal.Footer>
      </Modal>




      {/* the search modal */}
      <Modal show={show2} onHide={handleClose2} id='searchModal'>
        <Modal.Header closeButton>
          <Modal.Title>You Searched For "{formInput}"</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          
        <>
        <div className='d-flex flex-wrap cardsss'>
            
            {
              JSON.stringify(searchResults) !== '{"status":"No such items found"}'
              ?
              searchResults.map(
                  product =>(
                      <>
                          <Card
                            id={product.id}
                            title={product.product_name} 
                            desc={product.desc} 
                            price={product.presentPrice} 
                            image={`/media/${product.image}`}
                            category={product.category}
                            subcategory={product.sub_category}
                            setcatID={props.setcatID}
                            setprodID={props.setprodID}
                            setsubCatID={props.setsubCatID}
                            cart={props.cart}
                            setcart={props.setcart}
                            handleClick={handleClose2}
                          />
                      
                      </>
                  )
              )
              :
              <p>No Such results found.</p>
            }
            
            

            
        </div>
        </>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>




    </>
  );
}

export default Header;
