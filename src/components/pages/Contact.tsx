import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


export default function Contact() {

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className='main-container'>
    <div className='contact__container'>
       <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Example: Issue in ordering" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Your Message </Form.Label>
        <Form.Control as="textarea" rows={3} required/>
      </Form.Group>
      <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Label>Add file (Optional)</Form.Label>
        <Form.Control type="file" size="sm" />
      </Form.Group>
      <div className="contact-btn">
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Send
      </Button>
      <Model
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
    </Form>
    </div>
    </div>
  )
}

const Model =(props)=>{
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Message Sent Successfully!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Thank you for your feedback! We will contact with you as soon as possible regarding your notes
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
