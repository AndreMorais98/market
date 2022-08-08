import { useMoralis } from "react-moralis";
import Login from "components/Account/Login";
import Item from "components/Item/Item";
import Filter from "components/Filter/Filter";
import "./market.css";
import Smartcontract from '../../Truffle/build/contracts/LuxyToken.json'
import { ethers } from "ethers";



function Profile() {

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner()
  signer.getAddress().then((string) => console.log("Signer", string)) 

  const abi = Smartcontract.abi
  const bytecode = Smartcontract.bytecode

  let factory = new ethers.ContractFactory(abi, bytecode, signer);
  let contract = factory.deploy("Hello World").then((string) => console.log(string))
  console.log(contract.address);



  const { isAuthenticated, account, } =
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
              <Item />
              <Item />
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
