import { useMoralis } from "react-moralis";
import React, { useState } from 'react';
import Login from "components/Account/Login";
import "./step2.css";

function Step2() {

  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleUploadFiles = files => {
    const uploaded = [...uploadedFiles];
    // eslint-disable-next-line array-callback-return
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    })
    setUploadedFiles(uploaded)
  }

    const handleFileEvent =  (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
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
      <div className="upload-form-step2">
        <h1>Upload Images</h1>
        <h3>Step 2</h3>

        <button className="btn btn-primary" onClick="location.href='../files/nft_collection_form.csv'">Download CSV File</button>
          <p style={{"marginBottom": "5px"}}>Upload the photos that will represent your nft before filling out the .csv file, giving them numerical names to make them easier to handle, for example, 0.png. </p>
          <p>After the upload of the images, you just have to choose which image correspond to each NFT, in the 'Image name' column on your csv.</p>
          <form action="">
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
