import Web3 from "web3";
import { store } from "../App";
import { ERC20Contracts } from "../contracts/constants/contracts";
import { ContractLookup } from "../contracts/contracts.lookup";
import {ethers} from "ethers"
let web3 = new Web3();

// @ts-ignore
export const releaseCollateralRatio = async (amount, gas) => {
    web3 = store.getState().wallet.web3;
debugger
    const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE)
    if (web3.currentProvider) {
        let walletInfo = store.getState().wallet;

        let activeAddress = walletInfo.selected.address;
        // @ts-ignore
        var amountToSend = ethers.utils.parseUnits(amount, contractInfo.decimal);
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress, { from: activeAddress });
            gas = gas * Math.pow(10, 9);
         
            const tx = await contract.methods.releaseCollatteralRatio(amountToSend).send({ gasPrice: gas });
            return tx;
        }
    }
    else return 0;
}
// @ts-ignore
export const settleCollateralRatio = async (amount, gas, activeAddress) => {
    web3 = store.getState().wallet.web3;
    debugger
    const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE)
    if (web3.currentProvider) {
        // @ts-ignore
        //var amountToSend:any = ethers.utils.parseUnits(amount.toString(), contractInfo.decimal);
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress, { from: activeAddress });
            gas = gas * Math.pow(10, 9);
         
            const tx = await contract.methods.settleCollatteralRatio().send({ gasPrice: gas });
            return tx;
        }
    }
    else return 0;
}
// @ts-ignore
export const checkUserCollatteral = async (activeAddress, rate) => {
    web3 = store.getState().wallet.web3;

    const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND_EX_PROX)
    if (web3.currentProvider) {
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress, { from: activeAddress });
            rate = ethers.utils.parseUnits(rate.toString(), contractInfo.decimal);
            const tx = await contract.methods.checkUserCollatteralExternal(activeAddress, rate).call();
            return tx;
        }
    }
    else return 0;
}
