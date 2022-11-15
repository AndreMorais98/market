import React, { useState }  from 'react';
import Login from "components/Account/Login";
import Filter from "components/Filter/Filter";
import { useMoralis, useNFTBalances, useMoralisWeb3Api} from "react-moralis";
import { getExplorer } from "helpers/networks";
import { useNavigate } from "react-router-dom";
import { useVerifyMetadata } from "hooks/useVerifyMetadata";
import { ethers } from "ethers";
import axios from "axios";
import abi from '../../contracts/abi.json'
import "./market.css";

function Market() {
  const marketAddress = "0xdaea1103Dd8689C993db685CDd1736FE44bb17f2"

  const [dataFetched, updateFetched] = useState(false);
  const [datas, updateDatas] = useState([]);

  const { verifyMetadata } = useVerifyMetadata();
  const Web3Api = useMoralisWeb3Api()
  let navigate = useNavigate();
  
  const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances({address:"0x88a5399e74895264c1dd65c91418bf81695703da"});
  const { isAuthenticated, account, user, chainId } = useMoralis();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner()
 
    let contract = new ethers.Contract(marketAddress, abi, signer);
    let transaction = await contract.getMyNFTs()
    console.log(transaction)

    const items = await Promise.all(transaction.map(async i => {
      const tokenURI = await contract.tokenURI(i.tokenId);
      let meta = await axios.get(tokenURI);
      meta = meta.data;

      let item = {
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
      }
      return item;
    }))

    updateFetched(true);
    updateDatas(items);

    console.log(datas)
  };
    
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

      <button onClick={handleSubmit}> clique aqui </button>
      
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 media-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
              {data?.result?.length === 0 &&
                <h2 className="text-center" style={{margin: "100px"}}>
                  You don't own any NFT. Buy your first or craft a new Collection
                </h2>
              }
                {data === null &&
                  <div class="d-flex justify-content-center">
                    <button class="btn-primary refresh-btn" onClick={() => getNFTBalances({address:"0x88a5399e74895264c1dd65c91418bf81695703da"})}>Reload Market</button>
                  </div>
                }
                {data?.result && data.result.map((nft, index) => {
                  async function handleClick() {
                    const result = await Web3Api.token.getTokenIdMetadata({
                      chain: "mumbai",
                      address: nft.token_address,
                      token_id: nft.token_id
                    })
                    const transfer = await Web3Api.account.getNFTTransfers({
                      chain: "mumbai",
                      address: nft.token_address
                    })
                    navigate(`/nft/${nft.token_address}/${index}`, {state: {data:result, transfer:transfer}})
                  }
                  nft = verifyMetadata(nft);
                  return (
                  <div className="col-md-4 col-lg-3">
                    <div className="card nft-card">
                      <div className="card-body card-nft-body">
                        <div className="price-tag">
                          <h5 className="price-tag-text">40000</h5>
                          <img src="polygon-matic-logo.png" alt="matic logo" />
                        </div>

                        <div className="nft-img-wrapper">
                          <img className="img-nft" src={nft?.image || "error"} alt="Admin" />
                        </div>

                        <div className="nft-info">
                          <div className="mt-3 links">
                          <h4>{nft.metadata.title} #{index}</h4>
                          <p className="text-muted font-size-sm text-capitalize">{nft.metadata.type}</p>
                          <p className="font-size-sm">Collection: <strong> {nft.name} </strong></p>
                        </div>
                      </div>
                      <div className="row row-nft">
                        <div className="col-6 nft-buttons d-flex align-content-center justify-content-center">
                          <button style={{padding: "0",border: "none", background: "none"}} onClick={handleClick}>
                            <i className="fa fa-cart-arrow-down"></i>
                          </button>
                        </div>
                        <div className="col-6 nft-buttons">
                          <a href={`${getExplorer(chainId)}address/${nft.token_address}?a=${index}`} target="_blank" rel="noreferrer"> 
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
