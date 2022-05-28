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
        "iqbal",
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
      const login = await contract.login.call({
        from: "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea",
      });
      assert.equal(login, true);
    });
    it("Should not login without creating account", async () => {
      const login = await contract.login.call({
        from: "0xAF96C034c4498b3B625847eE970025D63372e54D",
      });
      assert.equal(login, false);
    });
  });

  describe("Get User Information", async () => {
    it("Should be able to get user information after login", async () => {
      const user_info = await contract.getUserInfo.call({
        from: "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea",
      });
      assert.equal(user_info.firstname, "momin");
      assert.equal(user_info.lastname, "iqbal");
      assert.equal(user_info.username, "momin1");
    });
  });

  describe("Create Blog and Get Blog Info", async () => {
    it("Logged In user must be able to Create Blog", async () => {
      await contract.createBlog(
        "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea",
        "title",
        "body",
        "image"
      );

      const blog_info = await contract.getBlogInfo(1);
      assert.equal(
        blog_info.blogger_address,
        "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea"
      );
      assert.equal(blog_info.title, "title");
      assert.equal(blog_info.body, "body");
      assert.equal(blog_info.image, "image");
    });
  });

  describe("Delete Blog and Get All Blogs", async () => {
    it("Logged In user must be able to Create Blog", async () => {
      await contract.createBlog(
        "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea",
        "title1",
        "body1",
        "image1"
      );
      await contract.createBlog(
        "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea",
        "title1",
        "body1",
        "image1"
      );
      let value = await contract.getAllBlogs();
      assert.equal(value[0], 1);
      assert.equal(value[1], 2);
      assert.equal(value[2], 3);

      await contract.deleteBlog(2);
      value = await contract.getAllBlogs();
      assert.equal(value[0], 1);
      assert.equal(value[1], 3);
    });
  });

  describe("Edit Blog", async () => {
    it("User must be able to Edit Blog", async () => {
      await contract.editBlog(
        1,
        "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea",
        "title5",
        "body5",
        "image5"
      );
      const blog_info = await contract.getBlogInfo(1);
      assert.equal(
        blog_info.blogger_address,
        "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea"
      );
      assert.equal(blog_info.title, "title5");
      assert.equal(blog_info.body, "body5");
      assert.equal(blog_info.image, "image5");
    });
  });

  describe("Each user must be able to view his/her own blogs", async () => {
    it("User must be able to View his/her Blogs", async () => {
      await contract.signUp(
        "0xAF96C034c4498b3B625847eE970025D63372e54D",
        "talha",
        "muanawar",
        "talha1"
      );

      await contract.createBlog(
        "0xAF96C034c4498b3B625847eE970025D63372e54D",
        "titleT",
        "bodyT",
        "imageT"
      );

      let value = await contract.getUserBlogs.call({
        from: "0xF40edA02462D3173485C3f0a4F8EfbdfB9cB51Ea",
      });
      assert.equal(value[0], 1);
      assert.equal(value[2], 3);

      value = await contract.getUserBlogs.call({
        from: "0xAF96C034c4498b3B625847eE970025D63372e54D",
      });
      assert.equal(value[0], 4);
    });
  });
});
