import React, {useState} from 'react'
import './Settings.css'
import {Modal} from 'react-bootstrap'
import Cookies from 'universal-cookie';
import axios from 'axios'

function Settings() {
    const cookies = new Cookies()
    function changePassword(e){
        if (e.target[0].value === cookies.get('password', { path: '/' })){
          if (e.target[1].value === e.target[2].value){
            axios.post(`http://127.0.0.1:8000/accounts/change-password/${cookies.get('username', {path:'/'})}`, {
              "password":e.target[1].value,
              }
            ).then(
                res => {
                  // console.log(res.data.status)
                  if (res.data.status === 'Password Changed'){
                    alert('Password changed successfully. You need to log in again.')
                    cookies.remove('username', { path: '/' })
                    cookies.remove('password', { path: '/' })
                    localStorage.removeItem('userID')
                    localStorage.removeItem('cart')
                    localStorage.setItem('message', 'Passwoed Changed Successfully')
                    window.location.href = '/login'   
                  }
                  else{
                    alert('Internal Server Issue, Please Try again Later')
                  }
            }
            )
          }
          else{
            alert('Passwords do not match')
          }    
    } else{
            alert('Incorrect Password')
        }
        e.preventDefault()
    }


function deactivateAccount(e){
  if (e.target[0].value === cookies.get('password', { path: '/' })){
    axios.post(`http://127.0.0.1:8000/accounts/deactivateID/${cookies.get('username', {path:'/'})}`, {
              "password":e.target[0].value,
              }
            ).then(
                res => {
                  if (res.data.status === 'Deactivated'){
                    alert('Account Deactivated. You can create a new account with the same Email id again.')
                    cookies.remove('username', { path: '/' })
                    cookies.remove('password', { path: '/' })
                    localStorage.removeItem('userID')
                    localStorage.removeItem('cart')
                    localStorage.setItem('message', 'Account Deactivated Successfully')
                    window.location.href = '/login'   
                  }
                  else{
                    alert('Internal Server Issue, Please Try again Later')
                  }  
            })
  }
  else{
    alert('Incorrect Password')
  }
  e.preventDefault()
}



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    
    
    return (
<>
<div class="card text-center mx-auto" style={{width:'90%'}}>
    <div class="card-header">
        <h3 class="card-title">Change Your Password</h3>
    </div>
    <div class="card-body">
      <p class="card-text">
          <form onSubmit={changePassword}>

            <input type="password" name='old-password' placeholder="Enter your old Password" class='form form-control'/>
            <input type="password" name='new-password' placeholder="Enter new Password" class='form form-control mt-3'/>
            <input type="password" name='new-password-confirm' placeholder="Confirm Password" class='form form-control mt-3'/>
            <button class="btn btn-dark mt-4">Change Password</button>
        </form>
      </p>
    </div>
</div>

  <div class="card text-center mx-auto mt-5 mb-24"  style={{width:'90%'}}>
    <div class="card-header">
        <h3 class="card-title">Deactivate your account</h3>
    </div>
    <div class="card-body">
      <p class="card-text">
        <div class="alert alert-danger" role="alert">
            Deactivating your account will remove all of the data and records related to your account from our server <strong>PERMANENTLY</strong>!
          </div>
          <form>
            <button class="btn btn-danger bg-gray-900 border-gray-900 mt-4" type='button' onClick={() => setShow(true)}>Click here to deactivate</button>
        </form>
      </p>
    </div>
  </div>

  <Modal show={show} className='cardd' onHide={handleClose}>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Account Deactivation</h5>
          <button type="button" class="close" onClick={()=>{setShow(false)}}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>
              <form onSubmit={deactivateAccount} >
                  <input type="password" name='password' class='form-control' placeholder="Enter your password"/><br/>
                  <button class='btn btn-danger mx-auto'>Deactivate</button>
              </form>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onClick={()=>{setShow(false)}}>Close</button>
        </div>
      </div>

      </Modal>
</>

    )
}

export default Settings
