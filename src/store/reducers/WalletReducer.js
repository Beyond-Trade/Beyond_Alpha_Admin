import { act } from "react-dom/test-utils";
import Web3 from "web3";
import {
  LOADING_BALANCE_PENDING,
  RESET_WALLET_DATA,
  SAVE_BALANCE_DATA,
  SAVE_WALLET_DATA,
  SAVE_WEB3_DATA,
  SET_Selected_DATA,
  UPDATE_STACK_BALANCE
} from "../actions/WalletActionTypes";

const initialState = {
  stackedBYN:0,
  unstacked:0,
  totalByn:0,
  web3: new Web3(),

  source: "",
  selected: { BYNBalance: 0, EthBalance: 0, USDbBalance: 0, address: "" },
  wallets: [],
  balances: [],
  isConnected: false,
  loadingBalance: false,
};

export function walletReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case UPDATE_STACK_BALANCE:
      return {
        ...state,
        stackedBYN: action.stackedBYN,
        unstacked: action.unstacked,
        totalByn: action.totalByn,
      };
    case SAVE_WEB3_DATA:
      return {
        ...state,
        web3: action.web3,
        source: action.source,
        isConnected: action.isConnected,
      };

    case SET_Selected_DATA:
      return {
        ...state,
        selected: action.selected,
      };

    case LOADING_BALANCE_PENDING:
      return {
        ...state,
        loadingBalance: true,
      };

    case SAVE_WALLET_DATA:
      return {
        ...state,
        wallets: action.wallets,
      };

    case SAVE_BALANCE_DATA:
      return {
        ...state,
        balances: action.balances,
        loadingBalance: false
      };

    case RESET_WALLET_DATA:
      return {
        ...state,
        web3: action.web3,
        source: action.source,
        isConnected: action.isConnected,
        wallets: action.wallets,
        selected: action.selected,
      };

    default:
      return state;
  }
}
