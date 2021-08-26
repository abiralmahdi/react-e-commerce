import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './Table.css'

function Tables(props) {


    
    function openNavBar(){
        let navbar = document.getElementById('sidenavbar')
        let main = document.getElementById('page-wrapper')
        navbar.style.display = 'flex'
        // main.style.marginLeft = '260px'


    }

    // Use State for setting up the main contents of the table
    let details = []   // Array for converting the JSON data to list
    const [contents, setcontents] = useState([])

    useEffect(()=>{
        async function fetchData() {
            const request = await axios.get(props.url);    // sending a get request to fetch data
            console.log(request.data)

            for (let content in request.data){
                details.push(Object.values(request.data[content]))  // Pushing the JSON data in a form of array
            }

            setcontents(details)   // Setting up the data in useState
        } 
        fetchData()
    }, [])

    

    // for (let content in contents){
    //     details.push(Object.values(contents[content]))  
    // }

    function removeFromFavourite(item, itemObj){
        props.move()
        axios.delete(`https://abirs-django-ecommerce-api.herokuapp.com/removeFromFavourite/${item}`)
        .then(
            res=>{                
                console.log(JSON.stringify(res.data))
                if (JSON.stringify(res.data) === '{"status":"Deleted"}'){
                    alert('Item removed from favourites')
                    // contents.splice(contents.indexOf(itemObj), 1)
                    
                    contents.splice(contents.indexOf(itemObj), 1)
                    console.log(contents)

                    
                    details = []
                    for (let content in contents){
                        details.push(Object.values(contents[content]))  // Pushing the JSON data in a form of array
                    }
                    setcontents(details)
                }
                else{
                    alert(`Couldn't remove item. Please try again later.`)
                }
            }
        )
    }


    function orderDelivered(item, itemObj){
        props.move()
        let obj = {}
        obj["id"] = itemObj[0]
        obj["customerName"] = itemObj[2]
        obj["customerUsername"] = itemObj[6]
        obj["product_details"] = itemObj[1]
        obj["totalPrice"] = itemObj[3]
        obj["discount"] = itemObj[4]

        axios.post('https://abirs-django-ecommerce-api.herokuapp.com/addToPurchases', obj).then(
            res => {
                if (res.data === 400){
                    alert('There was an error. Please try again later.')
                }
                else{
                    alert(JSON.stringify(res.data))
                }
            }
        )
    }


    // Sample data for testing .... [It is not required in production]
    const purchases = [["3",{"name":"Choco Pastries Delight","price":400,"totalPrice":800,"image":"/media/shop/images/lassi.jpg","id":3,"quantity":2}],["4",{"name":"Choco Pastries Ultra","price":100,"totalPrice":100,"image":"/media/shop/images/vanilla-pastry_WY6TQ0t.jpg","id":4,"quantity":1}]]
    const favourites = [["4",{"name":"Choco Pastries Ultra","price":100,"category":1,"id":4,"sub_category":2,"user":33}]]
    
    
     return (
        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="panel panel-default">
                                <div className="row m-3">
                                    <div className="col-md-12 d-flex">
                                        <button onClick={openNavBar} className='btn btn-light mb-2 mr-3'><i class="fas fa-bars"></i></button>
                                        <h2 className='text-dark'>{props.title}</h2>
                                    </div>
                                </div>            
                                <div className="panel-body">
                                    <div className="table-responsive" style={{overflowY:'scroll', height:'500px'}}>
                                        
                                        
                                        {/* the table */}
                                        {
                                            props.title === 'Purchase Details' // Table for purchase details
                                            ?
                                            <table className="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                {props.rows.map(
                                                    row => (
                                                        <th>{row}</th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contents.map(
                                                content => (
                                                    <tr key={contents.indexOf(content)}>
                                                        <td>{content[0]}</td>
                                                        
                                                        <td>
                                                        {JSON.parse(content[1]).map(
                                                            item => (
                                                              
                                                                 <li> {item[1]['name']}</li>
                                                            )
                                                        )}
                                                        </td>
                                                        <td>{JSON.parse(content[1]).map(
                                                            item => (
                                                                <>
                                                               {item[1]['quantity']}<br/>
                                                               </>
                                                            )
                                                        )}</td>
                                                        <td>
                                                        {JSON.parse(content[1]).map(
                                                            item => (
                                                              
                                                                 <li> {item[1]['price']}</li>
                                                            )
                                                        )}
                                                        </td>
                                                        <td>
                                                        {JSON.parse(content[1]).map(
                                                            item => (
                                                              
                                                                 <li>{item[1]['totalPrice']}</li>
                                                            )
                                                        )}
                                                        </td>
                                                        <td>
                                                        {content[3]}
                                                        </td>
                                                        <td> {content[5]}</td>
                                                    </tr>
                                                )
                                            )}
                                            
                                            
                                        </tbody>
                                        </table>
                                        :
                                        props.title === 'On Orders'   // Table for pending order details
                                            ?
                                            <table className="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                {props.rows.map(
                                                    row => (
                                                        <th>{row}</th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contents.map(
                                                content => (
                                                    <tr key={contents.indexOf(content)}>
                                                        <td>{content[0]}</td>
                                                        
                                                        <td>
                                                        {JSON.parse(content[1]).map(
                                                            item => (
                                                              
                                                                 <li> {item[1]['name']}</li>
                                                            )
                                                        )}
                                                        </td>
                                                        <td>{JSON.parse(content[1]).map(
                                                            item => (
                                                                <>
                                                               {item[1]['quantity']}<br/>
                                                               </>
                                                            )
                                                        )}</td>
                                                        <td>
                                                        {JSON.parse(content[1]).map(
                                                            item => (
                                                              
                                                                 <li> {item[1]['price']}</li>
                                                            )
                                                        )}
                                                        </td>
                                                        <td>
                                                        {JSON.parse(content[1]).map(
                                                            item => (
                                                              
                                                                 <li>{item[1]['totalPrice']}</li>
                                                            )
                                                        )}
                                                        </td>
                                                        <td>
                                                        {content[3]}
                                                        </td>
                                                        <td> {content[5]}</td>
                                                        <td> <button className='btn btn-info btn-sm' onClick={() => orderDelivered(content[0], content)}>Recieved</button></td>
                                                    </tr>
                                                )
                                            )}
                                            
                                            
                                        </tbody>
                                        </table>
                                            : props.title === 'My Favourites' ?   // Table for Favourites
                                            <table className="table table-hover table-striped">
                                        <thead>

                                            <tr>
                                                {props.rows.map(
                                                    row => (
                                                        <th>{row}</th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contents.map(
                                                content => (
                                                    
                                                    <tr key={contents.indexOf(content)}>
                                                        <td>{content[0]}</td>
                                                        
                                                        <td>
                                                        {JSON.parse(content[2]).map(
                                                            item => (
                                                              
                                                                  <a href={`/products/${content[7]}/${content[8]}/${content[0]}`} style={{color:'black'}} onClick={() => {localStorage.setItem('prodID', content[0])}}>{item[1]['name']}</a>
                                                            )
                                                        )}
                                                        </td>
                                                        <td>{content[3]}</td>
                                                        <td>{content[4]}</td>
                                                        <td>
                                                        {JSON.parse(content[2]).map(
                                                            item => (
                                                                item[1]['price']
                                                            )
                                                        )}
                                                        </td>
                                                        <td>0</td>
                                                        <td><button className='btn btn-sm btn-danger' onClick={() => removeFromFavourite(content[0], content)}><i class="fas fa-trash-alt"></i></button></td>
                                                    </tr>
                                                    
                                                )
                                            )}
                                            
                                            
                                        </tbody>
                                        </table>
                                        :                                        // Table for others
                                        <table className="table table-hover table-striped">            
                                        <thead>
                                            <tr>
                                                {props.rows.map(
                                                    row => (
                                                        <th>{row}</th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contents.map(
                                                content => (
                                                    <tr key={contents.indexOf(content)}>
                                                        <td>{content[0]}</td>
                                                        
                                                        <td>
                                                        {JSON.parse(content[2]).map(
                                                            item => (
                                                              
                                                                  item[1]['name']
                                                            )
                                                        )}
                                                        </td>
                                                        <td>{content[3]}</td>
                                                        <td>{content[4]}</td>
                                                        <td>
                                                        {JSON.parse(content[2]).map(
                                                            item => (
                                                                item[1]['price']
                                                            )
                                                        )}
                                                        </td>
                                                        <td>0</td>
                                                    </tr>
                                                )
                                            )}
                                            
                                            
                                        </tbody>
                                        </table>
                                        }
                                        
                                    </div>
                                    </div>
                                </div>
                          </div>
                        </div>
    )
}

export default Tables
