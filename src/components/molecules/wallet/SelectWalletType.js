import React from "react";
import WalletOption from "../../atomic/wallet/WalletOption";

import { web3Sources } from "../../../constants";

function SelectWalletType(props) {
  return (
    <div className="d-flex flex-column" style={{margin:"30px",paddingLeft:"30px",paddingRight:"30px"}}>
      <div className="text-center w-full text-primary mt-8" style={{fontSize:"15px"}}>
        Connect your wallet
      </div>
      <WalletOption
        onConnected={props.onSelect}
        text="Metamask"
        image="assets/Icons/Metamask.svg"
        type={web3Sources.Metamask}
      />
      <WalletOption
        onConnected={props.onSelect}
        text="WalletConnect"
        image="assets/Icons/WalletConnect.svg"
        type={web3Sources.WalletConnect}
      />
      <WalletOption
        onConnected={props.onSelect}
        text="Portis"
        image="assets/Icons/Portis.svg"
        type={web3Sources.Portis}
      />
      <WalletOption
        onConnected={props.onSelect}
        text="Coinbase Wallet"
        image="assets/Icons/Coinbase Wallet.svg"
        type={web3Sources.Coinbase}
      />
      <WalletOption
        onConnected={props.onSelect}
        text="Formatic"
        image="assets/Icons/Formatic.svg"
        type={web3Sources.Fortmatic}
      />
    </div>
  );
}

export default SelectWalletType;
