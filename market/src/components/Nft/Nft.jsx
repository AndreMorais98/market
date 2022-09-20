import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Login from "components/Account/Login";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./nft.css";

function Nft() {
  const { isAuthenticated, account} =
  useMoralis();

  const Web3Api = useMoralisWeb3Api()
  let { address, id } = useParams();

  const {state} = useLocation();
  const { data, transfer} = state;
  
  const clean_data = JSON.parse(data?.metadata)
  
  let navigate = useNavigate();
  
  const fetchBlock = async() => {
    const result = await Web3Api.account.getNFTsForContract({
      chain: "mumbai",
      address: account,
      token_address: address
    })
    console.log(result)
  }

  async function loadProfile() {
    const result = await Web3Api.account.getNFTs({
      chain: "mumbai",
      address: data.owner_of
    })
    navigate(`/profile/${data.owner_of}/`, {state: {data:result}})
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
        <h1 style={{"textAlign": "center", "marginTop": "50px"}}> {clean_data.title} #{data.token_id} </h1>
        <div className="row gutters-sm">
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <div className="img-wrapper"><img className="nft-img" src={clean_data.image} alt="Admin" /></div>
              </div>
              <div className="col-12">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree"> Buy </button>
                  </h2>
                  <div className="accordion-collapse collapse show" id="panelsStayOpen-collapseFour" aria-labelledby="panelsStayOpen-headingFour">
                    <div className="accordion-body accordion-buy">
                      <div className="row">
                        <div className="col-6 align-self-center">
                          <h6>Current price: </h6>
                          <span className="price" style={{"display": "flex"}}>
                            <img src="../../polygon-matic-logo.png" alt="polygon-icon" style={{"marginRight": "10px"}}/>450
                          </span>
                        </div>
                        <div className="col-6 button-col">
                          <button className="btn btn-primary" onClick={fetchBlock} type="button">Buy</button>
                        </div>
                      </div>
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
                  {clean_data?.website &&
                  <p>Website:
                    <a href="https://www.rolex.com/">{clean_data.description}</a>
                  </p>
                  }
                  <p>Type: <strong className="text-capitalize">{clean_data.type}</strong></p>
                  <p>Collection: <strong>{data.name}</strong></p>
                  {clean_data?.brand &&
                    <p>Brand :<strong> {clean_data.brand_id} </strong></p>
                  }
                  <p>Product ID: <strong>{clean_data.product_id}</strong></p>
                  <div className="d-flex">
                  <p style={{marginBottom: "0px", marginRight: "5px"}}>Owned by: </p> <button className="profile-btn" onClick={loadProfile}> <strong>{data.owner_of}</strong> </button>

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
                        {clean_data?.description &&
                          <p className="mb-2">{clean_data.description}</p>
                        }
                        <ul>
                          {clean_data?.made_in &&
                            <li><strong>Made In:</strong> {clean_data.made_in}</li>
                          }
                          {clean_data?.color &&
                            <li><strong>Color:</strong> {clean_data.color}</li>
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                  {clean_data?.composition &&
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo"> Composition </button>
                      </h2>
                      <div className="accordion-collapse collapse" id="panelsStayOpen-collapseTwo" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <p> {clean_data?.composition} </p>
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
                        {clean_data?.type === "watch" &&
                        <ul>
                          {clean_data?.circumference &&
                          <li><strong>Circumference:</strong> {clean_data?.circumference} cm</li>
                          }
                          {clean_data?.diameter &&
                          <li><strong>Diameter:</strong> {clean_data?.diameter} cm</li>
                          }
                          {clean_data?.height &&
                          <li><strong>Height:</strong> {clean_data?.height} cm</li>
                          }
                          {clean_data?.width &&
                          <li><strong>Width:</strong> {clean_data?.width} cm</li>
                          }
                        </ul>
                        }
                        {(clean_data?.type === "shirt" || "coat" || "trousers" || "shorts" || "shoes") &&
                        <ul>
                          <li><strong>Size:</strong> {clean_data?.size} cm</li>
                        </ul>
                        }
                        {(clean_data?.type === "jewellery") &&
                        <ul>
                          {clean_data?.circumference &&
                          <li><strong>Circumference:</strong> {clean_data?.circumference} cm</li>
                          }
                          {clean_data?.length &&
                          <li><strong>Length:</strong> {clean_data?.length} cm</li>
                          }
                          {clean_data?.width &&
                          <li><strong>Width:</strong> {clean_data?.width} cm</li>
                          }
                        </ul>
                        }
                        {(clean_data?.type === "bags") &&
                        <ul>
                          {clean_data?.depth &&
                          <li><strong>Depth:</strong> {clean_data?.depth} cm</li>
                          }
                          {clean_data?.handle &&
                          <li><strong>Handle:</strong> {clean_data?.handle} cm</li>
                          }
                          {clean_data?.height &&
                          <li><strong>Height:</strong> {clean_data?.height} cm</li>
                          }
                          {clean_data?.width &&
                          <li><strong>Width:</strong> {clean_data?.width} cm</li>
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

      <div className="nft-history">
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
      </div>
    </div>
  </>
  );
}

export default Nft;
