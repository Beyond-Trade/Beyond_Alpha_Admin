import Web3 from "web3";
import store from "../redux/store";
import { ERC20Contracts } from "../contracts/constants/contracts";
import { ContractLookup } from "../contracts/contracts.lookup";
let web3 = new Web3();
// 1
export const setBeyondExchangeAddressProx = async (address) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore

  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods
        .setBeyondExchangeAddressProx(address)
        .send();
      return tx;
    }
  } else return null;
};
// 2
export const setBeyondExProx = async (address) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods.setBeyondExProx(address).send();
      return tx;
    }
  } else return null;
};

// setLoanProx()

export const setLoanProx = async (address) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods.setLoanProx(address).send();
      return tx;
    }
  } else return null;
};

// setSynthAddress()
export const setSynthAddressBExProx = async (string, address) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods
        .setSynthAddressInProx(string, address)
        .send();
      return tx;
    }
  } else return null;
};

// setBeyondExchangeAddress using contract BEYOND EX PROX
export const setBeyondExchangeAddressBExProx = async (address) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods
        .setBeyondExchangeAddressInProx(address)
        .send();
      return tx;
    }
  } else return null;
};

// startExchange using contract BEYOND EX PROX
export const startExchangeBExProx = async () => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods.startExchange().send();
      return tx;
    }
  } else return null;
};

// startExchange using contract BEYOND EX PROX
export const setBeyondExchangeAddressLoan = async (address) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods
        .setBeyondExchangeAddressInLoan(address)
        .send();
      return tx;
    }
  } else return null;
};

// setSynthAddress() using PRICE FEED
export const setSynthAddressPriceFeed = async (string, address) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.PRICE_FEED
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods.setSynthAddress(string, address).send();
      return tx;
    }
  } else return null;
};
export const getPairPrice = (fromRate, toRate) => {
  if (fromRate === 0) return 0;
  let result = (1 / fromRate) * toRate;
  return result;
};

// new functions
export const setTradeFeeInProx = async (unit,APY) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  unit = web3.utils.toWei(String(unit), 'ether')
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods.setTradeFeeAndAPYInProx(unit,APY).send();
      return tx;
    }
  } else return null;
};
// setRewardContract(address _address)

export const setRewardContract = async (address) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore

  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods
        .setRewardContract(address)
        .send();
      return tx;
    }
  } else return null;
};

export const setCollatteralRatioInProx = async (unit) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods.setCollatteralRatioInProx(unit).send();
      return tx;
    }
  } else return null;
};

export const setLoanCollatteralRatioInLoan = async (unit) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods.setLoanCollatteralRatioInLoan(unit).send();
      return tx;
    }
  } else return null;
};

export const setLoanFeeRationInLoan = async (unit) => {
  web3 = store.getState().wallet.web3;
  let walletInfo = store.getState().wallet;
  let activeAddress = walletInfo.selected.address;
  console.log(activeAddress, "===========================");
  // @ts-ignore
  if (web3.currentProvider && activeAddress) {
    const contractInfo = ContractLookup.find(
      (contract) => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE
    );
    if (contractInfo) {
      // @ts-ignore
      const contract = new web3.eth.Contract(
        contractInfo.contractAbi,
        contractInfo?.contractAddress,
        { from: activeAddress }
      );
      // @ts-ignore
      const tx = await contract.methods.setLoanFeeRationInLoan(unit).send();
      return tx;
    }
  } else return null;
};

