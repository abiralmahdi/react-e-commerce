import axios from 'axios'
import React from 'react'
import './ContactForm.css'
{/* <h3 className='text-center mb-5' id='contactHeader'>Contact Us</h3> */}

function ContactForm(props) {

  function handleContact(e){
    props.move()
    let name = e.target[0].value
    let email = e.target[1].value
    let contact = e.target[2].value
    let subject = e.target[3].value

    axios.post('https://abirs-django-ecommerce-api.herokuapp.com/contact-us', {
      'name': name, 
      'email': email, 
      'contact':contact, 
      'message': subject
  }).then(
    res=>{

      if (JSON.stringify(res.data) === '{"status":"Contact recieved"}'){
        alert('We have recieved your message')
      }
      else{
        console.log(res.data)
        alert('There was a server error. Please try again later after sometime.')
      }
    }
  )
  e.preventDefault()
  }



    return (
        <>
        <h3 id='contactHeader' className='text-center'>Contact Us</h3>
<div className="container contactDiv">
    <div id="map-container-google-1" className="z-depth-1 map-container mb-4">
        <iframe src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0"
            style={{border:"0", height:"500px"}} allowFullScreen></iframe>
    </div>

  <form onSubmit={handleContact}>
    <input type="text" id="name" name="name" placeholder="Enter Your Name"/>

    <input type="email" id="email" name="email" placeholder="Your Email"/>
    <input type="tel" id="contact" name="contact" placeholder="Your Contact"/>

    <textarea id="subject" name="subject" placeholder="Write something.." style={{height:'200px'}}></textarea>

    <input type="submit" value="Submit" className='btn btn-dark btn-block btn-lg'/>
  </form>
</div>
</>
    )
}

export default ContactForm
