import Web3 from 'web3';
import { store } from '../App';
import { ERC20Contracts } from "../contracts/constants/contracts";
import { ContractLookup } from '../contracts/contracts.lookup';
let web3 = new Web3();

export const currentTime = async () => {
    web3 = store.getState().wallet.web3;
    let walletInfo = store.getState().wallet;
    let activeAddress = walletInfo.selected.address;
    // @ts-ignore
    if (web3.currentProvider) {
        const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND_EX_PROX)
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress, { from: activeAddress });
            // @ts-ignore
            const tx = await contract.methods.currentTime().call()
            return tx;
        }
    }
    else
        return null;
}


export const userRewardDetails = async (time) => {
    web3 = store.getState().wallet.web3;
    let walletInfo = store.getState().wallet;
    let activeAddress = walletInfo.selected.address;
    // @ts-ignore
    if (web3.currentProvider) {
        const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND_EX_PROX)
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress, { from: activeAddress });
            // @ts-ignore
            const tx = await contract.methods.userRewardDetails(activeAddress,time).call()
            return tx;
        }
    }
    else
        return null;
}

// export const checkUserReward = async () => {
//     web3 = store.getState().wallet.web3;
//     let walletInfo = store.getState().wallet;

//     let activeAddress = walletInfo.selected.address;
//     // @ts-ignore
//     if (web3.currentProvider) {
//         const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE)
//         if (contractInfo) {
//             // @ts-ignore
//             const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress, { from: activeAddress });
//             // @ts-ignore
//             const tx = await contract.methods.checkUserReward(1606974935,activeAddress).call()
//             return tx;
//         }
//     }
//     else
//         return null;
// }

export const claimUserReward = async () => {
    web3 = store.getState().wallet.web3;
    let walletInfo = store.getState().wallet;

    let activeAddress = walletInfo.selected.address;
    // @ts-ignore
    if (web3.currentProvider) {
        const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND_EXCHANGE)
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress, { from: activeAddress });
            // @ts-ignore
            const tx = await contract.methods.claimUserReward().send()
            return tx;
        }
    }
    else
        return null;
}



