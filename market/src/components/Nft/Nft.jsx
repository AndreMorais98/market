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
    <div class="container">
      <div class="main-body">
        <h1>Rolex Datejust (title)</h1>
        <div class="row gutters-sm">
          <div class="col-6">
            <div class="row">
              <div class="col-12">
                <div class="img-wrapper"><img class="nft-img" src="https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0000_m326238-0009-sky-dweller_portrait.jpg?imwidth=420" alt="Admin" /></div>
              </div>
              <div class="col-12">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree"> Buy </button>
                  </h2>
                  <div class="accordion-collapse collapse show" id="panelsStayOpen-collapseFour" aria-labelledby="panelsStayOpen-headingFour">
                    <div class="accordion-body accordion-buy">
                      <div class="row">
                        <div class="col-6 align-self-center">
                          <h6>Current price: </h6>
                          <span class="price">
                            <img src="polygon-matic-logo.png" alt="polygon-icon"/>
                            450
                          </span>
                        </div>
                        <div class="col-6 button-col">
                          <button class="btn btn-primary" type="button">Buy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 just-content-center">
            <div class="row">
              <div class="col-12" style={{"marginBottom":"30px"}}>
                <div class="card nft-description">
                  <h5 class="created-by">Created by
                    <a class="created-by-link" href="/profile">{user}</a>
                  </h5>
                  <h2 class="description-title">About</h2>
                  <h4>small description</h4>
                  <p>Website:
                    <a href="https://www.rolex.com/">www.rolex.com</a>
                  </p>
                  <p>Token ID: </p>
                  <p>Product ID: </p>
                  <h5 class="created-by">Owned by: <a class="created-by-link" href="/profile">André Morais</a></h5>
                </div>
              </div>
              <div class="col-12">
                <div class="accordion" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne"> Info </button>
                    </h2>
                    <div class="accordion-collapse collapse show" id="panelsStayOpen-collapseOne" aria-labelledby="panelsStayOpen-headingOne">
                      <div class="accordion-body">
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
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo"> Composition </button>
                    </h2>
                    <div class="accordion-collapse collapse" id="panelsStayOpen-collapseTwo" aria-labelledby="panelsStayOpen-headingTwo">
                      <div class="accordion-body">
                        <ul>
                          <li>Vidro: 100%</li>
                          <li>Aço Inoxidável: 100%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree"> Size </button>
                    </h2>
                    <div class="accordion-collapse collapse" id="panelsStayOpen-collapseThree" aria-labelledby="panelsStayOpen-headingThree">
                      <div class="accordion-body">
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

      <div class="nft-history">
        <h2>NFT History</h2>
        <table class="table">
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
                <i class="fas fa-tag">List</i>
              </th>
              <td> 
                <img src="polygon-matic-logo.png" alt="polygon-icon"/> 50
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
                <i class="fas fa-handshake">Transfer</i>
              </th>
              <td> 
                <img src="polygon-matic-logo.png" alt="polygon-icon"/> 200
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
                <i class="fas fa-handshake">Transfer</i>
              </th>
              <td> 
                <img src="polygon-matic-logo.png" alt="polygon-icon"/> 400
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
