import Web3 from "web3";
import store from '../redux/store';
import { ERC20Contracts } from "../contracts/constants/contracts";
import { ContractLookup } from "../contracts/contracts.lookup";
import { Web3Wrapper } from '@0x/web3-wrapper';
import BigNumber from 'bignumber.js'
import {ethers} from "ethers"
import { updateStackBalances } from "../store/actions/WalletActions";
let web3 = new Web3();

export const mintERC20 = async (amount, /*erc20ContractName: ERC20Contracts,*/ gasPrice) => {
    web3 = store.getState().wallet.web3;
    let walletInfo = store.getState().wallet;

    let activeAddress = walletInfo.selected.address;

    if (web3.currentProvider) {
        const contractInfo = ContractLookup.find(c => c.contractName == ERC20Contracts.BEYOND_EXCHANGE);
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(
                contractInfo.contractAbi, 
                contractInfo?.contractAddress, 
                { from: activeAddress }
            );

            const beyonContractInfo = ContractLookup.find(c => c.contractName == ERC20Contracts.BEYOND);
               // @ts-ignore
            var amountToSend = ethers.utils.parseUnits(amount.toString(), beyonContractInfo.decimal);
            gasPrice = gasPrice * Math.pow(10, 9);
            // @ts-ignore
            const tx = await contract.methods
                .buybUSD(amountToSend)
                .send({ gasPrice: gasPrice });
            return tx;
        }
    }
    else return null;

};


// @ts-ignore
export const getStackedByn = async () => {

   
    web3 = store.getState().wallet.web3;
    let walletInfo = store.getState().wallet;

    let activeAddress = walletInfo.selected.address;
    const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND_EX_PROX)
    if (web3.currentProvider) {
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress);
            try {
                const data = await contract.methods.getBYN(activeAddress).call();
                let bynContract = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND)
                // @ts-ignore
               let unstackedBYN = Number(data.unstackedBYN) / Math.pow(10, bynContract.decimal);
                // @ts-ignore
               let stackedBYN = Number(data.stackedBYN) / Math.pow(10, bynContract.decimal);
                // @ts-ignore
                let totalBYN = Number(data.totalBYN) / Math.pow(10, bynContract.decimal);

                store.dispatch(updateStackBalances(totalBYN,unstackedBYN,stackedBYN));
                return true;
            } catch (error) {
                return false;
            }
        }
    }
    else return false;
}

// @ts-ignore
export const checkUserCollatteral = async () => {
    web3 = store.getState().wallet.web3;
    let walletInfo = store.getState().wallet;

    let activeAddress = walletInfo.selected.address;
    const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND_EX_PROX)
    if (web3.currentProvider) {
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress);
            try {
                const price = await contract.methods.checkUserCollatteral(activeAddress).call();
                return price;
            } catch (error) {
                return 0;
            }
        }
    }
    else return 0;
}
// @ts-ignore
export const collatteralRatio = async () => {
    web3 = store.getState().wallet.web3;
    let walletInfo = store.getState().wallet;

    let activeAddress = walletInfo.selected.address;
    const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND_EX_PROX)
    if (web3.currentProvider) {
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress);
            try {
                const ratio = await contract.methods.collatteralRatio().call();
                return ratio;
            } catch (error) {
                return 0;
            }
        }
    }
    else return 0;
}
