import React, {useState, useEffect} from 'react'
import './Login.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie';
import {Alert} from 'react-bootstrap'

function Login(props) {

    const [usernameState, setusernameState] = useState("")
    const [passwordState, setpasswordState] = useState("")
    const cookies = new Cookies();


    function handleSubmit(e){
        props.move()
          axios.post(`https://abirs-django-ecommerce-api.herokuapp.com/accounts/getAuthToken`, {
            "username":e.target[1].value,
            "password":e.target[2].value,
        })
            .then(res => {

                // console.log(JSON.stringify(res.data));

                if (JSON.stringify(res.data) == '{"detail":"Incorrect credentials"}'){
                    alert('Incorrect credentials')
                }
                else{
                    cookies.set('username', e.target[1].value, { path: '/' });
                    cookies.set('password', e.target[2].value, { path: '/' });
                    cookies.set('token', JSON.stringify(res.data), { path: '/' });
                    
                    const request = axios.get(`https://abirs-django-ecommerce-api.herokuapp.com/accounts/fetchSingleUser/${e.target[1].value}`)
                    .then(
                        request =>
                        {console.log(request.data.username)
                        localStorage.setItem('userID', request.data.username) 
                        window.location.href = '#/react-e-commerce'
                    }
                    ); 
                    
                    // console.log(cookies.get('username'));
                    // console.log(cookies.get('password'));
                    // window.location.href = '/'
                }
            })

        
        
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
        <div className="py-5 my-5">
            <div className="cont">
                <div className="col-md-8 col-md-offset-8 " style={{marginLeft: '20%'}}>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title py-2">Please sign in</h3>
                        </div>                        
                        {
                        messageExists
                        ?
                        <Alert variant="danger" dismissible onClose={removeMessage}>
                            <Alert.Heading><b>{localStorage.getItem('message')}</b></Alert.Heading>
                        </Alert>
                        :
                        <p></p>
                        }

                        <div className="panel-body">
                            <form acceptCharset="UTF-8" role="form" onSubmit={handleSubmit}>
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="E-mail" name="username" onChange={(e) => setusernameState(e.target.value)} type="text"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password" name="password" onChange={(e) => setpasswordState(e.target.value)} type="password"/>
                                    </div>
                                    <label>Don't have an account? </label> <Link to='/registration' style={{color:'blue'}}>Click here to sign up</Link>
                                        <input className="btn btn-lg btn-warning btn-block" type="submit" value="Login"/>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
