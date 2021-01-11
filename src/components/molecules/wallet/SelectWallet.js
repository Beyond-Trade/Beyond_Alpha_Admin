import { useDispatch, useSelector } from "react-redux";

import { EtherscanBrowsUrl } from "../../../constants";
import Loader from "react-loader-spinner";
import React from "react";
import { SetSelectedWalletAction } from "../../../store/actions/WalletActions";

function SelectWallet(props) {
  const dispatch = useDispatch();
  const { wallets, loadingBalance } = useSelector(
    (state) => state.wallet
  );
  const changeSelectedWallet = async (wallet) => {
    dispatch(SetSelectedWalletAction(wallet));
  };
  console.log(wallets);
  return (
    <div className="px-6 pb-2">
      <div className="d-flex justify-content-center w-full" style={{color:"#68d391",marginTop:"40px"}}>
        Select your wallet
      </div>
      <div>
        <div className="d-flex justify-content-between px-2">
          <p>Wallet Address</p>
          <p>BYN</p>
          <p>USDb</p>
          <p>ETH</p>
          <div />
        </div>
        {loadingBalance && (
          <div className="d-flex justify-content-center items-center mt-6">
            <Loader type="Bars" color="#5183BF" height={30} width={30} />
          </div>
        )}
        {!loadingBalance &&
          wallets.map((item) => (
            <button
              className="d-flex justify-content-between px-2 py-4 mb-3 border border-secondary rounded"
              style={{width:"100%",backgroundColor:"transparent"}}
              onClick={() => {
                changeSelectedWallet(item);
              }}
            >
              <text>
                {item.address.slice(0, 5) + "..." + item.address.slice(-5)}
              </text>
              <text>{item.BYNBalance}</text>
              <text>{item.USDbBalance}</text>
              <text>{item.EthBalance.toFixed(4)}</text>
              <a target="_blank" href={EtherscanBrowsUrl + item.address}>
                {" "}
                <img
                  src="assets/Icons/etherscan-logo-circle.svg"
                  className="h-4"
                />
              </a>
            </button>
          ))}
      </div>
      <div className="d-flex justify-content-between m mt-16">
        <p className="text-muted text-xs font-medium m-0">PAGE 1</p>
        <button
          onClick={() => props.onBack()}
          className=" border border-0 p-0"
          style={{backgroundColor:"transparent"}}
        >
          BACK TO WALLET SELECTION
        </button>
      </div>
    </div>
  );
}

export default SelectWallet;
