const { assert } = require("chai");

const DigiBlog = artifacts.require("DigiBlog");

//check for chai
require("chai").use(require("chai-as-promised")).should();

contract("DigiBlog", (accounts) => {
  let contract;

  before(async () => {
    contract = await DigiBlog.deployed();
  });

  //testing container - describe

  describe("development", async () => {
    it("deploys successfully", async () => {
      const address = contract.address;
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });
    it("has a valid name.", async () => {
      const name = await contract.contract_name();
      assert.equal(name, "DigiBlog");
    });
  });

  describe("Signup", async () => {
    it("Should be able create new account", async () => {
      await contract.signUp(
        "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea",
        "momin",
        "momin1"
      );
    });
    it("Should not be able create 2 accounts using same address", async () => {
      try {
        await contract.signUp(
          "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea",
          "momin",
          "iqbal",
          "momin1"
        );
        assert(false);
      } catch (e) {
        assert.equal(e.reason, "Error - User already exists");
      }
    });
  });

  describe("Login", async () => {
    it("Should login after creating account", async () => {
      const login = await contract.login(
        "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea"
      );
      assert.equal(login, true);
    });
    it("Should not login without creating account", async () => {
      const login = await contract.login(
        "0xAF96C034c4498b3B625847eE970025D63372e54D"
      );
      assert.equal(login, false);
    });
  });
});
