import React from 'react'
import './Features.css'
import image from '../Image/jilapi.jpg'
import image2 from '../Image/lassi.jpg'
import {Parallax} from 'react-parallax'

function Features() {
    return (
        <>

        <Parallax bgImage={image2} strength={700} className='featurePhoto'>
                <div className='featureDesc text-center'>
                    We provide the best food. We provide the best food. We provide the best food. We provide the best food. We provide the best food. 
                </div>
        </Parallax>

        </>
    )
}

export default Features
