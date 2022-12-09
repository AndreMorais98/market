import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

import { useMoralis } from "react-moralis";
import { ethers } from "ethers";

import Login from "components/Account/Login";
import abi from '../../contracts/abi.json';
import "./nft.css";

function Nft() {
  const marketAddress = process.env.REACT_APP_MARKET_ADDRESS
  
  const { isAuthenticated, account} = useMoralis();
  
  let { id } = useParams();

  const [dataFetched, updateFetched] = useState(false);
  const [isOwner, updateIsOwner] = useState(false);
  const [notGetInOwner, updateNotGetInOwner] = useState(true);
  const [isSeller, updateIsSeller] = useState(false);
  const [notGetInSeller, updateNotGetInSeller] = useState(true);
  const [isBoth, updateIsBoth] = useState(false);
  const [notGetInBoth, updateNotGetInBoth] = useState(true);
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
        isOnStore: listedToken.isOnStore,
        smart_price: ethers.utils.formatEther(listedToken.price),
        real_price: Math.round((ethers.utils.formatEther( listedToken.price ) / 0.000728 / 0.00001)),
        matic_price: (ethers.utils.formatEther( listedToken.price ) / 0.000728).toFixed(3),
        initial_price: meta.price,
        buyers_list: listedToken.buyers,
        holders: listedToken.holders.toNumber(),
        buyers_list_size: listedToken.buyers.length,
        seller: listedToken.seller,
        owner: listedToken.owner,
        last_owner: listedToken.last_owner,
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
        alert("Reserve Error: "+e)
    }
  }

  const removeBuyer = async (e) => {
    e.preventDefault();
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(marketAddress, abi, signer);

        let removeBuyer = await contract.removeBuyer(id);
        await removeBuyer.wait();

        alert('You have removed ' + nft.buyers_list[0] + ' from the list');
    }
    catch(e) {
        alert("Remove Error: "+e)
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

        alert('You have transfered the NFT to ' + nft.buyers_list[0] + ' with success');
    }
    catch(e) {
        alert("Transfer Error: "+e)
    }
  }
  
  const updatePrice = async (e) => {
    const {price} = formParams;

    if( !price ) {
      alert("Price field is missing");
      return;
    }

    const initial_price = price * 0.00001
    const converted_price = initial_price * 0.000728
    const treat_price = (converted_price.toFixed(10)).replace(/0+$/, '')
    const final_price = ethers.utils.parseUnits(treat_price, 'ether')

    e.preventDefault();
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(marketAddress, abi, signer);
        let priceUpdate = await contract.updatePriceNFT(id, final_price);
        await priceUpdate.wait();
        updateFormParams({ price: ''});
        alert('Price updated');
    }
    catch(e) {
        alert("Update Error"+e)
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
        alert("List Error: "+e)
    }
  }

  const transferToStore = async (e) => {
    e.preventDefault();
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(marketAddress, abi, signer);

        let transferToStore = await contract.transferToStore(id);
        await transferToStore.wait();

        alert('You have to delivery your object to the store, and the NFT will be available on the market');
    }
    catch(e) {
        alert("transferToStore Error: "+e)
    }
  }

  const isOnStore = async (e) => {
    e.preventDefault();
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(marketAddress, abi, signer);

        let isOnStore = await contract.isOnStore(id);
        await isOnStore.wait();

        alert('Your NFT is available on the Marketplace');
    }
    catch(e) {
        alert("isOnStore Error: "+e)
    }
  }

  const removeListNFT = async (e) => {
    e.preventDefault();
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(marketAddress, abi, signer);

        let removeListNFT = await contract.removeListNFT(id);
        await removeListNFT.wait();

        alert('You removed the NFT from the Marketplace');
    }
    catch(e) {
        alert("removeListNFT Error: "+e)
    }
  }
  
  if (!dataFetched) {
    loafNFTMetadata(id)
  }

  if ((account === nft.owner?.toLowerCase()) && notGetInOwner){
    updateIsOwner(true);
    updateNotGetInOwner(false);
  }

  if (account === (nft.seller?.toLowerCase()) && notGetInSeller) {
    updateIsSeller(true);
    updateNotGetInSeller(false);

  }

  if (account === nft.seller?.toLowerCase() && account === nft.owner?.toLowerCase() && notGetInBoth) {
    updateIsBoth(true);
    updateNotGetInBoth(false);
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
                          <span className="price" style={{display: "flex"}}> {nft.real_price} € </span>
                          <span className="price" style={{display: "flex"}}> ------- </span>
                          <span className="price" style={{display: "flex"}}> {nft.matic_price} 
                            <img src="../../polygon-matic-logo.png" alt="polygon-icon" style={{"marginLeft": "10px"}}/>
                          </span>
                        </div>
                        {nft.currentlyListed && nft.isOnStore &&
                        <div style={{paddingTop: "10px", textAlign: "center", alignSelf: "center"}} className="col-5">
                          <span> There is {nft.buyers_list_size} buyers in queue right now! </span>
                        </div>
                        }
                        {nft.currentlyListed && !nft.isOnStore &&
                        <div style={{paddingTop: "10px", textAlign: "center", alignSelf: "center"}} className="col-5">
                          <span> This NFT will be available to buy when the asset is in the store! </span>
                        </div>
                        }
                        
                        {isBoth && !nft.currentlyListed && nft.isOnStore &&
                          <div className="col-9 button-col">
                            <button className="btn btn-primary" onClick={listNFT} type="button">List NFT</button>
                          </div>
                        }
                        {isBoth && nft.currentlyListed && nft.isOnStore && nft.buyers_list_size === 0 &&
                          <div className="col-4 button-col">
                            <button className="btn btn-primary" onClick={removeListNFT} type="button">Remove from Marketplace</button>
                          </div>
                        }

                        {isBoth && nft.currentlyListed && !nft.isOnStore &&
                          <div className="col-4 button-col">
                            <button className="btn btn-primary" onClick={isOnStore} type="button">Confirm Delivery</button>
                          </div>
                        }

                        {isBoth && nft.currentlyListed && nft.isOnStore && nft.buyers_list_size !== 0 &&
                          <div className="col-2 button-col">
                            <button className="btn btn-primary" onClick={removeBuyer} type="button">Remove Buyer</button>
                          </div>
                        }
                        {isBoth && nft.currentlyListed && nft.isOnStore && nft.buyers_list_size !== 0 &&
                          <div className="col-2 button-col">
                            <button style={{height: "62px"}} className="btn btn-primary" onClick={executeSale} type="button">Transfer NFT</button>
                          </div>
                        }


                        {!isOwner && isSeller && !nft.currentlyListed && !nft.isOnStore &&
                          <div className="col-9 button-col">
                            <button className="btn btn-primary" onClick={transferToStore} type="button">Transfer to Store</button>
                          </div>
                        }

                        
                        {!isOwner && !isSeller && nft.currentlyListed && nft.isOnStore && !nft.lower?.includes(account) &&
                          <div className="col-4 button-col">
                            <button className="btn btn-primary" onClick={reserveNFT} type="button">Reserve</button>
                          </div>
                        }
                        {!isOwner && !isSeller && nft.currentlyListed && nft.isOnStore && nft.lower?.includes(account) && !nft.lower[0]?.includes(account) &&
                          <div className="col-4" style={{paddingTop: "10px", textAlign: "center",  alignItems: "center", alignSelf: "center"}}>
                            <b> You already are in the waiting queue </b>
                          </div>
                        }

                        {!isOwner && !isSeller && nft.currentlyListed && nft.isOnStore && nft.lower[0]?.includes(account) &&
                          <div className="col-4" style={{paddingTop: "10px", textAlign: "center",  alignItems: "center", alignSelf: "center"}}>
                            <b> You are the first in the queue, get in touch with the owner/store, sending your wallet address and NFT ID</b>
                          </div>
                        }
                      </div>
                      {isBoth && nft.currentlyListed && nft.isOnStore && nft.buyers_list_size !== 0 &&
                        <div className='row'> 
                          <div className="col-12" style={{padding: "25px 0 0", textAlign: "center"}}>
                            <p>Next buyer is {nft.buyers_list[0]}</p>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                
                </div>
                {isSeller && !nft.currentlyListed &&
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive"> Update Price </button>
                    </h2>
                    <div className="accordion-collapse collapse" id="panelsStayOpen-collapseFive" aria-labelledby="panelsStayOpen-headingFive">
                      <div className="accordion-body">
                        <div style={{display: "grid"}}>
                          <div className='row'>
                            <div className='col-7'>
                              <label className="block text-purple-500 text-sm font-bold mb-0" htmlFor="price"><b>Price in €.</b></label>
                              <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">1000€ = 0.01 Matic = 0.00000726 ETH = 0.01€</label>
                            </div>
                            <div className="col-5 button-col" style={{textAlign: "right", margin: "auto"}}>
                              <button style={{backgroundColor: "#59a796", borderColor: "#59a796", textAlign: "right", margin: "auto"}} className="btn btn-primary" onClick={updatePrice} type="button">Update Price</button>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-12'>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="col-md-6 just-content-center">
            <div className="row">
              <div className="col-12" style={{"marginBottom":"30px"}}>
                <div className="card nft-description">
                  <div className='row'>
                    <div className='col-9'>
                      <h2 className="description-title mt-0 mb-4">About</h2>
                    </div>
                    <div className='col-3' style={{textAlign: "end", alignSelf: "center"}}> 
                      {nft.isOnStore && nft.currentlyListed &&
                        <div className="ready-tag">
                          <h5 className="ready-tag-text"> On sale</h5>
                        </div>
                      }

                      {!nft.isOnStore && nft.currentlyListed &&
                        <div className="waiting-tag">
                          <h5 className="waiting-tag-text"> On sale soon</h5>
                        </div>
                      }

                      {!nft.currentlyListed &&
                        <div className="not-ready-tag">
                          <h5 className="not-ready-tag-text"> Not on sale</h5>
                        </div>
                      }
                    </div>
                  </div>
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
                  <p>Total number of holders: <strong>{nft.holders}</strong></p>
                  <div className="d-flex">
                    <div className='row'>
                      <p style={{marginBottom: "10px", marginRight: "5px"}}>Owned by: 
                        <a className="profile-btn" href={`../../profile/${nft.seller}`}> 
                          <strong> {nft.seller}</strong> 
                        </a>
                      </p>
                      <p style={{marginBottom: "10px", marginRight: "5px"}}>Created by: 
                        <a className="profile-btn" href={`../../profile/${nft.owner}`}> 
                          <strong> {nft.owner}</strong> 
                        </a>
                      </p> 
                      <p style={{marginBottom: "0px", marginRight: "5px"}}>Last Owner was: 
                        <a className="profile-btn" href={`../../profile/${nft.last_owner}`}> 
                          <strong> {nft.last_owner}</strong> 
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
                        {nft?.type === ("shirt" || "coat" || "trousers" || "shorts" || "shoes") &&
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
