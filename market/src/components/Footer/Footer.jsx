import "./footer.css";

function Footer() {
  return (
  <>
    <div className="container footer-container">
      <div className="row footer-row">
        <div className="col-md-12 col-lg-12">
          <a href="https://www.facebook.com/andre.morais1998/">
            <i className="fa fa-facebook-official fa-7x w3-hover-opacity"></i>
          </a>
          <a href="https://github.com/AndreMorais98">
            <i className="fa fa-github fa-7x w3-hover-opacity"></i>
          </a>
          <a href="https://www.linkedin.com/in/andremorais1998/">
            <i className="fa fa-linkedin fa-7x w3-hover-opacity"></i>
          </a>
        </div>
        <div className="col-md-12 col-lg-1" style={{ width: "1px", height: "100%", backgroundColor: "white"}}></div>
      </div>
      <div className="row" style={{ margin: "0 50px", borderTop: "1px solid white"}}>
        <div className="col-12">
          <p>© 2022 - Developed by André Morais</p>
        </div>
      </div>
      <div className="button-position">
        <a href="#home">
          <i className="fa fa-arrow-up fa-2x" style={{color: "white",marginRight: "0"}}></i>
        </a>
      </div>
    </div>
  </>
  );
}

export default Footer;
