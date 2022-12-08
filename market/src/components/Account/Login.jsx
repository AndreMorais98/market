import { useState } from "react";

import { useMoralis } from "react-moralis";
import Moralis from 'moralis-v1';

import { connectors } from "./config";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
  title: {
    textAlign: "center",
    padding: "10px",
    fontWeight: "700",
    fontSize: "20px",
  },
  mainContainer: {
    marginTop: "50px",
    backgroundColor: "white",
    marginRight: "25%",
    marginLeft: "25%",
    borderRadius: "10px",
    display: "block",
    justifyContent: "center",
    height: "200px"
  }
};

function Login() {
  const { authenticate, enableWeb3 } = useMoralis();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  const [authError, setAuthError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuth = async (provider) => {
    try {
      setAuthError(null);
      setIsAuthenticating(true);

      await enableWeb3({ throwOnError: true, provider });
      const { account, chainId } = Moralis;

      if (!account) {
        throw new Error('Connecting to chain failed, as no connected account was found');
      }
      if (!chainId) {
        throw new Error('Connecting to chain failed, as no connected chain was found');
      }

      const { message } = await Moralis.Cloud.run('requestMessage', {
        address: account,
        chain: parseInt(chainId, 16),
        network: 'evm',
      });

      await authenticate({
        signingMessage: message,
        throwOnError: true,
      });
      window.localStorage.setItem("connectorId", "injected");
      setIsAuthModalVisible(false);
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <>
      <div style={styles.mainContainer} >
        <h1 style={styles.title} >
          Connect Wallet
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {connectors.map(({ title, icon, connectorId }, key) => (
            <div
              style={styles.connector}
              key={key}
              onClick={() => handleAuth(connectorId)}
            >
              <img src={icon} alt={title} style={styles.icon} />
              <p style={{ fontSize: "14px" }}>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Login;