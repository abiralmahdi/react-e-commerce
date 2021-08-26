import React, {useState, useEffect} from 'react'
import ItemCard from './ItemCard'
import './ItemCards.css'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {URLS} from './urls'


function ItemCards(props) {


    const [items, setitems] = useState([])
    
    useEffect(()=>{
      async function fetchData() {
          const request = await axios.get(`${URLS}/fetchAllProducts`)
          setitems(request.data)
      
      }
      fetchData()
  }, [])

  



    return (
        <div className=''>
            <div className='cardRow'>
                {typeof props.category == 'object'?<h3>{props.category.name}</h3>:<h3>{props.category}</h3>}
                
                {/* <button className='btn btn-dark' onClick={()=>props.move()}><Link to={`/products/${props.category.id}`}>See more</Link></button> */}
                <hr/>
            </div>
            
            <div className='cardRowScroll' id='cardRowScroll'>
            {/* <marquee> */}
                {items.map(
                    item => (
                        <>
                        {
                        item.category == props.category.id
                        &&
                        <ItemCard 
                            className='card' 
                            id={item.id}
                            title={item.product_name} 
                            desc={item.desc} 
                            price={item.presentPrice} 
                            image={item.image}
                            category={item.category}
                            subcategory={item.sub_category}
                            setcatID={props.setcatID}
                            setprodID={props.setprodID}
                            setsubCatID={props.setsubCatID}
                            cart={props.cart} 
                            setcart={props.setcart}
                            move={props.move}
                        />
                        }
                        
                        </>
                    )
                )}
                
                {/* </marquee> */}
            </div>
            
        </div>
    )
}

export default ItemCards
