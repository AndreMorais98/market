import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMoralis} from "react-moralis";
import { ethers } from "ethers";


import { getExplorer } from "helpers/networks";
import Blockie from "../Blockie";
import Login from "components/Account/Login";
import abi from '../../contracts/abi.json';
import "./publicprofile.css";

function Profile() {
  const marketAddress = process.env.REACT_APP_MARKET_ADDRESS

  let { address } = useParams()

  const [dataFetched, updateFetched] = useState(false);
  const [nfts, updateNfts] = useState([]);

  let navigate = useNavigate();

  const upadteNfts = () => {
    updateFetched(false);
  }

  async function getMyNFTs () {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner()
 
    let contract = new ethers.Contract(marketAddress, abi, signer);

    const nfts = await contract.getMarketNFTs();
    const items = []
    await Promise.all(nfts.map(async i => {
      if (address === i.owner){
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
  
        let item = {
            tokenId: i.tokenId.toNumber(),
            price: meta.price,
            real_price: Math.round((ethers.utils.formatEther( i.price ) / 0.000728 / 0.00001)),
            currentlyListed: i.currentlyListed,
            isOnStore: i.isOnStore,
            seller: i.seller,
            owner: i.owner,
            brand: meta.brand,
            color: meta.color,
            description: meta.description,
            image: meta.image,
            made_in: meta.made_in,
            product_id: meta.product_id,
            size: meta.size,
            title: meta.title,
            type: meta.type,
  
        }
        items.push(item);
      }
    }))
    updateFetched(true);
    updateNfts(items);
    return items
  };

  if (!dataFetched) {
    getMyNFTs()
  }


  const { isAuthenticated, account, user, chainId } = useMoralis();  

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
        <div className="row gutters-sm justify-content-center">
          <div className="col-md-6 align-items-center">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <Blockie className="img-account" currentWallet scale={25} />                  
                  <div className="mt-3 links">
                    <div className="username-div">
                      <h4 className="username"> {user.attributes.username} </h4>
                      <img className="img-verified" src="../verified.png" alt="verified"/>
                    </div>
                    <p className="text-muted font-size-sm" style={{marginBottom: "10px"}}> {account} </p>
                    <a href="https://andremorais98.github.io/">
                      <svg className="feather feather-globe mr-2 icon-inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"> </path>
                      </svg>
                    </a>
                    <a href="https://andremorais98.github.io/">
                      <svg className="feather feather-github mr-2 icon-inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a href="https://andremorais98.github.io/">
                      <svg className="feather feather-twitter mr-2 icon-inline text-info" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                    <a href="https://andremorais98.github.io/">
                      <svg className="feather feather-instagram mr-2 icon-inline text-danger" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="market-container">
      <div className="container">
        <div className="search-bar">
          <input type="text" placeholder="Search.." name="search" />
          <button className="btn" type="submit">
            <i style={{ marginRight: "140px" }}  className="fa fa-search"></i>
          </button>
          <button className="btn btn-primary" onClick={upadteNfts}> Refresh </button>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-1"></div>
      <div className="col-10 media-card">
        <div className="card">
          <div className="card-body">
            <div className="row">
            {nfts.length === 0 &&
              <h2 style={{margin: "100px", width: "100%", textAlign: "center"}}>
                You don't own any NFT. Buy your first or craft a new Collection
              </h2>
            }
              {dataFetched === true && nfts.map((nft, index) => {
                const handleClick = () => {
                  navigate(`/nft/${marketAddress}/${nft.tokenId}`)
                }

                return (
                <div className="col-md-4 col-lg-3">
                  <div className="card nft-card">
                    <div className="card-body card-nft-body">
                      <div className="price-tag">
                        <h5 className="price-tag-text">{nft.real_price} € </h5>
                      </div>

                      <div className="nft-img-wrapper">
                        <img className="img-nft" src={nft?.image || "error"} alt="Admin" />
                      </div>

                      <div className="nft-info">
                        <div className="row">
                          <div className='col-7'>
                            <div className="mt-3 links">
                              <h4>{nft.title} #{nft.tokenId}</h4>
                              <p className="text-muted font-size-sm text-capitalize">{nft.type}</p>
                              <p className="font-size-sm mb-2">Brand: <strong> {nft.brand} </strong></p>
                            </div>
                          </div>
                          <div className='col-5'>
                            <div className="mt-3 links">
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
                      </div>
                    </div>
                    <div className="row row-nft">
                      <div className="col-6 nft-buttons d-flex align-content-center justify-content-center">
                        <button style={{padding: "0",border: "none", background: "none"}} onClick={handleClick}>
                          <i className="fa fa-cart-arrow-down"></i>
                        </button>
                      </div>
                      <div className="col-6 nft-buttons">
                        <a href={`${getExplorer(chainId)}token/${marketAddress}?a=${nft.tokenId}`} target="_blank" rel="noreferrer"> 
                          <img src="../logo-polygonscan.svg" alt="ehterscan" style={{height: "20px"}}/>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );})}
            </div>
          </div>
        </div>
      </div>
      <div className="col-1"></div>
    </div>
  </>
  );
}

export default Profile;
