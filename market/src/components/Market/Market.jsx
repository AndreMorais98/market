import { useMoralis } from "react-moralis";
import Login from "components/Account/Login";
import Item from "components/Item/Item";
import Filter from "components/Filter/Filter";
import "./market.css";

function Profile() {

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
