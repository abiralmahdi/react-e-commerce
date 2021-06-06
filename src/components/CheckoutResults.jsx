import React from 'react'
import {Link} from 'react-router-dom'
function CheckoutResults(props) {
    return (
        <div className='my-5 py-5'>
            <p className={`text-center text-${props.status}`}>
                <h1>{props.message}</h1>
                <Link to={`/`}><button className={`mt-5 btn btn-${props.status} btn-lg`}>Redirect to Home page</button></Link>
                <Link to={`/myAccount/dashboard`}><button className={`mt-5 mx-2 btn btn-warning btn-lg`}>Go to your Account Panel</button></Link>
            </p>
        </div>
    )
}

export default CheckoutResults
