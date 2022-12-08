import React, { useState } from 'react';
import { useMoralis, useMoralisWeb3Api} from "react-moralis";
import { useNavigate } from 'react-router-dom';
import Login from "components/Account/Login";
import { uploadJSONToIPFS } from "../../helpers/uploadipfs";
import Moralis from 'moralis';


import "./step1.css";

function Step1() {
  React.useEffect(() => {
    const select = document.querySelector("[data-select]");
    const elems = document.querySelectorAll("[data-show]");
  
    const select_clothes = document.querySelector("[data-select-clothes]");
    const elems_clothes = document.querySelectorAll("[data-show-c]");
  
  
    const updown = {
        "Shirt/Coat" : "[data-show-shirt]",
        "Trousers/Shorts" : "[data-show-trousers]",
    };
  
    const dic = {
        "Watch" : "[data-show-watch]",
        "Jewellery" : "[data-show-jewellery]",
        "Clothes" : "[data-show-clothes]",
        "Shoes" : "[data-show-shoes]",
        "Bags" : "[data-show-bags]",
    }; 
  
    const onSelectChange = () => {
        elems.forEach((elem) => {elem.classList.add("d-none"); elem.querySelector("select").disabled = true});
        document.querySelectorAll(dic[select.value]).forEach((elem) => {
            elem.classList.remove("d-none"); 
            const input = elem.querySelector("input,select");
            input.disabled=false;
            input.dispatchEvent(new Event('change'))
        });
    }
  
    const onSelectClothesChange = () => {
        elems_clothes.forEach((elem) => {elem.classList.add("d-none"); elem.querySelector("select").disabled = true});
        document.querySelectorAll(updown[select_clothes.value]).forEach((elem) => {
            elem.classList.remove("d-none"); 
            elem.querySelector("input,select").disabled=false
        })
    }
    if(select){
      select.addEventListener("change", onSelectChange);
      select_clothes.addEventListener("change", onSelectClothesChange);
    }
  });


  const [uploadedFiles, setUploadedFiles] = useState([])
  const [option, setOptions] = useState({abi:[]})

  const [collection, setCollection] = useState("");
  const [token, setToken] = useState("");
  const [product, setProduct] = useState("");
  const [upper, setUpper] = useState("");

  const handleCollectionChange = (e) => {
    e.preventDefault();
    setCollection(e.target.value);
  };

  const handleTokenChange = (e) => {
    e.preventDefault();
    setToken(e.target.value);
  };

  const handleProductChange = (e) => {
    e.preventDefault();
    setProduct(e.target.value);
  };

  const handleUpperChange = (e) => {
    e.preventDefault();
    setUpper(e.target.value);
  };

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
      setUploadedFiles(uploaded)
    })
  }
  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles);
  }

  const navigate = useNavigate();
  const Web3Api = useMoralisWeb3Api();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product === ''){
      alert("Please choose the type of Product");
    }
    if (product === 'Clothes' && upper === ''){
      alert("Please fill all fields");
    }
    if ( (product === 'Clothes' && upper !== '') || (product !== '' && product !== 'Clothes' && upper === '')){
      if( option.abi.length === 0){
        alert("Please upload atleast 1 file")
      }
      else {
        console.log(option)
        await Moralis.start({
          apiKey: process.env.REACT_APP_MORALIS_API_KEY,
        }).then(async () => {
          const path = await Moralis.EvmApi.ipfs.uploadFolder(option);
          console.log(path?.toJSON());
          navigate('/step2', {state: {collection:collection, token:token, product:product, upper:upper, path:path?.toJSON()}})
        })
      
        
      }
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
      <div className="main-form">
        <h1>Create your NFT collection</h1>
        <h3>Step 1</h3>
        <p>Firstly, you are going to give a name for you collection and a name for your token that will be sent directly to the Smart Contract. Afterwards, select the type of product that you want to craft</p>
        <div className="nft-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="metadataName">Collection Name:</label>
              <input className="form-control"  type="text" name="name" required="required" value={collection} onChange={handleCollectionChange} />
            </div>
            
            <div className="form-group">
              <label htmlFor="metadataToken">Abreviation Token:</label>
              <input className="form-control" type="text" name="token" required="required" value={token} onChange={handleTokenChange} />
            </div>
            
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Type of Product:</label>
              <select className="form-control" id="exampleFormControlSelect1" name="product" required="required" data-select="data-select" value={product} onChange={handleProductChange}>
                <option hidden> Select an option </option>
                <option>Watch</option>
                <option>Jewellery</option>
                <option>Clothes</option>
                <option>Shoes</option>
                <option>Bags</option>
              </select>
            </div>

            <div className="form-group d-none select-clothes" data-show-clothes="data-show-clothes" data-show="data-show">
              <label htmlFor="exampleFormControlSelect2">Down or Upper Body?:</label>
              <select className="form-control" id="exampleFormControlSelect2" name="clothes" required="required" data-select-clothes="data-select-clothes" disabled="disabled" value={upper} onChange={handleUpperChange}>
                <option hidden> Select an option </option>
                <option>Shirt</option>
                <option>Coat</option>
                <option>Trousers</option>
                <option>Shorts</option>
              </select>
            </div>

            <div className="upload-form-step2">
              <h1>Upload Images</h1>
              <p style={{"marginBottom": "10px"}}>Upload the photos that will represent your NFT. Your csv file will be already fill with the link of the image.</p>
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
            </div>

            <div className="btn-upload">
              <button className="btn btn-primary" type="submit" >Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  );
}

export default Step1;
