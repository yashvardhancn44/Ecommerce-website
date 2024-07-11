import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';



const HomeScreen = () => {

  // const [products, setProducts] = useState([]);

  // useEffect(()=>{
  //   const fetchProducts = async ()=>{
  //     const {data}=await axios.get('/api/products');
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // },[]);

    const {keyword, pageNumber} = useParams();

    const {data, isLoading, error } = useGetProductsQuery({keyword, pageNumber});


  return (
    <>
      {isLoading?(<Loader/>):error?(
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ):(
        <>
        <h1>Latest Products</h1>
        <Row>
            {data.products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
    
            ))};
        </Row>
        <Paginate
          pages={data.pages}
          page={data.page}
          keyword={keyword? keyword:''}/>
        </>
      )}

    
    </>

  );
};

export default HomeScreen