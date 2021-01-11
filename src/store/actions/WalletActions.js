import Web3 from "web3";
import {  LOADING_BALANCE_PENDING, RESET_WALLET_DATA, SAVE_BALANCE_DATA, SAVE_WALLET_DATA, SAVE_WEB3_DATA, SET_Selected_DATA, UPDATE_STACK_BALANCE } from "./WalletActionTypes";

export const SaveWeb3InfoAction = (source,web3) => {
    return { type: SAVE_WEB3_DATA,web3, source, isConnected: true };
};
export const SetSelectedWalletAction = (wallet) => {
    return { type: SET_Selected_DATA, selected: wallet };
};

export const saveWalletsInfoAction = (wallets) => {
    return { type: SAVE_WALLET_DATA, wallets};
};
export const loadingBalancePending = () => {
    return { type: LOADING_BALANCE_PENDING };
};

export const resetWalletsInfoAction = () => {
    let selected = { BYNBalance: 0, EthBalance: 0, USDbBalance: 0, address: '' }
    let web3 = new Web3();
    return { type: RESET_WALLET_DATA, wallets: [], source: '', selected, isConnected: false,web3 };
};


export const saveBalanceInfoAction = (balances) => {
    return { type: SAVE_BALANCE_DATA, balances };
};

export const updateStackBalances = (totalByn,unstacked,stackedBYN)  => {
    return { type: UPDATE_STACK_BALANCE, totalByn,unstacked,stackedBYN };
};