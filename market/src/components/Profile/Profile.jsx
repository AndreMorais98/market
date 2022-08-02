import React from 'react';
import { useMoralis } from "react-moralis";
import Login from "components/Account/Login";
import Market from "components/Market/Market";
import Web3 from "web3" 
import { ethers } from "ethers";

import "./profile.css";

function Profile() {
  const { isAuthenticated, account, user } =
  useMoralis();  

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner()
  signer.getAddress().then((string) => console.log(string)) 

  const abi = [
    "event ValueChanged(address indexed author, string oldValue, string newValue)",
    "constructor(string value)",
    "function getValue() view returns (string value)",
    "function setValue(string value)"
  ];

  const bytecode = "0x608060405234801561001057600080fd5b506040516105bd3803806105bd8339" +
  "8101604081815282518183526000805460026000196101006001841615020190" +
  "91160492840183905293019233927fe826f71647b8486f2bae59832124c70792" +
  "fba044036720a54ec8dacdd5df4fcb9285919081906020820190606083019086" +
  "9080156100cd5780601f106100a2576101008083540402835291602001916100" +
  "cd565b820191906000526020600020905b815481529060010190602001808311" +
  "6100b057829003601f168201915b505083810382528451815284516020918201" +
  "9186019080838360005b838110156101015781810151838201526020016100e9" +
  "565b50505050905090810190601f16801561012e578082038051600183602003" +
  "6101000a031916815260200191505b5094505050505060405180910390a28051" +
  "610150906000906020840190610157565b50506101f2565b8280546001816001" +
  "16156101000203166002900490600052602060002090601f0160209004810192" +
  "82601f1061019857805160ff19168380011785556101c5565b82800160010185" +
  "5582156101c5579182015b828111156101c55782518255916020019190600101" +
  "906101aa565b506101d19291506101d5565b5090565b6101ef91905b80821115" +
  "6101d157600081556001016101db565b90565b6103bc806102016000396000f3" +
  "0060806040526004361061004b5763ffffffff7c010000000000000000000000" +
  "0000000000000000000000000000000000600035041663209652558114610050" +
  "57806393a09352146100da575b600080fd5b34801561005c57600080fd5b5061" +
  "0065610135565b60408051602080825283518183015283519192839290830191" +
  "85019080838360005b8381101561009f57818101518382015260200161008756" +
  "5b50505050905090810190601f1680156100cc57808203805160018360200361" +
  "01000a031916815260200191505b509250505060405180910390f35b34801561" +
  "00e657600080fd5b506040805160206004803580820135601f81018490048402" +
  "8501840190955284845261013394369492936024939284019190819084018382" +
  "80828437509497506101cc9650505050505050565b005b600080546040805160" +
  "20601f6002600019610100600188161502019095169490940493840181900481" +
  "0282018101909252828152606093909290918301828280156101c15780601f10" +
  "610196576101008083540402835291602001916101c1565b8201919060005260" +
  "20600020905b8154815290600101906020018083116101a457829003601f1682" +
  "01915b505050505090505b90565b604080518181526000805460026000196101" +
  "00600184161502019091160492820183905233927fe826f71647b8486f2bae59" +
  "832124c70792fba044036720a54ec8dacdd5df4fcb9285918190602082019060" +
  "60830190869080156102715780601f1061024657610100808354040283529160" +
  "200191610271565b820191906000526020600020905b81548152906001019060" +
  "200180831161025457829003601f168201915b50508381038252845181528451" +
  "60209182019186019080838360005b838110156102a557818101518382015260" +
  "200161028d565b50505050905090810190601f1680156102d257808203805160" +
  "01836020036101000a031916815260200191505b509450505050506040518091" +
  "0390a280516102f49060009060208401906102f8565b5050565b828054600181" +
  "600116156101000203166002900490600052602060002090601f016020900481" +
  "019282601f1061033957805160ff1916838001178555610366565b8280016001" +
  "0185558215610366579182015b82811115610366578251825591602001919060" +
  "01019061034b565b50610372929150610376565b5090565b6101c991905b8082" +
  "1115610372576000815560010161037c5600a165627a7a723058202225a35c50" +
  "7b31ac6df494f4be31057c7202b5084c592bdb9b29f232407abeac0029";

  let factory = new ethers.ContractFactory(abi, bytecode, signer);
  let contract = factory.deploy("Hello World").then((string) => console.log(string))
  console.log(contract.address);


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
                <a className="edit-link" href="/edit">
                  <i className="fa fa-pencil icon-edit"></i>
                </a>
                <div className="d-flex flex-column align-items-center text-center">
                  <img className="img-account" src="https://imageio.forbes.com/specials-images/imageserve/5ce316de87fac400077d52a5/0x0.jpg?format=jpg&amp;crop=416,416,x0,y0,safe&amp;height=416&amp;width=416&amp;fit=bounds" alt="Admin" />
                  <div className="mt-3 links">
                    <div className="username-div">
                      <h4 className="username"> {user.attributes.username} </h4>
                      <img className="img-verified" src="verified.png" alt="verified"/>
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
    <Market />
  </>
  );
}

export default Profile;
