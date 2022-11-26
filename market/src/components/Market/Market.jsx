import React, { useState }  from 'react';
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useMoralis, useNFTBalances, useMoralisWeb3Api} from "react-moralis";
import { useVerifyMetadata } from "hooks/useVerifyMetadata";
import axios from "axios";

import Filter from "components/Filter/Filter";
import Login from "components/Account/Login";
import { getExplorer } from "helpers/networks";
import abi from '../../contracts/abi.json'
import "./market.css";

function Market() {
  const marketAddress = "0xF2E809ad906279F0dde19D6050f961A98a11E2e6"

  const [dataFetched, updateFetched] = useState(false);
  const [nfts, updateNfts] = useState([]);
  
  let navigate = useNavigate();
  
  const { isAuthenticated, account, user, chainId } = useMoralis();

  async function getMarketNFTs () {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner()
 
    let contract = new ethers.Contract(marketAddress, abi, signer);

    const nfts = await contract.getMarketNFTs();

    const items = await Promise.all(nfts.map(async i => {
      const tokenURI = await contract.tokenURI(i.tokenId);
      let meta = await axios.get(tokenURI);
      meta = meta.data;

      let item = {
          tokenId: i.tokenId.toNumber(),
          price: i.price * 1000000,
          currentlyListed: i.currentlyListed,
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
      return item;
    }))
    updateFetched(true);
    updateNfts(items);
    return items
  };

  if (!dataFetched) {
    getMarketNFTs()
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
      <div className="market-container">
        <div className="container">
          <Filter />
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
                    There is no NFTs on the market
                  </h2>
                }
                {dataFetched === true && nfts.map((nft, index) => {
                  const handleClick = () => {
                    navigate(`/nft/${nft.owner}/${nft.tokenId}`)
                  }

                  return (
                  <div className="col-md-4 col-lg-3">
                    <div className="card nft-card">
                      <div className="card-body card-nft-body">
                        <div className="price-tag">
                          {/* Enviar no excel o price do produto*/}
                          <h5 className="price-tag-text">40000</h5>
                          <img src="polygon-matic-logo.png" alt="matic logo" />
                        </div>

                        <div className="nft-img-wrapper">
                          <img className="img-nft" src={nft?.image || "error"} alt="Admin" />
                        </div>

                        <div className="nft-info">
                          <div className="mt-3 links">
                          <h4>{nft.title} #{nft.tokenId}</h4>
                          <p className="text-muted font-size-sm text-capitalize">{nft.type}</p>
                          <p className="font-size-sm">Brand: <strong> {nft.brand} </strong></p>
                        </div>
                      </div>
                      <div className="row row-nft">
                        <div className="col-6 nft-buttons d-flex align-content-center justify-content-center">
                          <button style={{padding: "0",border: "none", background: "none"}} onClick={handleClick}>
                            <i className="fa fa-cart-arrow-down"></i>
                          </button>
                        </div>
                        <div className="col-6 nft-buttons">
                          {/* VERIFICAR O NFT OWNER OU SE É nft.MARKETPLACE */}
                          <a href={`${getExplorer(chainId)}token/${nft.owner}?a=${nft.tokenId}`} target="_blank" rel="noreferrer"> 
                            <img src="logo-polygonscan.svg" alt="ehterscan" style={{height: "20px"}}/>
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

export default Market;
