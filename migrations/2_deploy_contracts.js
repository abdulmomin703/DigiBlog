const DigiBlog = artifacts.require("DigiBlog");

module.exports = function (deployer) {
  deployer.deploy(DigiBlog);
};
