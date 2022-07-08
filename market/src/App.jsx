import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Layout, Tabs } from "antd";
import "antd/dist/antd.min.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Ramper from "components/Ramper";
import MenuItems from "./components/MenuItems";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: 'Poppins',
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
    minHeight: "calc(100vh - 270px)"
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    height: "72px",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: 'Poppins',
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "rgb(4 17 29 / 50%) 0px 0px 8px 0px",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
  imgWrap: {
    width: "10%",
  },
  imgLogo: {
    height: "60px",
    width: "90px",
  },
  footer: {
    backgroundColor: "#5b6464",
    height: "140px",
    position: "absolute",
    padding: "0",
    bottom: "0",
    width: "100%",
    position: "sticky"

  },
  footerContainer: {
    padding: "20px 0",
    textAlign: "center"
  },
  footerRow: {
    marginBottom: "10px",
    textAlign: "center"
  },
  p: {
    marginTop: "10px",
    fontFamily: 'Poppins',
    fontSize: "16px",
    color: "white"
  },
  a: {
    textDecoration: "none",
    fontSize: "5px",
    color: "white",
    marginRight: "10px"
  },
  buttonPosition: {
    padding: "8px",
    marginRight: "0",
    textDecoration: "none",
    border: "1px solid white",
    borderRadius: "5cm",
    position: "absolute",
    right: "25px",
    top: "35%"
  }
  
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
      <Router>
        <a name="home" />
        <Header style={styles.header}>
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            <TokenPrice
              address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
              chain="eth"
              image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
              size="40px"
            />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route exact path="/quickstart">
              <QuickStart isServerInfo={isServerInfo} />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/1inch">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <DEX chain="eth" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <DEX chain="bsc" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                  <DEX chain="polygon" />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/onramp">
              <Ramper />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/contract">
              <Contract />
            </Route>
            <Route path="/">
              <Redirect to="/quickstart" />
            </Route>
            <Route path="/ethereum-boilerplate">
              <Redirect to="/quickstart" />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>
      </Router>

      <Footer style={styles.footer}>
        <div class="container" style={styles.footerContainer}>
          <div class="row" style={styles.footerRow}>
            <div class="col-md-12 col-lg-12">
              <a style={styles.a} href="https://www.facebook.com/andre.morais1998/">
                <i class="fa fa-facebook-official fa-7x w3-hover-opacity"></i>
              </a>
              <a style={styles.a} href="https://github.com/AndreMorais98">
                <i class="fa fa-github fa-7x w3-hover-opacity"></i>
              </a>
              <a style={styles.a} href="https://www.linkedin.com/in/andremorais1998/">
                <i class="fa fa-linkedin fa-7x w3-hover-opacity"></i>
              </a>
            </div>
            <div class="col-md-12 col-lg-1" style={{ width: "1px", height: "100%", backgroundColor: "white"}}></div>
          </div>
          <div class="row" style={{ margin: "0 50px", borderTop: "1px solid white"}}>
            <div class="col-12">
              <p style={styles.p}>© 2022 - Developed by André Morais</p>
            </div>
          </div>
          <div class="button-position">
            <a style={styles.buttonPosition} href="#home">
              <i class="fa fa-arrow-up fa-2x" style={{color: "white",marginRight: "0"}}></i>
            </a>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={styles.imgWrap}>
    <a href="/" >
      <img src="diamond.png" style={styles.imgLogo} />
    </a>
  </div>
);

export default App;
