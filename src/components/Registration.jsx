import React, { useState, useEffect } from 'react'
import './Login.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Alert} from 'react-bootstrap'


function Registration(props) {
    const [usernameState, setusernameState] = useState("")
    const [passwordState, setpasswordState] = useState("")
    const [fnameState, setfnameState] = useState("")
    const [cpasswordState, setcpasswordState] = useState("")
    const [lnameState, setlnameState] = useState("")
    const [contactState, setcontactState] = useState("")
    const [addressState, setaddressState] = useState("")

    function handleSubmit(e){
        props.move()
        
        if (e.target[6].value === e.target[7].value){
            axios.post(`http://127.0.0.1:8000/accounts/register`, {
                "first_name" : e.target[1].value,
                "last_name" : e.target[2].value,
                "username" : e.target[3].value,
                "password" : e.target[6].value,
                "email" : e.target[3].value,
                "contact": e.target[4].value,
                "address":e.target[5].value
            })
            .then(res => {
                console.log(res.data);
                localStorage.setItem('message', 'Successfully created your account')
                setmessageExists(true)
                alert('Created account successfully! Please go to the Log in page to login to your account')
            })
        }
        else{
            alert('Passwords doesnot match')
        }
          
        e.preventDefault()
    }

    function removeMessage(){
        localStorage.removeItem('message')
        setmessageExists(false)
    }

    const [messageExists, setmessageExists] = useState(false)
    

    useEffect(() => {
        if (localStorage.getItem('message') != undefined){
            setmessageExists(true)
        }
        return messageExists
    }, [messageExists])

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      
    return (
        <div class="py-5 my-5">
            <div class="cont">
                <div class="col-md-8 col-md-offset-8 " style={{marginLeft: '20%'}}>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title py-2">Sign Up</h3>
                        </div>
                        {
                        messageExists
                        ?
                        <Alert variant="danger" dismissible onClose={removeMessage}>
                            <Alert.Heading>{localStorage.getItem('message')}</Alert.Heading>
                        </Alert>
                        :
                        <p></p>
                        }
                        <div class="panel-body">
                            <form accept-charset="UTF-8" role="form" onSubmit={handleSubmit}>
                                <fieldset>
                                    <div class="form-group">
                                        <input class="form-control" placeholder="First Name" name="fname" onChange={(e) => setfnameState(e.target.value)} type="text"/>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Last Name" name="lname" onChange={(e) => setlnameState(e.target.value)} type="text"/>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" placeholder="E-mail" name="username" onChange={(e) => setusernameState(e.target.value)} type="email"/>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Contact" name="contact" onChange={(e) => setcontactState(e.target.value)} type="tel"/>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Address" name="address" onChange={(e) => setaddressState(e.target.value)} type="text"/>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Password" name="password" onChange={(e) => setpasswordState(e.target.value)} type="password"/>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Password" name="cpassword" onChange={(e) => setcpasswordState(e.target.value)} type="password"/>
                                    </div>
                                    <label>Already have an account? </label>  <Link to='/login' style={{color:'blue'}}>Click here to log in</Link>
                                        <input class="btn btn-lg btn-warning btn-block" type="submit" value="Register"/>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
