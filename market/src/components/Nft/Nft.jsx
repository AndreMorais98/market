import { useMoralis } from "react-moralis";
import Login from "components/Account/Login";
import "./nft.css";

function Nft() {
  const { isAuthenticated, account, user} =
  useMoralis();

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
        <h1 style={{"textAlign": "center", "marginTop": "50px"}}>Rolex Datejust (title)</h1>
        <div className="row gutters-sm">
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <div className="img-wrapper"><img className="nft-img" src="https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0000_m326238-0009-sky-dweller_portrait.jpg?imwidth=420" alt="Admin" /></div>
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
                            <img src="./polygon-matic-logo.png" alt="polygon-icon" style={{"marginRight": "10px"}}/>450
                          </span>
                        </div>
                        <div className="col-6 button-col">
                          <button className="btn btn-primary" type="button">Buy</button>
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
                  <h5 className="created-by">Created by
                  </h5>
                  <h2 className="description-title">About</h2>
                  <h4>small description</h4>
                  <p>Website:
                    <a href="https://www.rolex.com/">www.rolex.com</a>
                  </p>
                  <p>Token ID: </p>
                  <p>Product ID: </p>
                  <h5 className="created-by">Owned by: <a className="created-by-link" href="/profile">André Morais</a></h5>
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
                        <strong>Relógio cronógrafo de aço inxodável </strong>
                        <p>Mostrador redondo, movimento a quartzo, pulseira ajustável em corrente, fecho de encaixe, ponteiros e coroa de rosca. Esta peça possui garantia padrão de dois anos da marca.</p>
                        <ul>
                          <li>Brand ID: 1791718</li>
                          <li>Made In: Switzerland</li>
                          <li>Color: Black and Gold</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo"> Composition </button>
                    </h2>
                    <div className="accordion-collapse collapse" id="panelsStayOpen-collapseTwo" aria-labelledby="panelsStayOpen-headingTwo">
                      <div className="accordion-body">
                        <ul>
                          <li>Vidro: 100%</li>
                          <li>Aço Inoxidável: 100%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree"> Size </button>
                    </h2>
                    <div className="accordion-collapse collapse" id="panelsStayOpen-collapseThree" aria-labelledby="panelsStayOpen-headingThree">
                      <div className="accordion-body">
                        <ul>
                          <li>Circunferência: 21 cm</li>
                          <li>Diâmetro: 4,6 cm</li>
                          <li>Espessura: 1,2 cm</li>
                          <li>Largura: 2,8 cm</li>
                        </ul>
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
                <i className="fas fa-tag">List</i>
              </th>
              <td style={{"display": "flex"}}> 
                <img src="polygon-matic-logo.png" alt="polygon-icon" style={{"marginRight": "5px"}}/> 50
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
                <i className="fas fa-handshake">Transfer</i>
              </th>
              <td style={{"display": "flex"}}> 
                <img src="polygon-matic-logo.png" alt="polygon-icon" style={{"marginRight": "5px"}}/> 200
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
                <i className="fas fa-handshake">Transfer</i>
              </th>
              <td style={{"display": "flex"}}> 
                <img src="polygon-matic-logo.png" alt="polygon-icon" style={{"marginRight": "5px"}}/> 400
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
