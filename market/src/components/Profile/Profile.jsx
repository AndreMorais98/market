import { useMoralis } from "react-moralis";
import Login from "components/Account/Login";
import Market from "components/Market/Market";
import "./profile.css";

function Profile() {
  const { isAuthenticated, account, user } =
  useMoralis();

  const username = user.attributes["username"]
  console.log(user)
  
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
                        <h4 className="username"> {username} </h4>
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