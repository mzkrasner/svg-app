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
import { Helmet } from 'react-helmet';

const initialState = undefined;

function Dashboard() {
  const [cookie, setHasCookie] = useState("");
  const [svgs, setSvgs] = useState("");
  const [upload, setUpload] = useState("");
  const [update, setUpdate] = useState("");
  const [deletion, setDelete] = useState("");
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
    // console.log(blob)
    // let newestItem = URL.createObjectURL(blob);
    // console.log(newestItem)
      
    let source = decodedSvg.toString();
    //console.log(source);
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

  function createUpdateName(e){
    console.log(e.target.id)
    setUpdate(e.target.id);
  }

  function updateName(event) {
    console.log(event.target.id.replace('rename-', ''));
    const targetUpdate = event.target.id.replace('rename-', '');
    const input = document.getElementById('update-box').value;
    if(!input){
      alert('Your update must have a new name');
      setUpdate(false);
    }
    else {
      fetch("http://localhost:3000/account/svg", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({id: targetUpdate, newName: input}),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
  }

  function deleteItem(event) {
    console.log(event.target.id.replace('delete-', ''));
    const targetDelete = event.target.id.replace('delete-', '');
    fetch("http://localhost:3000/account/svg", {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({id: targetDelete}),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function copyItem(item) {
    console.log(item.props.src);
    const copiedItem = item.props.src;
    navigator.clipboard.writeText(item.props.src).then(() => {
      alert("Your SVG has been copied to the clipboard");
    });
    
  }

  const uploadSvg = () => {
    return (
      <div className="Home-header1">
        <Button variant="secondary" size="sm" className="log-out" onClick={() => setUpload(false)}>
          Back
        </Button>
        <h1 className="Account-header">Upload new files below, {cookie.firstName}</h1>
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
      let newSvg = <InlineSVG className="grid-item2" src={ConvertToImageFormat(svgs[i].svField)} id={svgs[i]._id}/>
      // console.log(newSvg)
      //console.log(svgs[i]);
      
      let newDiv = 
      <div key={i} className="grid-item1" >
      <p className="svg-grid-name">{svgs[i].labelName}</p>
      <div className="update-buttons">
      {(update !== svgs[i]._id) &&<Button variant="info" size="sm" className="mod-buttons" id={`${svgs[i]._id}`} onClick={createUpdateName}>Rename</Button>}
      {(update == svgs[i]._id) && <div className="update-div"><input id="update-box" className="update-box"></input><div><button className="submit-button-box" id={`rename-${svgs[i]._id}`} onClick={updateName}>Submit</button><button className="submit-button-box2" onClick={() => setUpdate(false)}>Cancel</button></div></div>}
       <Button variant="danger" size="sm" className="mod-buttons" id={`delete-${svgs[i]._id}`} onClick={deleteItem}>Delete</Button>
       <Button variant="secondary" size="sm" className="mod-buttons" id={`copy-${svgs[i]._id}`} onClick={() => copyItem(newSvg)}>Copy</Button>
      </div>
      
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
        <h2>You have {svgs.length} SVGs in your collection: </h2>
        <div className="svg-grid1">{resToDisplay}</div>
      </div>
    );
  };

  //default page behavior

  return (
    <div className="Home">
      <Helmet>
        <title>Account - View, Upload, Delete, and Update SVGs</title>
        <meta name="description" content="Store, upload, and delete SVGs here" />
        
      </Helmet>
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
