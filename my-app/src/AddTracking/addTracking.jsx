import React, { useState } from "react";
import { Modal, Button, Form, Col, InputGroup } from "react-bootstrap";
import "./addTracking.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTracking = (props) => {
  const [modalShow, setModalShow] = useState(true);
  const [expPrice, setexpPrice] = useState(props.item?props.item.expectedPrice:0);
  const [orgPrice, setorgPrice] = useState(props.item?props.item.currentPrice:0);
  const [Url, setUrl] = useState(props.item?props.item.url:"");
  const [name,setname]=useState(props.item?props.item.name:'');
  const handleTrack = () => {
    let obj = {};
    obj.url = Url;
    obj.whenAddedPrice = orgPrice;
    obj.expectedPrice = expPrice;
    obj.lowestPrice=orgPrice;
    obj.name=name;
    obj.mailPrice=props.item?props.item.mailPrice:orgPrice+1;
    console.log(obj);
    if(props.item)
    {
      obj._id=props.item._id;
      fetch("http://localhost:2222/edittracker", {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
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
        if(data.success===true)
        {
          handleHide();
          toast.info('Updated tracking info has been sent to your registered email', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else
    {
    fetch("http://localhost:2222/addtracker", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
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
        if(data.success===true)
        {
          handleHide();
          toast.info('Tracking detail has been sent to your email', {
            position: "bottom-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  const handlePriceInput=(e)=>{
    if(e.target.value<1)
    setexpPrice(1);
    if(e.target.value>orgPrice)
    setexpPrice(Number(orgPrice));
    else
    setexpPrice(Number(e.target.value));
  }
  const handleRange = (e) => {
    setexpPrice(Number(e.target.value));
  };
  const handleHide=()=>{
    setModalShow(false);
    props.handleTrack();
  }
  const getPrice = (e) => {
    e.target.blur();
    setUrl(e.target.value);
    setexpPrice(0);
    setorgPrice(0);
    setname('');
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
        setname(data.name);
        let price = data.price
          .replace(/,/g, "")
          .slice(data.price.indexOf(";") + 1);
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
        onHide={handleHide}
        size="md"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="addTracking-headingDiv">
            <p className="addTracking-heading">{props.item?'EDIT ITEM EXPECTED PRICE':'ADD TRACKING URL/LINK'}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Url</Form.Label>
              <Form.Control
                type="url"
                placeholder="Paste the url/link here"
                onChange={getPrice}
                value={Url}
                disabled={props.item?true:false}
              />
              <Form.Text className="text-muted">
                Please check the link before adding to track.
              </Form.Text>
            </Form.Group>
            <Form.Group>
            <Form.Label>Name of product</Form.Label>
            <Form.Control type="text" value={name} readOnly />
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
                    <InputGroup.Text>
                      <i className="fas fa-rupee-sign"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="text" value={orgPrice} disabled />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Expected Price</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-rupee-sign"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="number" value={expPrice} onChange={handlePriceInput} min={1} max={orgPrice} disabled={orgPrice === 0 ? true : false}/>
                  <Form.Text className="text-muted">
                    <div className="notify-price">We will notify you when price gets below this</div>
                  </Form.Text>
                </InputGroup>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Button
          type="submit"
          onClick={handleTrack}
          variant={"dark"}
          disabled={expPrice === 0 ? true : false}
        >
         {props.item?'Update Item':'Track'}
        </Button>
      </Modal>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default AddTracking;
