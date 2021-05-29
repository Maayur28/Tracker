import React, { useEffect, useState, useContext } from "react";
import "./viewTracking.css";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import {
  Table,
  Row,
  Col,
  Spinner,
  Modal,
  Button,
  Image,
} from "react-bootstrap";
import AddTracking from "../AddTracking/addTracking";
import { StoreContext } from "../Store/data";

const ViewTracking = () => {
  const [data, setdata] = useState("");
  const [deleteShow, setdeleteShow] = React.useState(false);
  const [returned, setreturned] = useState(false);
  const [deleteReturned, setdeleteReturned] = useState(false);
  const [itemDelete, setitemDelete] = useState(0);
  const [itemEdit, setitemEdit] = useState();
  const [editModal, seteditModal] = useState(false);
  const { value } = useContext(StoreContext);
  //  eslint-disable-next-line
  const [isLogin, setisLogin] = value;
  useEffect(() => {
    if (isLogin) {
      setreturned(false);
      fetch("https://pricetrackerorder.herokuapp.com/gettracker", {
        // fetch("http://localhost:2222/gettracker", {
        headers: {
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
        .then((val) => {
          setdata(val.trackerDetail);
          setreturned(true);
        })
        .catch((err) => {
          console.log(err);
          setreturned(true);
        });
    }
  }, [isLogin]);
  const handleDelete = (val) => {
    setitemDelete(val._id);
    setdeleteShow(true);
  };
  const handleEdit = (val) => {
    setitemEdit(val);
    seteditModal(true);
  };
  const handleEditedTrack = () => {
    seteditModal(false);
  };
  const handleEditTrack = () => {
    setreturned(false);
    seteditModal(false);
    fetch("https://pricetrackerorder.herokuapp.com/gettracker", {
      // fetch("http://localhost:2222/gettracker", {
      headers: {
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
      .then((val) => {
        setdata(val.trackerDetail);
        // setreturned(true);
      })
      .catch((err) => {
        console.log(err);
        setreturned(true);
      });
  };
  const confirmDelete = () => {
    if (itemDelete) {
      setdeleteReturned(true);
      let obj = {};
      obj._id = itemDelete;
      fetch("https://pricetrackerorder.herokuapp.com/deleteitem", {
        // fetch("http://localhost:2222/deleteitem", {
        method: "DELETE",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
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
        .then((val) => {
          setdata(val.trackerDetail);
          toast.info("Item has been deleted", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setdeleteShow(false);
        })
        .catch((err) => {
          console.log(err);
          setdeleteReturned(false);
          setdeleteShow(false);
        });
    }
  };
  useEffect(() => {
    if (typeof data != "string") {
      setreturned(true);
      setdeleteReturned(false);
    }
  }, [data]);
  return (
    <>
      {isLogin ? (
        <>
          <div className="viewTracking">
            <Row className="text-center mt-2">
              <Col xs={12}>
                <i className="fas fa-heartbeat fa-3x"></i>
              </Col>
              <Col xs={12}>
                <p style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                  My Trackings
                </p>
              </Col>
            </Row>
            {returned ? (
              data.length > 0 ? (
                <Table
                  bordered
                  variant="dark"
                  responsive
                  className="text-center"
                >
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Product Name</th>
                      <th>Price(when added)</th>
                      <th>Current Price</th>
                      <th>Lowest Price(till added)</th>
                      <th>Expected Price</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((val, index) => (
                      <tr key={index}>
                        <td>
                          {val.image ? (
                            <a
                              href={val.image}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Image
                                src={val.image}
                                thumbnail
                                style={{ height: "10vh", objectFit: "contain" }}
                              />
                            </a>
                          ) : (
                            <p>not available</p>
                          )}
                        </td>
                        <td>
                          {val.url.includes("amazon") ? (
                            <a
                              href={`${val.url}&tag=pricetracker2-21`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {val.name}
                            </a>
                          ) : (
                            <a href={val.url} target="_blank" rel="noreferrer">
                              {val.name}
                            </a>
                          )}
                        </td>
                        <td>
                          <i className="fas fa-rupee-sign"></i>
                          {val.whenAddedPrice}
                        </td>
                        <td>
                          <i className="fas fa-rupee-sign"></i>
                          {val.currentPrice}{" "}
                          {val.whenAddedPrice < val.currentPrice ? (
                            <i
                              className="fas fa-long-arrow-alt-up ml-1"
                              style={{ color: "red" }}
                            ></i>
                          ) : val.whenAddedPrice > val.currentPrice ? (
                            <i
                              className="fas fa-long-arrow-alt-down ml-1"
                              style={{ color: "greenyellow" }}
                            ></i>
                          ) : null}
                        </td>
                        <td>
                          <i className="fas fa-rupee-sign"></i>
                          {val.lowestPrice}
                        </td>
                        <td>
                          <i className="fas fa-rupee-sign"></i>
                          {val.expectedPrice}
                        </td>
                        <td>
                          <i
                            className="fas fa-pencil-alt mr-2 actionButton"
                            style={{ color: "greenyellow", cursor: "pointer" }}
                            onClick={() => handleEdit(val)}
                          ></i>
                          <i
                            className="ml-2 fas fa-trash-alt actionButton"
                            style={{
                              color: "rgb(220,53,69)",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDelete(val)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                  }}
                >
                  <Image src="/emptyCart.gif" fluid />
                  <h5 className="text-center">
                    Nothing found! Please add to view trackings
                  </h5>
                </div>
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "70vh",
                }}
              >
                <Skeleton
                  width={"95vw"}
                  height={"8vh"}
                  count={6}
                  style={{
                    marginRight: "40px",
                    marginLeft: "40px",
                    marginTop: "15px",
                  }}
                />
              </div>
            )}
          </div>
          {
            <Modal
              show={deleteShow}
              onHide={() => setdeleteShow(false)}
              backdrop="static"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title className="deleteTitle">
                  <h4
                    className="deleteTitle-h4"
                    style={{ fontWeight: "bolder" }}
                  >
                    Remove Tracking
                  </h4>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="deleteBody">
                <h5 className="deleteBody-h5">
                  Please confirm to remove this tracking
                </h5>
                <h6
                  className="deleteBody-h6"
                  style={{ color: "rgb(220,53,69)" }}
                >
                  Your action cannot be rolled back
                </h6>
              </Modal.Body>
              <Modal.Footer
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <Button
                  variant="outline-dark"
                  onClick={() => setdeleteShow(false)}
                >
                  Cancel
                </Button>
                <Button variant="outline-danger" onClick={confirmDelete}>
                  {deleteReturned ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mr-1"
                    />
                  ) : null}
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          }
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
          {editModal ? (
            <AddTracking
              item={itemEdit}
              handleTrack={handleEditTrack}
              handleEditedTrack={handleEditedTrack}
            />
          ) : null}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <p style={{ fontSize: "1.5rem" }}>Please Login to continue</p>
        </div>
      )}
    </>
  );
};

export default ViewTracking;
