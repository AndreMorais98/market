import React, { useState }  from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useMoralis} from "react-moralis";
import axios from "axios";

import Filter from "components/Filter/Filter";
import Login from "components/Account/Login";
import { getExplorer } from "helpers/networks";
import abi from '../../contracts/abi.json'
import "./market.css";

function Market() {
  const marketAddress = "0x17C171d47F53e61E09818ebdA56702C75A88c0CC"

  const [dataFetched, updateFetched] = useState(false);
  const [nfts, updateNfts] = useState([]);

  let { search } = useLocation();

  const query = new URLSearchParams(search);
  const paramSearch = query.get('search');
  const paramTypeCloth= query.get('type_cloth');
  const paramMax= query.get('max');
  const paramMin= query.get('min');
  
  let navigate = useNavigate();
  
  const { isAuthenticated, account, chainId } = useMoralis();

  async function getMarketNFT () {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner()
 
    let contract = new ethers.Contract(marketAddress, abi, signer);

    const nfts = await contract.getMarketNFTs();
    const items = []

    await Promise.all(nfts.map(async i => {
      if (i.currentlyListed){
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
    console.log(items)
    return items
  };

  if (!dataFetched) {
    getMarketNFT()
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
                          <h5 className="price-tag-text">{nft.real_price} €</h5>
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
                              <img src="logo-polygonscan.svg" alt="ehterscan" style={{height: "20px"}}/>
                            </a>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )})}
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
