import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function ProductDetails({ productId }) {
    const [product, setProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.log('Error fetching product details:', error);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${productId}`);
            setProduct(null);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <Container fluid className='text-center'>
            <h2>Product Details</h2>
            <ListGroup className="border rounded mx-auto my-4 w-50">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <strong>Product ID:</strong> {product.id}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <strong>Name:</strong> {product.name}
                </ListGroup.Item>
            </ListGroup>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete Product</Button>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ProductDetails;