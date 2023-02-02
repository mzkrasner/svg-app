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
import ReactDOMServer from 'react-dom/server';
import svg64 from 'svg64'; 

const initialState = undefined;

function Dashboard() {
  const [cookie, setHasCookie] = useState("");
  const [svgs, setSvgs] = useState("");
  const [upload, setUpload] = useState("");
  const [loggedOut, setLogOut] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Update the document title using the browser API
    // console.log("loaded");
    // if(loggedOut){
    //   navigate("/account");
    // }
    fetch("http://localhost:3000/account", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
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
        //console.log(data);
        setSvgs(data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/account");
      });
  }, []);

  function ConvertToImageFormat(base64ImageFormat) {
    let url = base64ImageFormat;
    //console.log("hi");
    //console.log(base64ImageFormat)
    //console.log(base64ImageFormat.replace("data:image/svg+xml;base64,", ""))
    let decodedSvg = base64.decode(
      base64ImageFormat.replace("data:image/svg+xml;base64,", "")
    );
    //console.log(decodedSvg);
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
        <textarea className="svg-input" type="text" id="input-textarea" placeholder="Place SVG Code Here..."></textarea>
        <textarea className="svg-name" type="text" id="input-name"  placeholder="SVG Name"></textarea>
        <Button variant="primary" size="sm" className="upload-svg" onClick={createAndUpload}>
          Upload SVG
        </Button>
      </div>
    );
  }

  const createAndUpload = () => {
    const text1 = document.getElementById('input-textarea').value;
    const text2 = document.getElementById('input-name').value;
     if(!text1 || !text2){
      return alert('Both fields are required')
     }
    // //console.log(text1);
    const base64fromSVG = svg64(text1);
    console.log(base64fromSVG, 'this is correct one')
    // const s = 'data:image/svg+xml,' + escape(ReactDOMServer.renderToStaticMarkup((text1)))
    // console.log(s);
    const inputBody = {
      svField: base64fromSVG,
      labelName: text2
    }
    fetch("http://localhost:3000/account/upload", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(inputBody),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //setSignedUp(data);
          window.location.reload();
        }).catch((error) => {
          console.log(error)
        });
        //get new SVG data after upload and before re-render
    //     fetch("http://localhost:3000/account/svg", {
    //   method: "GET",
    //   credentials: "include",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     //console.log(data);
    //     console.log('grabbed additional')
    //     setSvgs(data);
    //     setUpload(initialState);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     navigate("/account");
    //   });
        
  }

  const logout = () => {
    
    fetch("http://localhost:3000/account/logout", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //setSignedUp(data);
          setLogOut(true);
        }).catch((error) => {
          console.log(error)
        });
        navigate('/account')
  }

 

  const loggedInheader = () => {
    const resToDisplay = [];
    for (let i = 0; i < svgs.length; i++) {
      //let newDiv = ConvertToImageFormat(svgs[i].svField);
      let newSvg = <InlineSVG className="grid-item1" src={ConvertToImageFormat(svgs[i].svField)} />
      // console.log(newSvg)
      console.log(svgs[i])
      let newDiv = 
      <div key={i} className="grid-item1" >
      <p className="svg-grid-name">{svgs[i].labelName}</p>
      {newSvg}
      </div>
      
      //<div className="grid-item1" style={{  backgroundImage: `url(${svgs[i].svField})` }}></div>
      
      //let image = <img src={newDiv} />
      resToDisplay.push(newDiv);
    }

    const upload = () => {
      setUpload(true);
      }

    return (
      <div className="Home-header1">
        <Button variant="secondary" size="sm" className="log-out" onClick={logout}>
          Log Out
        </Button>
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
