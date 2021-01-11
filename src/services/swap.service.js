import Web3 from 'web3';
import store from '../redux/store';
import { ERC20Contracts } from "../contracts/constants/contracts";
import { ContractLookup } from '../contracts/contracts.lookup';
let web3 = new Web3();
export const buyBYNToken = async (amount) => {
    web3 = store.getState().wallet.web3;
    let walletInfo = store.getState().wallet;

    let activeAddress = walletInfo.selected.address;
    // @ts-ignore

    amount = web3.utils.toWei(amount, 'ether');

    if (web3.currentProvider) {
        const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND)
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress, { from: activeAddress });

            const tx = await web3.eth.sendTransaction({
                from: activeAddress,
                to: contractInfo.contractAddress,
                value: amount,
                data: contract.methods.buyTokens().encodeABI()
            })
            return tx;
        }
    }
    else
        return null;
}

// @ts-ignore
export const getBynETHRate = async () => {
    web3 = store.getState().wallet.web3;
    const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND)
    if (web3.currentProvider) {
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress);
            try {
                const price = await contract.methods.tokenValue().call();
                return price;
            } catch (error) {
                return 0;
            }
        }
    }
    else return 0;
}

// @ts-ignore
export const BYNTokenValue = async () => {
    web3 = store.getState().wallet.web3;

    const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND)
    if (web3.currentProvider) {
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress);
            try {
                debugger
                let value = await contract.methods.tokenValue().call();
                //value = value/Math.pow(10,contractInfo.decimal)
                return Number(value);
            } catch (error) {
                return 0;
            }
        }
    }
    else return 0;
}
