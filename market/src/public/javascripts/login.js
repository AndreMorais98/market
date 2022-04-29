const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
Moralis.start({ serverUrl, appId });

async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate();
  }
  console.log("logged in user:", user);
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;