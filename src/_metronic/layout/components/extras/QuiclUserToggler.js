/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { useMemo, useState } from "react";

import { UserProfileDropdown } from "./dropdowns/UserProfileDropdown";
import objectPath from "object-path";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { useSelector } from "react-redux";
import SelectWalletModal from "../../../../components/molecules/wallet/SelectWalletModal";
import Loader from "react-loader-spinner";

export function QuickUserToggler() {
  const { user } = useSelector((state) => state.auth);
  const { isConnected, selected, loadingBalance } = useSelector(
    (state) => state.wallet
  );
  console.log(user);
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
    };
  }, [uiService]);
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      {layoutProps.offcanvas && (
        <OverlayTrigger
          placement="bottom"
      overlay={<Tooltip id="quick-user-tooltip">{isConnected && !loadingBalance ? "Connected":"Connect your wallet"}</Tooltip>}
        >
          <div className="topbar-item" onClick={() => setOpen(true)}>
            <div
              className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
              // id="kt_quick_user_toggle"
            >
              {/* <>
                <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
                  Hi,
                </span>
                <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
                  {user.role === "admin" ? user.fullName : user.firstName}
                </span>
                <span className="symbol symbol-35 symbol-light-success">
                  <span className="symbol-label font-size-h5 font-weight-bold">
                    {user.role === "admin"
                      ? user.fullName.charAt(0).toUpperCase()
                      : <img src={user.imgUrl} alt="img" /> ||
                        user.firstName.charAt(0).toUpperCase()}
                  </span>
                </span>
              </> */}
               <button
          onClick={() => setOpen(true)}
          style={{backgroundColor:"#5183bf"}}
          className="text-white btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
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
            <div className="bg-success border border-0 rounded-circle mr-1 mt-1" style={{height:"10px",width:"10px"}} />
          )}
          {!loadingBalance && isConnected &&
            selected?.address.slice(0, 5) + "..." + selected?.address.slice(-5)}
        </button>
            </div>
          </div>
         
       </OverlayTrigger>
      )}
      <SelectWalletModal isOpen={isOpen} close={() => setOpen(false)} />
{/* 
      {!layoutProps.offcanvas && <UserProfileDropdown />} */}
    </>
  );
}
