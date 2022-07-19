import { useMoralis } from "react-moralis";
import Login from "components/Account/Login";
import "./step3.css";

function Step3() {
  
  const { isAuthenticated, account } = useMoralis();
  
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
      <div className="upload-form-step3">
        <h1>Upload your CSV File</h1>
        <h3>Step 3</h3>
        <p>Before submit, verify if your information is correct! Once your nfts are created, will be forever online and cannot be modified.</p>
        <form action="">
          <div className="preview">
            <label for="file-ip-1" style={{"padding":"0"}}>Upload CSV</label>
            <input type="file" id="file-ip-1" accept="*.csv" />
          </div>
          <h3 className="mb-2">The beginning of your collection starts now!</h3>
          <div className="btn-upload">
            <input type="submit" value="Submit" name="create" id="submit" />
          </div>
        </form>
      </div>
    </div>
  </>
  );
}

export default Step3;
