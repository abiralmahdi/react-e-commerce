import React, {useState, useEffect} from 'react'
import image from '../Image/pastry1.webp'
import './IndivProduct.css'
import ItemCards from './ItemCards'
import axios from 'axios';
import ItemCard from './ItemCard'
import {URLS} from './urls'
import Cookies from 'universal-cookie'

function IndivProduct(props) {
const cookies = new Cookies
let cartItemsIndiv = {}
let presentTotalPrice = localStorage.getItem('totalPrice')
const [addedToCart, setaddedToCart] = useState(false)
let cond = false


let product_id
if (props.prodID === undefined || props.prodID === null || props.prodID === ''){
    product_id = localStorage.getItem('prodID')
}
else{
    product_id = props.prodID
}

const [items, setitems] = useState([])
const [userID, setuserID] = useState('')
const [isFavourite, setisFavourite] = useState(false)
    
useEffect(()=>{
  async function fetchData() {
      const request = await axios.get(`${URLS}/fetchAllProducts`)
      setitems(request.data)
      
      const request3 = await axios.get(`${URLS}/accounts/fetchSingleUserReal/${cookies.get('username', {path:'/'})}`)
      setuserID(request3.data.id)

      const request2 = await axios.get(`https://abirs-django-ecommerce-api.herokuapp.com/checkFavourites/${request.data[product_id-1].id}/${request3.data.id}`)
      .then(
          res => {
            res.data===true ? setisFavourite(true) : setisFavourite(false)
          }
      )
      
  }
  fetchData()

}, [])



useEffect(() => {
if (JSON.parse(localStorage.getItem('cart')) != null){
    if (localStorage.getItem('prodID') in JSON.parse(localStorage.getItem('cart'))){
        cond = true
        setaddedToCart(cond)

    }
    else{
        cond = false
        setaddedToCart(cond)
        
    }
}
else{
    cond = false    
}

}, [])


// useEffect(() => {
//     setaddedToCart(cond)

// }, [])


const productDetails = items[product_id - 1]


// Adding to wishlist
function addToWishList(){
    props.move()
    axios.post('https://abirs-django-ecommerce-api.herokuapp.com/addToFavourite', {
        'productName': `[[\"${productDetails.id}\",{\"name\":\"${productDetails.product_name}\",\"price\":${productDetails.price},\"category\":${productDetails.category},\"id\":${productDetails.id},\"sub_category\":${productDetails.sub_category},\"user\":${userID}}]]`,
        'product': productDetails.id,
        'user':userID,
        'category': productDetails.category,
        'subCategory': productDetails.sub_category,
        'actualPrice': productDetails.price,
        'discount': 3
    }).then(
        res => {
            setisFavourite(true)
            alert('Item added to wishlist successfully')
        },
        
    )
   
}

function addToCart(){
    cartItemsIndiv['name'] = productDetails.product_name
    cartItemsIndiv['price'] = productDetails.presentPrice
    cartItemsIndiv['totalPrice'] = productDetails.presentPrice
    cartItemsIndiv['image'] = productDetails.image
    cartItemsIndiv['id'] = productDetails.id
    cartItemsIndiv['quantity'] = 1
    props.cart[productDetails.id] = cartItemsIndiv
    props.setcart(props.cart)

    localStorage.setItem('cart', JSON.stringify(props.cart))
    let presentTotalPrice = localStorage.getItem('totalPrice')
    if (presentTotalPrice != null){
        let newTotalPrice = parseInt(presentTotalPrice) + productDetails.presentPrice
        localStorage.setItem('totalPrice', newTotalPrice)
    }
    else{
        let newTotalPrice = productDetails.presentPrice
        localStorage.setItem('totalPrice', newTotalPrice)
    }
    
    let cart = JSON.parse(localStorage.getItem('cart'))
    setaddedToCart(true)

    // setaddedButton(true)}
}


useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


    return (
        <>
        {items.map(
                    item => (
                        <>
                        {item.id === product_id-1+1 &&
                        <div className='product'>
                        <div className='productImage'>
                            <img src={`https://abirs-django-ecommerce-api.herokuapp.com${productDetails['image']}`} alt='Image is not available' className='mainImage'/>
                        </div>
                        <div className='productDetails'>
                            <div className='productTitle text-center'>
                                <h3 style={{marginTop:'50px'}}>{productDetails['product_name']} </h3>
                            </div>
                            <div className='productDesc'>
                            {productDetails['desc']}
                            </div>
                            <div className='productPricing mt-3'>
                                    <h4>Price: {productDetails['presentPrice']} <span className='font-weight-bold'>৳</span></h4>
                            </div>
            
                            <div className='productOrder mt-5'>
                                {
                                    addedToCart === false
                                    ?
                                    <button className='addToCartButton' onClick={addToCart}><i className="fas fa-cart-plus" style={{paddingRight:"10px"}}></i>Add to Cart</button>
                                    :
                                    <button className='addToCartButton' disabled><i className="fas fa-cart-plus" style={{paddingRight:"10px"}}></i>Added</button>
                                }
                                {
                                    isFavourite === true
                                    ?
                                    <button className='addToWishlistButton' disabled><i className="fas fa-heart" style={{paddingRight:"10px", cursor:'not-allowed'}}></i>In Wishlist</button>
                                    :
                                    <button className='addToWishlistButton' onClick={addToWishList}><i className="fas fa-heart" style={{paddingRight:"10px"}}></i>Add to Wishlist</button>
                                }
                            </div>
                        </div>
                    </div>
                        }
                        
                        
                        </>
                    )
                )}

            {/* <ItemCards className='mt-5' category={props.category} setprodID={props.setprodID} setcatID={props.setcatID} setsubCatID={props.setsubCatID} cart={props.cart} setcart={props.setcart}/> */}




        </>
    )
}

export default IndivProduct
