import React from 'react';
import Login from "components/Account/Login";
import Filter from "components/Filter/Filter";
import { useMoralis, useNFTBalances, useMoralisWeb3Api} from "react-moralis";
import { getExplorer } from "helpers/networks";
import { useNavigate } from "react-router-dom";
import { useVerifyMetadata } from "hooks/useVerifyMetadata";
import "./market.css";

function Market() {
  const { verifyMetadata } = useVerifyMetadata();
  const Web3Api = useMoralisWeb3Api()
  
  const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances({address:"0x88a5399e74895264c1dd65c91418bf81695703da"});
  
  let navigate = useNavigate();

  
  const { isAuthenticated, account, user, chainId } = useMoralis();  
  
  console.log(!data)

  if (!isAuthenticated || !account) {
    return (
      <>
        <Login />
      </>
    )
  }
  if (!data) {
    return (
      <div className="container">
      <h2 className="text-center" style={{margin: "100px"}}>
        The page is loading...
      </h2>
      <div class="loader"></div>
    </div>
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
              {data?.result?.length === 0 &&
                <h2 className="text-center" style={{margin: "100px"}}>
                  You don't own any NFT. Buy your first or craft a new Collection
                </h2>
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
