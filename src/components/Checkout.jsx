import React, {useEffect, useState} from 'react'
import './Checkout.css'
import axios from 'axios'
import Cookies from 'universal-cookie';

function Checkout() {
    const cookies = new Cookies();
    let cart = JSON.parse(localStorage.getItem('cart'))
    const [userData, setuserData] = useState({})

    if (cart === undefined || cart === null){
        var result = []
      }
      else{
        var result = Object.entries(cart)
      }

      useEffect(()=>{
        async function fetchData() {
            const request = await axios.get(`https://abirs-django-ecommerce-api.herokuapp.com/accounts/fetchSingleUser/${cookies.get('username')}`);
            setuserData(request.data)
        }
        fetchData()
    }, [])
        

    function handlePayment(e){
      axios.post(`https://abirs-django-ecommerce-api.herokuapp.com/payment`, {
        'fname': e.target[0].value,
        'lname': e.target[1].value,
        'username': userData.email,
        'email': e.target[3].value,
        'contact':e.target[4].value,
        'address':e.target[5].value,
        'totalPrice':localStorage.getItem('totalPrice'),
        'purchaseDetails': JSON.stringify(result)
      })
      .then(res => {
        console.log(res.data)
        localStorage.removeItem('cart')
        localStorage.removeItem('totalPrice')
        window.location.href = res.data
      }
      )
      e.preventDefault()
    }


    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    
    return (
    <div className='container'>
    <div className="row">
        <div className="col-md-5 cartDiv order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">{Object.keys(cart).length}</span>
          </h4>
          <div class="alert alert-danger" role="alert">
              <b>The website is still under development and there is a high scope of bugs. Please recheck the items and the price calculations to avoid extra charge. Sorry for the inconvenience!</b>
          </div>

          <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0 col-md-6">Name</h6>
              </div>
              <span className="col-md-2"> <b>Quantity</b>  </span>
              <span className="col-md-4">Total Price</span>
          </li>
          {result != null &&
          result.map(
            item => (
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="col-md-6">{item[1]['name']}</h6>
              </div>
              <span className="col-md-2"> <b>x{item[1]['quantity']}</b>  </span>
              <span className="col-md-4">${item[1]['totalPrice']} </span>
            </li>))}
            
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (BDT)</span>
              <strong>{localStorage.getItem('totalPrice')}</strong>
            </li>
          </ul>

        </div>

        <div className="col-md-7 billingDiv order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" onSubmit={handlePayment}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value={userData.fname} readOnly/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label>Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" value={userData.lname} readOnly/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label >Username</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">@</span>
                </div>
                <input type="text" className="form-control" id="username" placeholder="Username" value={userData.email} readOnly />
                <div className="invalid-feedback" style={{width:'100%'}}>
                  Your username is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label>Email <span className="text-muted">(Optional)</span></label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" value={userData.email} readOnly/>
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label>Contact</label>
              <input type="tel" className="form-control" id="address" placeholder="1234 Main St" value={userData.contact} readOnly />
              <div className="invalid-feedback">
                Please enter your contact.
              </div>
            </div>

            <div className="mb-3">
              <label>Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" value={userData.address} readOnly />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label>Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" value={userData.address} readOnly/>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label>Country</label>
                <select className="custom-select d-block w-100" id="state" >
                  <option value="">Choose...</option>
                  <option>Bangladesh</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label>State</label>
                <select className="custom-select d-block w-100" id="state" >
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label>Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="" />
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            <hr className="mb-4"/>
            <button className="btn btn-dark btn-lg btn-block" type="submit">Continue to checkout</button>
          </form>
        </div>
      </div>
      </div>


    )
}

export default Checkout
