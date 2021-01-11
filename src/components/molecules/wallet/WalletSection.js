import React, { Fragment, useState } from "react";
import Loader from "react-loader-spinner";
import NavTab from "../../atomic/NavTab";
import { RootState } from "../../../store/reducers/Index";
import SelectWalletModal from "./SelectWalletModal";
import { useSelector } from "react-redux";

function WalletSection(props) {
  const { isConnected, selected, loadingBalance } = useSelector(
    (state) => state.wallet
  );

  const [isOpen, setOpen] = useState(false);
  return (
    <Fragment>
      <div className="flex items-center">
        <div className="hidden xl:block lg:block">
          <NavTab path="/" text="WALLET" active={props.location === "/"} />
        </div>
        <button
          onClick={() => setOpen(true)}
          className="focus:outline-none px-4 py-1 rounded-sm bg-customBlue-200 text-white text-xs xxl:text-lg ml-12 flex items-center"
        >
          {loadingBalance && <Loader type="TailSpin" color="#ffffff" height={10} width={10} />}
          {loadingBalance && <text className="ml-2">Processing...</text>}
          {!loadingBalance&&<img
            src="assets/Icons/wallet-icon.svg"
            alt="img"
            className="mr-2 h-3"
          />}
          {!isConnected && !loadingBalance && "Connect Wallet"}
          {isConnected && !loadingBalance && (
            <div className="h-2 w-2 bg-green-200 rounded mr-1 mt-1" />
          )}
          {!loadingBalance && isConnected &&
            selected?.address.slice(0, 5) + "..." + selected?.address.slice(-5)}
        </button>
      </div>

      <SelectWalletModal isOpen={isOpen} close={() => setOpen(false)} />
    </Fragment>
  );
}

export default WalletSection;
