import React, { useState } from "react";
import AddTracking from "../AddTracking/addTracking";
import "./carousel.css";
import {useHistory} from 'react-router-dom';
import { Image, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Carousel = () => {
  const history=useHistory();
  const [addTrack, setaddTrack] = useState(false);
  const handleAddTracking = () => {
    if(localStorage.getItem('x-auth-token'))
    setaddTrack(true);
    else
    {
      toast.dark('Please login/register to continue', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
    }
  };
  const handleTrack = () => {
    setaddTrack(false);
  };
  const viewTracking = () => {
    if(localStorage.getItem('x-auth-token'))
    history.push('/viewtrackings');
    else
    {
      toast.dark('Please login/register to continue', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
    }
  };
  return (
    <>
      <div className="carousel">
        <Image
        src="bgBeat.jpg"
        fluid
        style={{ width: "100vw", height: "90vh" }}
      />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            position: "absolute",
            top: "30%",
          }}
        >
          <p className="heading">WE ARE TRACKING... FOR YOU</p>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            position: "absolute",
            top: "70%",
            justifyContent: "space-evenly",
            width: "100vw",
          }}
        >
          <Button
            className="mb-2"
            variant="outline-dark"
            onClick={handleAddTracking}
          >
            ADD TRACKING
          </Button>
          <Button className="mb-2" variant="outline-dark" onClick={viewTracking}>
            VIEW TRACKING
          </Button>
        </div>
      </div>
      {addTrack ? <AddTracking handleTrack={handleTrack} /> : null}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default Carousel;
