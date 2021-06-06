import React from 'react'
import './Menus.css'
import {Link} from 'react-router-dom'

function Menus(props) {
    return (
        <a href={`/myAccount/${props.url}`} className='item__container shadow'>
            <div className='item__inside'>
                {props.title}
            </div>
        </a>
    )
}

export default Menus
