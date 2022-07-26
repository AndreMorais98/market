import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from "components/Account/Login";
import { CSVLink } from "react-csv";
import "./step2.css";


function Step2() {

  const {state} = useLocation();
  const { collection, token, product, upper} = state;

  const headers = [
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Image Name", key: "image" },
    { label: "Brand ID", key: "brand_id" },
    { label: "Product ID", key: "product_id" },
    { label: "Made In", key: "made_in" },
    { label: "Color", key: "color" },
    { label: "Composition", key: "composition" },
  ];

  if (product === "Watch"){
    headers.push(
      { label: "Circumference", key: "circumference" },
      { label: "Diameter", key: "diameter" },
      { label: "Height", key: "height" },
      { label: "Width", key: "width" },
    )
  }
  else if (product === "Jewellery"){
    headers.push(
      { label: "Circumference", key: "circumference" },
      { label: "Length", key: "length" },
      { label: "Width", key: "width" },
    )
  }
  else if (product === "Clothes"){
    headers.push(
      { label: "Size", key: "size" },
    )
  }
  else if (product === "Shoes"){
    headers.push(
      { label: "Size", key: "size" },
    )
  }
  else if (product === "Bags"){
    headers.push(
      { label: "Depth", key: "depth" },
      { label: "Handle", key: "handle" },
      { label: "Height", key: "height" },
      { label: "Width", key: "width" },
    )
  }
  
  const data = [{}]
  const filename = collection+'_'+token+'_form.csv'

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [option, setOptions] = useState({abi:[]})

  const handleUploadFiles = files => {
    const uploaded = [...uploadedFiles];
    const promises = []
    const ipfsArray = []

    // eslint-disable-next-line array-callback-return
    for (const fileIndex in files) {
      const file = files[fileIndex]
      promises.push(new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = function(event) {
          uploaded.push(file);
          ipfsArray.push({
            path: token + '/' + collection + '/images/' + file.name,
            content: event.target.result
          })
          res();
        };
        reader.readAsDataURL(file);

      }))
    }
    Promise.all(promises).then(() => {
      option.abi = ipfsArray
      console.log(option)
      setUploadedFiles(uploaded)
    })
  }

  const handleFileEvent = (e) => {
    console.log(e)
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles);
  }

  const navigate = useNavigate();

  const Web3Api = useMoralisWeb3Api();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(option.abi)
    if( option.abi.length === 0){
      alert("Please upload atleast 1 file")
    }
    else {
      const path = await Web3Api.storage.uploadFolder(option);
      navigate('/step3', {state: {collection:collection, token:token, product:product, path:path}})
    }
  };



  const { isAuthenticated, account } = useMoralis();
  
  if (!isAuthenticated || !account) {
    return (
      <>
        <Login />
      </>
    )
  }
  return (
  <>
    <div className="container">
      <div className="upload-form-step2">
        <h1>Upload Images</h1>
        <h3>Step 2</h3>
        <p style={{"marginBottom": "10px"}}> Firstly, click on the button to download the csv </p>
        <CSVLink className="btn btn-primary download-btn" headers={headers} data={data} filename={filename}>Download me</CSVLink>
        <p style={{"marginBottom": "5px"}}>Upload the photos that will represent your nft before filling out the .csv file, giving them numerical names to make them easier to handle, for example, 0.png. </p>
        <p>After the upload of the images, you just have to choose which image correspond to each NFT, in the 'Image name' column on your csv.</p>
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="fileUpload">
              <input id='fileUpload' type='file' multiple accept='image/*' onChange={handleFileEvent} />Upload Files
            </label>
          </div>

          <div className="files">
            <h2 style={{"marginTop": "0"}}>Files Selected</h2>
              {uploadedFiles.map(file => (
              <li key="{file.name}">
                {file.name}
              </li>
            ))}
          </div>

          <div className="btn-upload">
            <button className="btn btn-primary" type="submit" >Continue</button>
          </div>
        </form>
      </div>
  </div>
  </>
  );
}

export default Step2;
