import React, { useState } from "react";
import { Modal, Button, Form, Col,InputGroup } from "react-bootstrap";
import "./addTracking.css";
const AddTracking = (props) => {
  const [modalShow, setModalShow] = useState(true);
  const [expPrice, setexpPrice] = useState(0);
  const [orgPrice, setorgPrice] = useState(0);
  const handleTrack = () => {
    setModalShow(false);
    props.handleTrack();
  };
  const handleRange = (e) => {
    setexpPrice(Number(e.target.value));
  };
  const getPrice = (e) => {
    e.target.blur();
    fetch("http://localhost:2222/getprice", {
      method: "POST",
      body: JSON.stringify({ url: e.target.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        let price = data.originalPrice
          .replace(/,/g, "")
          .slice(data.originalPrice.indexOf(";") + 1);
        setorgPrice(Number(price.replace(/,/g, "").slice(1)));
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
              <Form.Control
                type="url"
                placeholder="Paste the url/link here"
                onChange={getPrice}
              />
              <Form.Text className="text-muted">
                Please check the link before adding to track.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="range"
                min={0}
                max={orgPrice}
                value={expPrice}
                onChange={handleRange}
                disabled={orgPrice === 0 ? true : false}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Current Price</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text><i class="fas fa-rupee-sign"></i></InputGroup.Text>
                  </InputGroup.Prepend>
                <Form.Control type="text" value={orgPrice} disabled />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Expected Price</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text><i class="fas fa-rupee-sign"></i></InputGroup.Text>
                  </InputGroup.Prepend>
                <Form.Control type="number" value={expPrice} disabled />
                </InputGroup>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Button type="submit" onClick={handleTrack} variant={"dark"} disabled={expPrice===0?true:false}>
          Track
        </Button>
      </Modal>
    </div>
  );
};

export default AddTracking;
