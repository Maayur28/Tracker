import React,{useState} from "react";
import AddTracking from '../AddTracking/addTracking';
import "./carousel.css";
import { Image, Button } from "react-bootstrap";

const Carousel = () => {
 const[addTrack,setaddTrack]=useState(false);
 const[viewTrack,setviewTrack]=useState(false);
  const handleAddTracking=()=>{
    setaddTrack(true);
  }
  const handleViewTracking=()=>{
    setviewTrack(true)
  }
  const handleTrack=()=>{
    setaddTrack(false);
    setviewTrack(false);
  }
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
        <Button className="mb-2" variant="outline-dark" onClick={handleAddTracking}>
          ADD TRACKING
        </Button>
        <Button className="mb-2" variant="outline-dark" onClick={handleViewTracking}>
          VIEW TRACKING
        </Button>
      </div>
    </div>
    {
      addTrack?<AddTracking handleTrack={handleTrack}/>:null
    }
    </>
  );
};

export default Carousel;
