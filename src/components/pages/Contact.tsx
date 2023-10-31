import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Contact() {
  return (
    <>
       <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Example: Issue in ordering" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Your Messege </Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Label>Add file (Optional)</Form.Label>
        <Form.Control type="file" size="sm" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
    </>
  )
}
