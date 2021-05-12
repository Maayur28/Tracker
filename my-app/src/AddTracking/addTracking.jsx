import React, { useState } from "react";
import { Modal, Button, Form,Col } from "react-bootstrap";
import './addTracking.css'
const AddTracking = (props) => {
  const [modalShow, setModalShow] = useState(true);
    const[val,setval]=useState(0);
  const handleTrack = () => {
    setModalShow(false);
    props.handleTrack();
  };
  const handleRange=(e)=>{
      setval(e.target.value);
  }
  console.log(val);
  return (
    <div className="addTracking">
      <Modal
        show={modalShow}
        onHide={handleTrack}
        size="md"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="addTracking-headingDiv">
           <p className="addTracking-heading">ADD TRACKING URL/LINK</p> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>URL</Form.Label>
              <Form.Control type="url" placeholder="Paste the url/link here" />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="range" min={0} max={1000} value={val} onChange={handleRange}/>
            </Form.Group>
            <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Current Price</Form.Label>
              <Form.Control type="number" value={1000} disabled/>
            </Form.Group>
            <Form.Group as={Col}
            >
              <Form.Label>Expected Price</Form.Label>
              <Form.Control type="number" value={val} disabled/>
            </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Button type="submit" onClick={handleTrack} variant={"dark"}>
          Track
        </Button>
      </Modal>
    </div>
  );
};

export default AddTracking;
