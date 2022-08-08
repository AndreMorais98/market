var LuxyToken = artifacts.require("LuxyToken.sol");

module.exports = function (deployer) {
  deployer.deploy(LuxyToken, 10, "teste", "teste", "teste");
};