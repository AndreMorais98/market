import { useMoralis } from "react-moralis";
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
  const { authenticate } =
    useMoralis();

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
              onClick={async () => {
                try {
                  await authenticate({ provider: connectorId });
                  window.localStorage.setItem("connectorId", connectorId);
                } catch (e) {
                  console.error(e);
                }
              }}
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
