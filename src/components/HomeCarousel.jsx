import React from 'react'
import {Carousel} from 'react-bootstrap'
import image from '../Image/jilapi.jpg'
import image2 from '../Image/lassi.jpg'
import image3 from '../Image/yellowSweet.jpg'
import './HomeCarousel.css'

function HomeCarousel() {


    

    return (
<Carousel fade>
  <Carousel.Item>
    <img
      className="d-block w-100 carouselImage"
      src={image3}
      alt="First slide"
    />
    <Carousel.Caption className='carouselCaption'>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 carouselImage"
      src={image}
      alt="Second slide"
    />

    <Carousel.Caption  className='carouselCaption'>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 carouselImage"
      src={image2}
      alt="Third slide"
    />

    <Carousel.Caption  className='carouselCaption'>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>    )
}

export default HomeCarousel
