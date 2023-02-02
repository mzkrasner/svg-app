import Topnav from "../../components/navbar.js";
import Footer from "../../components/footer.js";
import Features from "../../components/features.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import "./form.scss";
import { useNavigate } from "react-router-dom";
import base64 from "react-native-base64";
import InlineSVG from "svg-inline-react";

const initialState = undefined;

function Dashboard() {
  const [cookie, setHasCookie] = useState("");
  const [svgs, setSvgs] = useState("");
  const [upload, setUpload] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Update the document title using the browser API
    console.log("loaded");

    fetch("http://localhost:3000/account", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHasCookie(data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/account");
      });

    fetch("http://localhost:3000/account/svg", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSvgs(data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/account");
      });
  }, []);

  function ConvertToImageFormat(base64ImageFormat) {
    let url = base64ImageFormat;
    console.log("hi");
    //console.log(base64ImageFormat)
    //console.log(base64ImageFormat.replace("data:image/svg+xml;base64,", ""))
    let decodedSvg = base64.decode(
      base64ImageFormat.replace("data:image/svg+xml;base64,", "")
    );
    console.log(decodedSvg);
    // let blob = new Blob([decodedSvg], { type: "image/svg+xml" });
    // url = URL.createObjectURL(blob);

    let source = decodedSvg.toString();

    return source;
    // return <img src={url} alt={`image for ${appTitle}`} />;
    // return svgs;
    // return React.createElement("div", null, { img });
    // return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(svgs) }} />;
    //console.log(item)
    // return (
    //   <InlineSVG src={require(base64ImageFormat)} />
    // )
  }

  const uploadSvg = () => {
    return (
      <div className="Home-header1">
        <h1 className="Account-header">Welcome, {cookie.firstName}</h1>
        <textarea className="svg-input" type="text"></textarea>
      </div>
    );
  }

  const loggedInheader = () => {
    const resToDisplay = [];
    for (let i = 0; i < svgs.length; i++) {
      //let newDiv = ConvertToImageFormat(svgs[i].svField);
      let newDiv = <InlineSVG key={i} className="grid-item1" src={ConvertToImageFormat(svgs[i].svField)} />
      //let image = <img src={newDiv} />
      resToDisplay.push(newDiv);
    }

    const upload = () => {
      setUpload(true);
      }

    return (
      <div className="Home-header1">
        <h1 className="Account-header">Welcome, {cookie.firstName}</h1>
        <Button variant="primary" size="sm" className="upload-svg" onClick={upload}>
          Upload More
        </Button>
        <h2>Your SVGs: </h2>
        <div className="svg-grid1">{resToDisplay}</div>
      </div>
    );
  };

  //default page behavior

  return (
    <div className="Home">
      <Topnav />
      
      {svgs && !upload && loggedInheader()}
      {upload && uploadSvg()}
      <Footer />
    </div>
  );
}

export default Dashboard;

/*
 {svgs && !upload && loggedInheader()}
      {upload && uploadSvg()}
*/
