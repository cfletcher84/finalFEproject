import { useState } from 'react';
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';
import axios from 'axios';

function ProductForm({ id }) {
    const [productData, setProductData] = useState({
        name: '',
        price: ''
    });
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => setShow(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            if (id) {
                response = await axios.put(`http://127.0.0.1:5000/products/${id}`, productData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                response = await axios.post('http://127.0.0.1:5000/products', productData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            setMessage('Successfully created/updated product!');
            setShow(true);
        } catch (error) {
            console.error('Error creating/updating product:', error);
            // Handle error
        }
    };

    return (
        <div>
            <Form className='p-4 border rounded mx-4 my-4' onSubmit={handleSubmit}>
                <FloatingLabel controlId="productName" label="Product Name">
                    <Form.Control type="text" name='name' value={productData.name} onChange={handleChange} placeholder="Product Name" />
                </FloatingLabel>
                <FloatingLabel controlId="productPrice" label="Price" className="my-3">
                    <Form.Control type="text" name="price" value={productData.price} onChange={handleChange} placeholder="Price" />
                </FloatingLabel>
                <Button type="submit" className="mt-3" variant="outline-success">Submit</Button>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SUCCESS!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProductForm;