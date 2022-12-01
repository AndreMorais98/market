import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

import { useMoralis } from "react-moralis";
import { ethers } from "ethers";

import Login from "components/Account/Login";
import abi from '../../contracts/abi.json';
import "./nft.css";

function Nft() {
  const marketAddress = "0x5053140143Bb64901109Bb9422D3e0c4315e33cB"
  
  const { isAuthenticated, account} = useMoralis();
  
  let { address, id } = useParams();

  const [dataFetched, updateFetched] = useState(false);
  const [isOwner, updateIsOwner] = useState(false);
  const [notGetIn, updateNotGetIn] = useState(true);
  const [nft, updateNft] = useState({});
  const [formParams, updateFormParams] = useState({ price: ''});



  async function loafNFTMetadata(tokenId) {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner()
 
    let contract = new ethers.Contract(marketAddress, abi, signer);
  
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);


    let meta = await axios.get(tokenURI);
    meta = meta.data;
    
    let item = {
        tokenId: tokenId,
        currentlyListed: listedToken.currentlyListed,
        price: meta.price,
        buyers_list: listedToken.buyers,
        buyers_list_size: listedToken.buyers.length,
        seller: listedToken.seller,
        owner: listedToken.owner,
        brand: meta.brand,
        color: meta.color,
        description: meta.description,
        composition: meta.composition,
        image: meta.image,
        made_in: meta.made_in,
        product_id: meta.product_id,
        size: meta.size,
        title: meta.title,
        type: meta.type,
    }
    let complete_item = {}
    const lower = [];


    item.buyers_list.forEach(element => {
      lower.push(element.toLowerCase());
    });

    if (meta.type === ("shoes" || "shirt" || "coat" || "trousers" || "shorts")) {
      complete_item = {
        ...item,
        size: meta.size,
        lower: lower
      }
    }

    if (meta.type === "bags") {
      complete_item = {
        ...item,
        depth: meta.depth,
        handle: meta.handle,
        height: meta.height,
        width: meta.width,
        lower: lower
      }
    }

    if (meta.type === "jewellery") {
      complete_item = {
        ...item,
        circumference: meta.circumference,
        length: meta.length,
        width: meta.width,
        lower: lower
      }
    }

    if (meta.type === "watch") {
      complete_item = {
        ...item,
        circumference: meta.circumference,
        diameter: meta.diameter,
        height: meta.height,
        width: meta.width,
        lower: lower
      }
    }
    console.log(complete_item)
    updateFetched(true);
    updateNft(complete_item);
  };

  const reserveNFT = async (e) => {
    e.preventDefault();
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(marketAddress, abi, signer);

        let transaction = await contract.reserveNFT(id);
        await transaction.wait();

        alert('You have been placed in the reserve queue for the purchase of this NFT. Stay tuned until the owner of this NFT contacts you');
    }
    catch(e) {
        alert("Upload Error"+e)
    }
  }

  const removeBuyer = async (e) => {
    e.preventDefault();
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(marketAddress, abi, signer);

        let firstBuyer = await contract.getFirstBuyer(id);
        await firstBuyer.wait();

        let removeBuyer = await contract.removeBuyer(id);
        await removeBuyer.wait();

        alert('You have removed' + firstBuyer + 'from the list');
    }
    catch(e) {
        alert("Upload Error"+e)
    }
  }

  const executeSale = async (e) => {
    e.preventDefault();
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(marketAddress, abi, signer);

        let transaction = await contract.executeSale(id);
        await transaction.wait();

        alert('You have been placed in the reserve queue for the purchase of this NFT. Stay tuned until the owner of this NFT contacts you');
    }
    catch(e) {
        alert("Upload Error"+e)
    }
  }
  
  const updatePrice = async (e) => {
    const {price} = formParams;

    if( !price ) {
      return;
    }
    
    e.preventDefault();
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(marketAddress, abi, signer);


        let firstBuyer = await contract.updatePriceNFT(id, price);
        await firstBuyer.wait();
        updateFormParams({ price: ''});
        alert('Price updated');
    }
    catch(e) {
        alert("Upload Error"+e)
    }
  }


  const listNFT = async (e) => {
    e.preventDefault();
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(marketAddress, abi, signer);

        let listNFT = await contract.listNFT(id);
        await listNFT.wait();

        alert('You NFT is available on the Marketplace');
    }
    catch(e) {
        alert("Upload Error"+e)
    }
  }
  
  if (!dataFetched) {
    loafNFTMetadata(id)
  }

  if ((account === ((nft.seller)?.toLowerCase() || (nft.owner)?.toLowerCase())) && notGetIn){
    updateIsOwner(true)
    updateNotGetIn(false)
    console.log("is owner?", isOwner)
  }
  

  if (nft === {}){
    return (
      <>
        <div className="container">
          <div className="main-body">
            <h1> There is no NFT with that address and tokenID </h1>
          </div>
        </div>
      </>
    )
  }
  

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
      <div className="main-body">
        <h1 style={{"textAlign": "center", "marginTop": "50px"}}> {nft.title} #{nft.tokenId} </h1>
        <div className="row gutters-sm">
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <div className="img-wrapper"><img className="nft-img" src={nft.image} alt="Admin" /></div>
              </div>
              <div className="col-12">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree"> Buy </button>
                  </h2>
                  <div className="accordion-collapse collapse show" id="panelsStayOpen-collapseFour" aria-labelledby="panelsStayOpen-headingFour">
                    <div className="accordion-body accordion-buy">
                      <div className="row">
                        <div className="col-3 align-self-center">
                          <h6>Current price: </h6>
                          <span className="price" style={{"display": "flex"}}> {nft.price} € </span>
                        </div>
                        <div style={{paddingTop: "10px", textAlign: "center",  alignItems: "center"}} className="col-5">
                          <span> There is {nft.buyers_list_size} buyers in queue right now! </span>
                        </div>
                        {isOwner && !nft.currentlyListed &&
                          <div className="col-4 button-col">
                            <button className="btn btn-primary" onClick={listNFT} type="button">List NFT</button>
                          </div>
                        }
                        {isOwner && nft.currentlyListed && nft.buyers_list_size !== 0 &&
                          <div className="col-2 button-col">
                            <button className="btn btn-primary" onClick={removeBuyer} type="button">Remove Buyer</button>
                          </div>
                        }
                        {isOwner && nft.currentlyListed && nft.buyers_list_size !== 0 &&
                          <div className="col-2 button-col">
                            <button style={{height: "62px"}} className="btn btn-primary" onClick={executeSale} type="button">Transfer</button>
                          </div>
                        }
                        {!isOwner && nft.currentlyListed && !nft.lower?.includes(account) &&
                          <div className="col-4 button-col">
                            <button className="btn btn-primary" onClick={reserveNFT} type="button">Reserve</button>
                          </div>
                        }
                        {!isOwner && nft.currentlyListed && nft.lower?.includes(account) &&
                          <div className="col-4" style={{paddingTop: "10px", textAlign: "center",  alignItems: "center"}}>
                            <b> You already are in the waiting queue </b>
                          </div>
                        }
                      </div>
                      {isOwner && nft.currentlyListed && nft.buyers_list_size !== 0 &&
                          <div className='row'> 
                            <div className="col-12" style={{padding: "25px 0 0", textAlign: "center"}}>
                              <p>Next buyer is {nft.buyers_list[0]}</p>
                            </div>
                          </div>
                        }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 just-content-center">
            <div className="row">
              <div className="col-12" style={{"marginBottom":"30px"}}>
                <div className="card nft-description">
                  <h2 className="description-title mt-0 mb-4">About</h2>
                  {nft?.website &&
                  <p>Website:
                    <a href="https://www.rolex.com/">{nft.description}</a>
                  </p>
                  }
                  <p>Type: <strong className="text-capitalize">{nft.type}</strong></p>
                  {nft?.brand &&
                    <p>Brand :<strong> {nft.brand} </strong></p>
                  }
                  <p>Product ID: <strong>{nft.product_id}</strong></p>
                  <div className="d-flex">
                    <div className='row'>
                      <p style={{marginBottom: "10px", marginRight: "5px"}}>Owned by: 
                        <a className="profile-btn" href={`../../profile/${nft.seller}`}> 
                          <strong> {nft.seller}</strong> 
                        </a>
                      </p>
                      <p style={{marginBottom: "0px", marginRight: "5px"}}>Created by: 
                        <a className="profile-btn" href={`../../profile/${nft.owner}`}> 
                          <strong> {nft.owner}</strong> 
                        </a>
                      </p> 
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne"> Info </button>
                    </h2>
                    <div className="accordion-collapse collapse show" id="panelsStayOpen-collapseOne" aria-labelledby="panelsStayOpen-headingOne">
                      <div className="accordion-body">
                        {nft?.description &&
                          <p className="mb-2">{nft.description}</p>
                        }
                        <ul>
                          {nft?.made_in &&
                            <li><strong>Made In:</strong> {nft.made_in}</li>
                          }
                          {nft?.color &&
                            <li><strong>Color:</strong> {nft.color}</li>
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                  {nft?.composition &&
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo"> Composition </button>
                      </h2>
                      <div className="accordion-collapse collapse" id="panelsStayOpen-collapseTwo" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <p> {nft?.composition} </p>
                        </div>
                      </div>
                    </div>
                  }
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree"> Size </button>
                    </h2>
                    <div className="accordion-collapse collapse" id="panelsStayOpen-collapseThree" aria-labelledby="panelsStayOpen-headingThree">
                      <div className="accordion-body">
                        {nft?.type === "watch" &&
                        <ul>
                          {nft?.circumference &&
                          <li><strong>Circumference:</strong> {nft?.circumference} cm</li>
                          }
                          {nft?.diameter &&
                          <li><strong>Diameter:</strong> {nft?.diameter} cm</li>
                          }
                          {nft?.height &&
                          <li><strong>Height:</strong> {nft?.height} cm</li>
                          }
                          {nft?.width &&
                          <li><strong>Width:</strong> {nft?.width} cm</li>
                          }
                        </ul>
                        }
                        {(nft?.type === "shirt" || "coat" || "trousers" || "shorts" || "shoes") &&
                        <ul>
                          <li><strong>Size:</strong> {nft?.size}</li>
                        </ul>
                        }
                        {(nft?.type === "jewellery") &&
                        <ul>
                          {nft?.circumference &&
                          <li><strong>Circumference:</strong> {nft?.circumference} cm</li>
                          }
                          {nft?.length &&
                          <li><strong>Length:</strong> {nft?.length} cm</li>
                          }
                          {nft?.width &&
                          <li><strong>Width:</strong> {nft?.width} cm</li>
                          }
                        </ul>
                        }
                        {(nft?.type === "bags") &&
                        <ul>
                          {nft?.depth &&
                          <li><strong>Depth:</strong> {nft?.depth} cm</li>
                          }
                          {nft?.handle &&
                          <li><strong>Handle:</strong> {nft?.handle} cm</li>
                          }
                          {nft?.height &&
                          <li><strong>Height:</strong> {nft?.height} cm</li>
                          }
                          {nft?.width &&
                          <li><strong>Width:</strong> {nft?.width} cm</li>
                          }
                        </ul>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="nft-history">
        <h2>NFT History</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">EVENT</th>
              <th scope="col">PRICE</th>
              <th scope="col">FROM</th>
              <th scope="col">TO</th>
              <th scope="col">VERIFIED BY</th>
              <th scope="col">DATE</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>
                <i className="fas fa-tag"> List</i>
              </th>
              <td style={{"display": "flex"}}> 
                <img src="../../polygon-matic-logo.png" alt="polygon-icon" style={{"marginRight": "5px"}}/> 50
              </td>
              <td> 
                <a href="/profile">Rolex</a>
              </td>
              <td> </td>
              <td> </td>
              <td>27-05-2022</td>
            </tr>

            <tr>
              <th> 
                <i className="fas fa-handshake"> Transfer</i>
              </th>
              <td style={{"display": "flex"}}> 
                <img src="../../polygon-matic-logo.png" alt="polygon-icon" style={{"marginRight": "5px"}}/> 200
              </td>
              <td> 
                <a href="/profile">Rolex</a>
              </td>
              <td>Otto</td>
              <td> 
                <a href="/profile">Rolex</a>
              </td>
              <td>27-05-2022</td>
            </tr>

            <tr>
              <th>
                <i className="fas fa-handshake"> Transfer</i>
              </th>
              <td style={{"display": "flex"}}> 
                <img src="../../polygon-matic-logo.png" alt="polygon-icon" style={{"marginRight": "5px"}}/> 400
              </td>
              <td>Otto</td>
              <td>Larry the Bird</td>
              <td> 
                <a href="/profile">Rolex</a>
              </td>
              <td>31-05-2022</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  </>
  );
}

export default Nft;
