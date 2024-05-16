import { useState } from 'react';
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function OrderForm() {

    const [orderData, setOrderData] = useState({
        customerId: '',
        productId: '',
        quantity: ''
    });
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(''); 

    const handleClose = () => setShow(false);

    const handleChange = (event) => {
        event.preventDefault();
        let { name, value } = event.target;
        setOrderData({ ...orderData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let response = null
        if (id) {
            response = await axios.put(`http://127.0.0.1:5000/put?id=${id}`, {
                body: customerData,
            })
            console.log(response.data) 
            setMessage('Successfully Updated User!')
        } else {
            response = await axios.post(`http://127.0.0.1:5000/orders`,
                customerData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        setMessage('Successfully created/updated order!');
        setShow(true);
    }}

    return (
        <div>
            <NavBar />
            <Form className='p-4 border rounded mx-4 my-4'onSubmit={handleSubmit}>
                <FloatingLabel controlId="customerId" label="Customer ID">
                    <Form.Control type="text" name='customerId' value={orderData.customerId} onChange={handleChange} placeholder="Customer ID" />
                </FloatingLabel>
                <FloatingLabel controlId="productId" label="Product ID" className="my-3">
                    <Form.Control type="text" name="productId" value={orderData.productId} onChange={handleChange} placeholder="Product ID" />
                </FloatingLabel>
                <FloatingLabel controlId="quantity" label="Quantity">
                    <Form.Control type="text" name="quantity" value={orderData.quantity} onChange={handleChange} placeholder="Quantity" />
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
      )
    }
    
    export default OrderForm;