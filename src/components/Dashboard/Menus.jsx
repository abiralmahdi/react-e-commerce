import React from 'react'
import './Menus.css'
import {Link} from 'react-router-dom'

function Menus(props) {

    function handleClick(){
        props.move()
        props.closeNavBar()
    }
    return (
        <a href={`#/react-e-commerce/myAccount/${props.url}`} onClick={handleClick} className='item__container shadow'>
            <div className='item__inside'>
                {props.title}
            </div>
        </a>
    )
}

export default Menus
