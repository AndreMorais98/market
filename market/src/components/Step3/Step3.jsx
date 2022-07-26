import { useMoralis } from "react-moralis";
import React, { useState } from 'react';
import Login from "components/Account/Login";
import { useLocation } from 'react-router-dom';
import "./step3.css";
import Papa from "papaparse";

function Step3() {
  
  const {state} = useLocation();
  const { collection, token, product, path} = state;

  console.log(collection, token, path)
  const [valid, setValid] = useState(true)

  const handleCSVUpload = (e) => {
    const files = e.target.files;
    if (files) {
      console.log(files[0]);
      Papa.parse(files[0], {
        complete: function(results) {
          console.log("Finished:", results.data)
          handeCSVtoJson(results.data)
        }}
      )
    }
  }

  const handeCSVtoJson = file => {
    const ipfsArray = []

    console.log(file)
    if (product==='Watch') {
      for (const fileIndex in file) {
        if (fileIndex === 0) {
          const header = file[fileIndex]
          if (header.length !== 12) {
            alert("Please, verify if the headers are correct")
          }
          else {
            // criar o dict com os atributos
          }
        }
        
      }
    }
    else if (product==='Jewellery'){
      console.log(collection, token, path)
    }
    else if (product==='Clothes'){
      console.log(collection, token, path)
    }
    else if (product==='Shoes'){
      console.log(collection, token, path)
    }
    else if (product==='Bags'){
      console.log(collection, token, path)
    }
  }

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
      <div className="upload-form-step3">
        <h1>Upload your CSV File</h1>
        <h3>Step 3</h3>
        <p>Before submit, verify if your information is correct! Once your nfts are created, will be forever online and cannot be modified.</p>
        <form action="">
          <div className="preview">
            <label htmlFor="file-ip-1" style={{"padding":"0"}}>Upload CSV</label>
            <input type="file" id="file-ip-1" accept=".csv,.xlsx,.xls" onChange={handleCSVUpload}/>
          </div>
          <h3 className="mb-2">The beginning of your collection starts now!</h3>
          <div className="btn-upload">
            <input type="submit" value="Submit" name="create" id="submit" />
          </div>
        </form>
      </div>
    </div>
  </>
  );
}

export default Step3;
