import React, {useState, useEffect} from 'react'
import './AllProducts.css'
import Card from './ItemCard'
import axios from 'axios'
import {URLS} from './urls'


function AllProducts(props) {
    
    const [categories, setcategories] = useState([])
    const [subcategories, setsubcategories] = useState([])
    const [products, setproducts] = useState([])
    const [categoryName, setcategoryName] = useState('')
    const [subCategoryName, setsubCategoryName] = useState('')
    
    let categoryID
    let subCategoryID

    if (props.catID === undefined || props.catID === null || props.catID === ''){
        categoryID = localStorage.getItem('category')
        console.log(categoryID)
    }
    else{
        categoryID = props.catID
        console.log(categoryID)

    }


    if (props.subCatID === undefined || props.subCatID === null || props.subCatID === ''){
        subCategoryID = localStorage.getItem('subcategory')
        console.log(subCategoryID)
    }
    else{
        subCategoryID = props.subCatID
        console.log(subCategoryID)
    }



    function GetCategory(){      
        useEffect(()=>{
            async function fetchData() {
                const request = await axios.get(`${URLS}/fetchAllCategories`)
                const request2 = await axios.get(`${URLS}/fetchAllSubCategories`)
                const request3 = await axios.get(`${URLS}/fetchAllProducts`)

                setcategories(request.data)
                setcategoryName(request.data[parseInt(categoryID) - 1]['name'])
                setsubcategories(request2.data)
                setproducts(request3.data)
                
                if (request2.data[parseInt(subCategoryID) - 1] === undefined){
                    setsubCategoryName('All')
                }
                else{
                    setsubCategoryName(request2.data[parseInt(subCategoryID) - 1]['name'])
                }
            }
            fetchData()
            
        }, [])


       

    }
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      console.log(categoryName)

    GetCategory()

    
    return (
        <>
        <h3 className='text-center mt-5'>{subCategoryName} - {categoryName}</h3>
        <div className='allProducts'>
            
            {products.map(
                product =>(
                    <>
                    {
                    product.category == categoryID 
                    &&
                        <>
                        {
                        product.sub_category == subCategoryID 
                        &&
                        <Card
                            id={product.id}
                            title={product.product_name} 
                            desc={product.desc} 
                            price={product.presentPrice} 
                            image={product.image}
                            category={product.category}
                            subcategory={product.sub_category}
                            setcatID={props.setcatID}
                            setprodID={props.setprodID}
                            setsubCatID={props.setsubCatID}
                            cart={props.cart}
                            setcart={props.setcart}
                        />
                        }
                        </>
                    }
                    
                    </>
                )
            )}
            
            

            
        </div>
        </>
    )
}

export default AllProducts
