import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import React, { useState } from 'react';
import Login from "components/Account/Login";
import { useLocation, useNavigate } from 'react-router-dom';
import "./step3.css";
import Papa from "papaparse";
// import Smartcontract from '../../Truffle/build/contracts/LuxyToken.json'
import abi from '../../contracts/abi.json'
import bytecode from '../../contracts/bytecode.json'
import { ethers } from "ethers";

function Step3() {

  const marketAddress = "0xdaea1103Dd8689C993db685CDd1736FE44bb17f2"
  
  const {state} = useLocation();
  const { collection, token, product, path} = state;

  console.log(path)
  const url = path[0].path
  const simple_url = url.slice(0, url.lastIndexOf('/'));

  const [option, setOptions] = useState({abi:[]})

  const handleCSVUpload = (e) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function(results) {
          handeCSVtoJson(results.data)
        }}
      )
    }
  }

  const handeCSVtoJson = file => {
    const ipfsArray = []
  
    if (product==='Watch' || product==='Bags') {
      const header = file[0]
      if (header.length !== 13) {
        alert("Please, verify if the headers are correct")
        return option
      }
      for (let i=1; i < file.length-1; i++) {
        const row = file[i]
        let dicio = {} 
        for(let j=0; j< header.length ; j++){
          if(j === 2) {
            const str =  simple_url + "/" + row[j]
            dicio[header[j]] = str
          }
          else {
            dicio[header[j]] = row[j]
          }
          
        }
        ipfsArray.push({
          path: token + '/' + collection + '/metadata/' + (i-1),
          content: dicio
        })
      }
    }
    else if (product==='Jewellery'){
      const header = file[0]
      if (header.length !== 12) {
        alert("Please, verify if the headers are correct")
        return option
      }
      for (let i=1; i < file.length-1; i++) {
        const row = file[i]
        let dicio = {} 
        for(let j=0; j< header.length ; j++){
          if(j === 2) {
            const str =  simple_url + "/" + row[j]
            dicio[header[j]] = str
          }
          else {
            dicio[header[j]] = row[j]
          }
        }
        ipfsArray.push({
          path: token + '/' + collection + '/metadata/' + (i-1),
          content: dicio
        })
      }
    }
    else if (product==='Clothes' || product==='Shoes'){
      const header = file[0]
      if (header.length !== 10) {
        alert("Please, verify if the headers are correct")
        return option
      }
      for (let i=1; i < file.length-1; i++) {
        const row = file[i]
        let dicio = {} 
        for(let j=0; j< header.length ; j++){
          if(j === 2) {
            const str =  simple_url + "/" + row[j]
            dicio[header[j]] = str
          }
          else {
            dicio[header[j]] = row[j]
          }
        }
        ipfsArray.push({
          path: token + '/' + collection + '/metadata/' + (i-1),
          content: dicio
        })
      }
    }
    option.abi = ipfsArray
  }

  const navigate = useNavigate();


  const Web3Api = useMoralisWeb3Api();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(option.length === 0){
      alert("Please upload your .csv file correctly")
    }
    else {
      const path = await Web3Api.storage.uploadFolder(option);
      
      var re = /(.*)\/[0-9]+$/;
      const url = re.exec(path[0].path)[1] + '/'
      
      console.log(path.length, collection, token, url)

      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner()
    
      console.log(abi)
      console.log(bytecode.object)

      // let factory = new ethers.ContractFactory(abi, bytecode.object, signer);
      // factory.deploy().then((contract) => console.log(contract))

      let contract = new ethers.Contract(marketAddress, abi, signer);
    
      let listingPrice = await contract.getFeePrice();
      listingPrice = listingPrice.toString();

      await contract.createToken(path.length, url, {value: listingPrice}).then(() => navigate('/profile'));
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
      <div className="upload-form-step3">
        <h1>Upload your CSV File</h1>
        <h3>Step 3</h3>
        <p>Before submit, verify if your information is correct! Once your nfts are created, will be forever online and cannot be modified.</p>
        <form onSubmit={handleSubmit}>
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