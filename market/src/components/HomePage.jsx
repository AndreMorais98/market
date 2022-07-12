import React from "react";
import "./homepage.css";


export default function QuickStart( ) {

  return (
    <>
      <div className="front-page">
        <div className="img-bg">
          <div className="container">
            <div className="front-text">
              <div className="center">
                <h1>Buy, Sell and Claim your Luxury Assets With Crypto</h1>
                <h3>The first world NFT Market to guarantee the authenticity of your luxury object</h3><button className="btn-claim"><a className="button" href="/market">Explore it Now</a></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="principles">
        <div className="container">
          <h1>Principles</h1>
          <p>I propose that an NFT that represents or is associated to one or more physical objects, needs to follow the following principles:</p>
          <div className="list-principle-left">
            <div className="img-bg-wrapper">
              <h1>Existence</h1>
              <h3>The assets (physical objects) must always exist if there is an NFT associated. That is one of the main properties of the NFT - the assets are in the center of the ecosystem and their existence does not depend on any third-party.</h3>
            </div>
          </div>

          <div className="list-principle-right">
            <div className="img-bg-wrapper">
              <h1>Control</h1>
              <h3>The owner of the NFT must have absolute control over the NFT and the associated assets.</h3>
            </div>
          </div>

          <div className="list-principle-left">
            <div className="img-bg-wrapper">
              <h1>Acess</h1>
              <h3>The owner of the NFT must always have access to the associated assets, and claim that they belong to him.</h3>
            </div>
          </div>

          <div className="list-principle-right">
            <div className="img-bg-wrapper">
              <h1>Transparency</h1>
              <h3>The NFT's records should be open to the public so that anyone can track the associated asset and see where it came from.</h3>
            </div>
          </div>

          <div className="list-principle-left">
            <div className="img-bg-wrapper">
              <h1>Persistence</h1>
              <h3>NFTs must be persistent and long-lived. The NFT must be available to be transacted or traded as long as the associated asset exist. However, persistence does not mean the association between the asset and the NFT is forever - the owner of the NFT has the right to finish that association if they intend to.</h3>
            </div>
          </div>

          <div className="list-principle-right">
            <div className="img-bg-wrapper">
              <h1>Provable</h1>
              <h3>This can be done through the addition of verifiable attestations made by third trusted parties.</h3>
            </div>
          </div>

          <div className="list-principle-left">
            <div className="img-bg-wrapper">
              <h1>Ownership</h1>
              <h3>The owner of the NFT must own the associated assets.</h3>
            </div>
          </div>

          <div className="list-principle-right">
            <div className="img-bg-wrapper">
              <h1>Portability</h1>
              <h3>The NFT should be portable, in the sense that it can be stored by its owner in a mobile token/device.</h3>
            </div>
          </div>

          <div className="list-principle-left">
            <div className="img-bg-wrapper">
              <h1>Interoperability</h1>
              <h3>The NFT should be transacted across different blochchains/ledgers, meaning that it has to be interoperable with different blockchains/ledgers.</h3>
            </div>
          </div>

          <div className="list-principle-right">
            <div className="img-bg-wrapper">
              <h1>Consent</h1>
              <h3>The transaction of the NFT can only occur with the consent of its owner. Even when proofs are added by third-parties, it must have the consent of the owner to be added to the NFT.</h3>
            </div>
          </div>

          <div className="list-principle-left">
            <div className="img-bg-wrapper">
              <h1>Minimalization</h1>
              <h3>In the process of sharing information about the owner of the NFT and the associated assets, the disclosure of personal information should be minimal, in order to enhance the owner's privacy. When applicable or needed, selective disclosure of the owner´s personal data (or of the information of the associated asset) can be achieved using zero-knowledge techniques.</h3>
            </div>
          </div>
          
          <div className="list-principle-right">
            <div className="img-bg-wrapper">
              <h1>Protection</h1>
              <h3>The rights of the owner of the NFT should be prioritized over the needs of the underlying blockchain/ledger.</h3>
            </div>
          </div>

          <div className="list-principle-left">
            <div className="img-bg-wrapper">
              <h1>Usability</h1>
              <h3>The users should not be aware of the NFT and blockchain system's intricacy. Despite the complexity of the procedures and mechanisms, user interfaces should be simple enough for the average user to use properly the platform and control their NFT.</h3>
            </div>
          </div>

          <div className="list-principle-right">
            <div className="img-bg-wrapper">
              <h1>Counterfeit Prevention</h1>
              <h3>A malicious user should not be able to counterfeit a NFT or gain access to other people's NFTs. To limit the risk of this scenario, blockchain must provide a tamper-resistant system and prevent channel sniffing assaults.</h3>
            </div>
          </div>

          <div className="list-principle-left">
            <div className="img-bg-wrapper">
              <h1>Secure Transactions</h1>
              <h3>Users are able to securely interact with their NFT, including the transaction of the NFT.</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
