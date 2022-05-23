import Web3 from "web3";
import { toastMessage } from "../components/common/toast";
export const getWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();

      return web3;
    } catch (e) {
      throw e;
    }
  } else if (window.web3) {
    const web3 = window.web3;
    console.log("Injected web3 detected.");
    return web3;
  } else {
    // for the local connection
    // const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    // const web3 = new Web3(provider);
    // console.log("No Web 3 instance injected");
    // return web3;
    toastMessage("Please Connect The Meta Mask", "error");
    return false;
  }
};
