import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "antd/dist/antd.min.css";
import { Layout } from "antd";

import { useMoralis } from "react-moralis";

import "./style.css";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import NativeBalance from "components/NativeBalance";
import Step2 from "components/Step2/Step2";
import Profile from "components/Profile/Profile";
import PublicProfile from "components/PublicProfile/PublicProfile";
import Nft from "components/Nft/Nft";
import Step1 from "components/Step1/Step1";
import HomePage from "components/HomePage";
import Market from "components/Market/Market";
import MenuItems from "./components/MenuItems";

const { Header, Footer } = Layout;

const styles = {
  content: {
    fontFamily: 'Poppins',
    marginTop: "72px",
    minHeight: "calc(100vh - 212px)"
  },
  header: {
    position: "fixed",
    zIndex: 5,
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
    position: "sticky",
    padding: "0",
    bottom: "0",
    width: "100%",
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
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading} = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled,]);

  return (
    <Layout style={{ minHeight: "100vh", overflow: "auto", overflowX: "hidden" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
      
        </Header>

        <div style={styles.content}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/nft/:address/:id" element={<Nft />} />
            <Route path="/create" element={<Nft />} />
            <Route path="/market" element={<Market />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:address" element={<PublicProfile />} />
            <Route path="/step1" element={<Step1 />} /> 
            <Route path="/step2" element={<Step2 />} />
          </Routes>
        </div>
      </Router>

      <Footer style={styles.footer}>
        <div className="container" style={styles.footerContainer}>
          <div className="row" style={styles.footerRow}>
            <div className="col-md-12 col-lg-12">
              <a style={styles.a} href="https://www.facebook.com/andre.morais1998/">
                <i className="fa fa-facebook-official fa-7x w3-hover-opacity"></i>
              </a>
              <a style={styles.a} href="https://github.com/AndreMorais98">
                <i className="fa fa-github fa-7x w3-hover-opacity"></i>
              </a>
              <a style={styles.a} href="https://www.linkedin.com/in/andremorais1998/">
                <i className="fa fa-linkedin fa-7x w3-hover-opacity"></i>
              </a>
            </div>
            <div className="col-md-12 col-lg-1" style={{ width: "1px", height: "100%", backgroundColor: "white"}}></div>
          </div>
          <div className="row" style={{ margin: "0 50px", borderTop: "1px solid white"}}>
            <div className="col-12">
              <p style={styles.p}>© 2022 - Developed by André Morais</p>
            </div>
          </div>
          <div className="button-position">
            <a style={styles.buttonPosition} href="#home">
              <i className="fa fa-arrow-up fa-2x" style={{color: "white",marginRight: "0"}}></i>
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
      <img src="../../diamond.png" style={styles.imgLogo} alt="logo"/>
    </a>
  </div>
);

export default App;
