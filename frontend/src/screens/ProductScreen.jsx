import React from 'react';
import products from '../products';
import { Link } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap';
import Rating from '../components/Rating';
import {useParams} from 'react-router-dom';
import Product from '../components/Product';

const ProductScreen = () => {
    const {id: productId} = useParams();
    const prodcut = products.find((p)=> p._id === productId );
    
  return (
    <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>

        <Row>
            <Col md={5}>
                <Image src={prodcut.image} alt={prodcut.name} fluid />
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h3>{prodcut.name}</h3>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Rating value={prodcut.rating} text={`${prodcut.numReviews} reviews`} />
                    </ListGroupItem>
                    <ListGroupItem>Price: ${prodcut.price}</ListGroupItem>
                    <ListGroupItem>Description:{prodcut.description}</ListGroupItem>     
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup>
                        
                        <ListGroupItem>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${prodcut.price}</strong>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        
                        <ListGroupItem>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    <strong>{prodcut.countInStock>0?'In Stock': 'Out of Stock'}</strong>
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Button 
                                className='btn-block'
                                type='button'
                                disabled={prodcut.countInStock===0}
                            >
                            Add to Cart           
                            </Button>
                        </ListGroupItem>

                    </ListGroup>
                </Card>
            </Col>
        </Row>

    </>
    )
};

export default ProductScreen;




