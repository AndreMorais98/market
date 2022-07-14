import { useMoralis } from "react-moralis";
import { getExplorer } from "helpers/networks";
import "./item.css";

function Item() {
  const { chainId } =
  useMoralis();

  return (
  <>
    <div className="card nft-card">
      <div className="card-body card-nft-body">
        <div className="price-tag">
          <h5 className="price-tag-text">40000</h5>
          <img src="polygon-matic-logo.png" alt="matic logo" />
        </div>

        <div className="nft-img-wrapper">
          <img className="img-nft" src="https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0000_m326238-0009-sky-dweller_portrait.jpg?imwidth=420" alt="Admin" />
        </div>

        <div className="nft-info">
          <div className="mt-3 links">
          <h4>Rolex</h4>
          <p className="text-muted font-size-sm">x098a0sdgs08g089e42gh092h98vn20n02b2230932987u</p>
        </div>
      </div>
      <div className="row row-nft">
        <div className="col-4 nft-buttons">
          <a href="/nft/" target="_blank" rel="noreferrer">
            <i className="fa fa-cart-arrow-down"></i>
          </a>
        </div>
        <div className="col-4 nft-buttons">
          <a href="/history">
            <i className="fas fa-history"></i>
          </a>
        </div>
        <div className="col-4 nft-buttons">
          {/* nft */}
          <a href={`${getExplorer(chainId)}/address`} target="_blank" rel="noreferrer"> 
            <img src="logo-polygonscan.svg" alt="ehterscan" style={{"marginTop":"10px"}}/>
          </a>
        </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Item;
