import React, { useState } from "react";
import { Modal, Button, Form, Col, InputGroup, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addTracking.css";

const AddTracking = (props) => {
  const [modalShow, setModalShow] = useState(true);
  const [incorrectUrl, setincorrectUrl] = useState(false);
  const [expPrice, setexpPrice] = useState(
    props.item ? props.item.expectedPrice : 0
  );
  const currPrice = props.item ? props.item.currentPrice : 0;
  const [orgPrice, setorgPrice] = useState(
    props.item ? props.item.whenAddedPrice : 0
  );
  const [Url, setUrl] = useState(props.item ? props.item.url : "");
  const [name, setname] = useState(props.item ? props.item.name : "");
  const [imge, setimge] = useState(props.item ? props.item.imge : "");
  const [progress, setrpogress] = useState(false);
  const handleTrack = () => {
    let obj = {};
    obj.url = Url;
    obj.whenAddedPrice = orgPrice;
    obj.expectedPrice = expPrice;
    obj.lowestPrice = orgPrice;
    obj.currentPrice = currPrice;
    obj.image = imge;
    obj.name = name;
    obj.mailPrice = props.item ? props.item.mailPrice : orgPrice + 1;
    setrpogress(true);
    if (props.item) {
      obj._id = props.item._id;
      fetch("https://pricetrackerorder.herokuapp.com/edittracker", {
        // fetch("http://localhost:2222/edittracker", {
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
          if (data.success === true) {
            setrpogress(false);
            handleHide();
            toast.info("Tracking info has been updated", {
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
          setrpogress(false);
          toast.info(err.message, {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      obj.currentPrice = orgPrice;
      fetch("https://pricetrackerorder.herokuapp.com/addtracker", {
        // fetch("http://localhost:2222/addtracker", {
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
          setrpogress(false);
          if (data.success === true) {
            handleHide();
            toast.info("Tracking info has been sent to your email", {
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
          setrpogress(false);
          toast.info(err.message, {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };
  const handlePriceInput = (e) => {
    if (e.target.value < 1) setexpPrice(1);
    if (e.target.value > orgPrice) setexpPrice(Number(orgPrice));
    else setexpPrice(Number(e.target.value));
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
    setincorrectUrl(false);
  };
  const handleRange = (e) => {
    setexpPrice(Number(e.target.value));
  };
  const handleHide = () => {
    setModalShow(false);
    props.handleTrack();
  };
  const handleEditedHide = () => {
    setModalShow(false);
    props.handleEditedTrack();
  };
  const getPrice = async () => {
    if (
      Url.includes("https://www.amazon.in/") ||
      Url.includes("https://www.flipkart.com/") ||
      Url.includes("https://dl.flipkart.com/")
    ) {
      setrpogress(true);
      setexpPrice(0);
      setorgPrice(0);
      setname("");
      fetch("https://pricetrackerorder.herokuapp.com/getprice", {
        // fetch("http://localhost:2222/getprice", {
        method: "POST",
        body: JSON.stringify({ url: Url }),
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
          setimge(data.image);
          if (Url.includes("amazon")) {
            let price = data.price
              .replace(/,/g, "")
              .slice(data.price.indexOf(";") + 1, -3);
            setorgPrice(Number(price));
          } else {
            let price = data.price
              .replace(/,/g, "")
              .slice(data.price.indexOf(";") + 1);
            setorgPrice(Number(price.replace(/,/g, "").slice(1)));
          }
          setrpogress(false);
        })
        .catch((err) => {
          toast.info(err.message, {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setrpogress(false);
        });
    } else {
      setexpPrice(0);
      setorgPrice(0);
      setname("");
      setincorrectUrl(true);
    }
  };
  return (
    <div className="addTracking">
      <Modal
        show={modalShow}
        onHide={
          props.item && props.item.expectedPrice === expPrice
            ? handleEditedHide
            : handleHide
        }
        size="md"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          {progress ? (
            <div
              className="progress-bar"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.450)" }}
            >
              <div className="running-bar"></div>
            </div>
          ) : null}
          <Modal.Title className="addTracking-headingDiv">
            <p className="addTracking-heading">
              {props.item
                ? "EDIT ITEM EXPECTED PRICE"
                : "ADD TRACKING URL/LINK"}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group controlId="formBasicEmail" as={Col} sm={11} xs={10}>
                <Form.Control
                  type="url"
                  placeholder="Paste the url/link here"
                  onChange={handleUrl}
                  value={Url}
                  disabled={props.item ? true : progress ? true : false}
                />
                {incorrectUrl ? (
                  <Alert variant="danger">
                    Not found!!!Please check the url again.
                  </Alert>
                ) : (
                  <Form.Text className="text-muted">
                    We only support Flipkart and Amazon products.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group as={Col} sm={1} xs={2}>
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={getPrice}
                  disabled={props.item ? true : progress ? true : false}
                >
                  <i
                    className="fas fa-search-dollar"
                    style={{
                      fontSize: "20px",
                      marginTop: "5px",
                    }}
                  ></i>
                </Button>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Name of product</Form.Label>
              <Form.Control type="text" value={name} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="range"
                min={0}
                max={orgPrice}
                value={expPrice}
                onChange={handleRange}
                disabled={orgPrice === 0 ? true : progress ? true : false}
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
                  <Form.Control
                    type="number"
                    value={expPrice}
                    onChange={handlePriceInput}
                    min={1}
                    max={orgPrice}
                    disabled={orgPrice === 0 ? true : progress ? true : false}
                  />
                  <Form.Text className="text-muted">
                    <div className="notify-price">
                      We will notify you when price gets below this
                    </div>
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
          disabled={
            expPrice === 0 ||
            (props.item && expPrice === props.item.expectedPrice)
              ? true
              : progress
              ? true
              : false
          }
        >
          {props.item ? "Update Item" : "Track"}
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
