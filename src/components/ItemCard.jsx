import React, {useState, useEffect} from 'react'
import {Card, Button} from 'react-bootstrap'
import image from '../Image/jilapi.jpg'
import './ItemCard.css'
import {Link} from 'react-router-dom'

function ItemCard(props) {

    let cartItemsIndiv = {}
    
    let cond = false                // cond means condition

    const [addedButton, setaddedButton] = useState(cond)

    if (JSON.parse(localStorage.getItem('cart')) != null){
        if (props.id in JSON.parse(localStorage.getItem('cart'))){
            cond = true
        }
    }
    else{
        cond = false
    }

    useEffect(() => {
        setaddedButton(cond)
        }, [])
      

    function AddToCart(){
        
        cartItemsIndiv['name'] = props.title
        cartItemsIndiv['price'] = props.price
        cartItemsIndiv['totalPrice'] = props.price
        cartItemsIndiv['image'] = props.image
        cartItemsIndiv['id'] = props.id
        cartItemsIndiv['quantity'] = 1
        
        props.cart[props.id] = cartItemsIndiv
        props.setcart(props.cart)

        localStorage.setItem('cart', JSON.stringify(props.cart))
        let presentTotalPrice = localStorage.getItem('totalPrice')
        if (presentTotalPrice != null){
            let newTotalPrice = parseInt(presentTotalPrice) + props.price
            localStorage.setItem('totalPrice', newTotalPrice)
        }
        else{
            let newTotalPrice = props.price
            localStorage.setItem('totalPrice', newTotalPrice)
        }
        
        let cart = JSON.parse(localStorage.getItem('cart'))

        setaddedButton(true)

    }



    function StoreItemDetails2(){

        props.setprodID(props.id)
        localStorage.setItem('prodID', props.id)
    }
    
    return (
        <Card className='shadow mainCard' onClick={props.handleClick}>
            
            <Link to={`/products/${props.category}/${props.subcategory}/${props.id}`} onClick={StoreItemDetails2}>
                <Card.Img variant="top" src={'http://127.0.0.1:8000' + props.image} style={{height:'200px'}} />
            </Link>
            
            <Card.Body>
                <Link to={`/products/${props.category}/${props.subcategory}/${props.id}`} onClick={StoreItemDetails2} style={{color:'black', textDecoration:'none'}}>
                    <Card.Title>
                        {props.title}
                    </Card.Title>
                </Link>
                <Card.Text className='cardText'>
                    {props.desc} ... 
                </Card.Text>
                <Card.Text>
                <hr/><b>
                    Price: 
                    <span className='font-weight-bold ml-3 mr-1'>৳</span>{props.price}
                    </b>
                </Card.Text>
                {
                JSON.parse(localStorage.getItem('cart'))!=null
                ?
                <>
                {
                addedButton == false
                ?
                <button className='addToCartButton' onClick={AddToCart}><i className="fas fa-cart-plus" style={{paddingRight:"10px"}}></i>Add to Cart</button>
                :
                <button className='addToCartButton' disabled>Added</button>
                }
                </>:
                <button className='addToCartButton' onClick={AddToCart}><i className="fas fa-cart-plus" style={{paddingRight:"10px"}}></i>Add to Cart</button>
                }
                
                
            </Card.Body>
        </Card>
    )
}

export default ItemCard
