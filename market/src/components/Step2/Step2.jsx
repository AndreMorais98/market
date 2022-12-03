import React, { useState } from 'react';
import { useMoralis } from "react-moralis";
import { useLocation, useNavigate } from 'react-router-dom';
import Login from "components/Account/Login";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import abi from '../../contracts/abi.json'
import bytecode from '../../contracts/bytecode.json'
import { uploadJSONToIPFS } from "../../helpers/uploadipfs";
import { ethers } from "ethers";

import "./step2.css";
import "./step3.css";

function Step2() {

  const marketAddress = "0xC0932dfa5B28f316e87828c1385E20b2Bad6B601"

  const {state} = useLocation();
  const { collection, token, product, upper, path} = state;
  let data = []

  console.log(path)

  // DOWNLOAD CSV

  const headers = [
    { label: "title", key: "title" },
    { label: "description", key: "description" },
    { label: "image", key: "image" },
    { label: "price", key: "price" },
    { label: "brand", key: "brand" },
    { label: "product_id", key: "product_id" },
    { label: "made_in", key: "made_in" },
    { label: "color", key: "color" },
    { label: "composition", key: "composition" },
    { label: "type", key: "type" },
  ];

  if (product === "Watch"){
    headers.push(
      { label: "circumference", key: "circumference" },
      { label: "diameter", key: "diameter" },
      { label: "height", key: "height" },
      { label: "width", key: "width" },
    )
    for(let i=0; i < path.length; i++) {
      data.push({image: path[i].path, type: "watch"})
    }
  }
  else if (product === "Jewellery"){
    headers.push(
      { label: "circumference", key: "circumference" },
      { label: "length", key: "length" },
      { label: "width", key: "width" },
    )
    for(let i=0; i < path.length; i++) {
      data.push({image: path[i].path, type: "jewellery"})
    }
  }
  else if (product === "Clothes"){
    headers.push(
      { label: "size", key: "size" },
    )
    if (upper === "Shirt") {
      for(let i=0; i < path.length; i++) {
        data.push({image: path[i].path, type: "shirt"})
      }
    }
    if (upper === "Coat") {
      for(let i=0; i < path.length; i++) {
        data.push({image: path[i].path, type: "coat"})
      }
    }
    if (upper === "Trousers") {
      for(let i=0; i < path.length; i++) {
        data.push({image: path[i].path, type: "trousers"})
      }
    }
    if (upper === "Shorts") {
      for(let i=0; i < path.length; i++) {
        data.push({image: path[i].path, type: "shorts"})
      }
    }
  }
  else if (product === "Shoes"){
    headers.push(
      { label: "size", key: "size" },
    )
    for(let i=0; i < path.length; i++) {
      data.push({image: path[i].path, type: "shoes"})
    }
  }
  else if (product === "Bags"){
    headers.push(
      { label: "depth", key: "depth" },
      { label: "handle", key: "handle" },
      { label: "height", key: "height" },
      { label: "width", key: "width" },
    )
    for(let i=0; i < path.length; i++) {
      data.push({image: path[i].path, type: "bags"})
    }
  }
  const filename = collection+'_'+token+'_form.csv'

  // UPLOAD CSV

  const [option, setOptions] = useState([])

  const handleCSVUpload = (e) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function(results) {
          handleCSVtoJson(results.data)
        }}
      )
    }
  }

  const handleCSVtoJson = file => {
    const ipfsArray = []
  
    if (product==='Watch' || product==='Bags') {
      const header = file[0]
      if (header.length !== 14) {
        alert("Please, verify if the headers are correct")
        return option
      }
      for (let i=1; i < file.length-1; i++) {
        const row = file[i]
        let dicio = {} 
        for(let j=0; j< header.length ; j++){
          dicio[header[j]] = row[j]
        }
        ipfsArray.push({
          content: dicio
        })
      }
    }
    else if (product==='Jewellery'){
      const header = file[0]
      if (header.length !== 13) {
        alert("Please, verify if the headers are correct")
        return option
      }
      for (let i=1; i < file.length-1; i++) {
        const row = file[i]
        let dicio = {} 
        for(let j=0; j< header.length ; j++){
          dicio[header[j]] = row[j]
        }
        ipfsArray.push({
          content: dicio
        })
      }
    }
    else if (product==='Clothes' || product==='Shoes'){
      const header = file[0]
      if (header.length !== 11) {
        alert("Please, verify if the headers are correct")
        return option
      }
      for (let i=1; i < file.length-1; i++) {
        const row = file[i]
        let dicio = {} 
        for(let j=0; j< header.length ; j++){
          dicio[header[j]] = row[j]
        }
        ipfsArray.push({
          content: dicio
        })
      }
    }
    setOptions(ipfsArray)
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(option.length === 0){
      alert("Please upload your .csv file correctly")
    }
    else {
      for (let i=0; i < option.length; i++) {
        try{
          console.log(option[i].content) 
          const metadataURL = await uploadMetadataToIPFS(option[i].content);
          
          // 1000€ -> 0.01 matic = 0.000007274 ether = 0.088€
          const initial_price = option[i].content["price"] * 0.00001
          const converted_price = initial_price * 0.000728
          const treat_price = (converted_price.toFixed(10)).replace(/0+$/, '')

          const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
          const signer = provider.getSigner()
          
          let contract = new ethers.Contract(marketAddress, abi, signer);
          
          const price = ethers.utils.parseUnits(treat_price, 'ether')
          let listingPrice = await contract.getFeePrice()
          listingPrice = listingPrice.toString()
    
          await contract.createToken(metadataURL, price, { value: listingPrice})
        }
        catch(e) {
          alert( "Upload error" + e)
        }
      }
    }
    navigate('/profile')
  };

  const uploadMetadataToIPFS = async (metadata) => {
    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(metadata);
      if(response.success === true){
          console.log("Uploaded JSON to Pinata: ", response)
          return response.pinataURL;
      }
    }
    catch(e) {
        console.log("error uploading JSON metadata:", e)
    }
  }

  const deployContract = async (e) => {
    e.preventDefault();
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner()
    
      console.log(abi)
      console.log(bytecode.object)

      let factory = new ethers.ContractFactory(abi, bytecode.object, signer);
      factory.deploy().then((contract) => console.log(contract))
    }
    catch(e) {
      alert( "Upload error" + e)
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
        <h1>Download your CSV File</h1>
        <h3>Step 2</h3>
        <p style={{"marginBottom": "10px"}}> Click on the button to download the csv </p>
        <CSVLink className="btn btn-primary download-btn" headers={headers} data={data} filename={filename}>Download me</CSVLink>
        <div className="upload-form-step3">
          <h1>Upload your CSV File</h1>
          <h3>Step 3</h3>
          <p>Before submit, verify if your information is correct! Once your nfts are created, will be forever on the chain and cannot be modified.</p>
          <form onSubmit={handleSubmit}>
            <div className="preview">
              <label htmlFor="file-ip-1" style={{"padding":"0", "marginLeft": "0"}}>Upload CSV</label>
              <input type="file" id="file-ip-1" accept=".csv,.xlsx,.xls" onChange={handleCSVUpload}/>
            </div>
            <h3 className="mb-2">The beginning of your collection starts now!</h3>
            <div className="btn-upload">
              <input type="submit" value="Submit" name="create" id="submit" />
            </div>
          </form>
        </div>
      </div>
  </div>
  </>
  );
}

export default Step2;
