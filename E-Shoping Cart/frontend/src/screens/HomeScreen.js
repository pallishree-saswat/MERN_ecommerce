import React,{useEffect} from 'react'
import {Row , Col} from 'react-bootstrap'
import { useDispatch , useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import { ListProducts }  from '../actions/productAction'

const HomeScreen = ({match}) => {
 const keyword = match.params.keyword

 
 const pageNumber = match.params.pageNumber || 1

 const dispatch = useDispatch()  
 
 const productList = useSelector(state => state.productList)
 const {loading, error,products , pages, page } = productList

useEffect(() => {
dispatch(ListProducts(keyword,pageNumber))
},[dispatch,keyword, pageNumber])

    return (
        <>
    <Meta />
{!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}

        <h1>Latest products</h1>
        {loading ?(
            <Loader />
        )  : error ? (
            <Message> {error} </Message>
        ) : (
            <>
            <Row>
            {products.map(product => (
                <Col sm={12} md={6} lg={4} xl={3} >
                    <Product product={product} />
                </Col>
            ))}
        </Row>
        <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
        )}
      
            
        </>
    )
}

export default HomeScreen
