import React, { useState } from "react";
import { useAlert } from "react-alert";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import {
  setBeyondExchangeAddressProx,
  setBeyondExProx,
  setLoanProx,
  setSynthAddressBExProx,
  setBeyondExchangeAddressBExProx,
  startExchangeBExProx,
  setBeyondExchangeAddressLoan,
  setSynthAddressPriceFeed,
  setLoanFeeRationInLoan,
  setCollatteralRatioInProx,
  setLoanCollatteralRatioInLoan,
  setTradeFeeInProx,
  setRewardContract,
} from "../../services/generic.services";
import ChangeAddress from "../components/ChangeAddress";
import ChangeSynthAddress from "../components/ChangeSynthAddress";
const MakeChanges = () => {
  const alert = useAlert();
  const { isConnected } = useSelector((state) => state.wallet);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeId, setActiveId] = useState("");
  // 1
  const handelSetBeyondExchangeAddressProx = (address) => {
    setIsLoading(true);
    setActiveId("1");
    setBeyondExchangeAddressProx(address)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };
  // 2
  const handelSetBeyondExProx = (address) => {
    setIsLoading(true);
    setActiveId("2");
    setBeyondExProx(address)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };
  // 3
  const handelSetLoanProx = (address) => {
    setIsLoading(true);
    setActiveId("3");
    setLoanProx(address)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };
  // 4
  const handelSetSynthAddressBExProx = (synth, address) => {
    setIsLoading(true);
    setActiveId("4");
    setSynthAddressBExProx(synth, address)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };
  // 5
  const handelSetBeyondExchangeAddressBExProx = (address) => {
    setIsLoading(true);
    setActiveId("5");
    setBeyondExchangeAddressBExProx(address)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };

  // 6
  const handelStartExchangeBExProx = () => {
    setIsLoading(true);
    setActiveId("6");
    setIsLoading(true);
    startExchangeBExProx()
      .then((res) => {
        setIsLoading(false);
        if (res) {
          setIsLoading(false);
          setIsStarted(true);
          alert.show("Exchange started successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsStarted(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };
  // 7
  const handelSetBeyondExchangeAddressLoan = (address) => {
    setIsLoading(true);
    setActiveId("7");
    setBeyondExchangeAddressLoan(address)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };
  // 8
  const handelSetSynthAddressPriceFeed = (string, address) => {
    setIsLoading(true);
    setActiveId("8");
    setSynthAddressPriceFeed(string, address)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };
  // 9
  const handelSetLoanFeeRationInLoan = (unit) => {
    setIsLoading(true);
    setActiveId("9");
    setLoanFeeRationInLoan(Number(unit))
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };

  // 10

  const handelSetCollatteralRatioInProx = (unit) => {
    setIsLoading(true);
    setActiveId("10");
    setCollatteralRatioInProx(Number(unit))
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };
  // 11
  const handelSetLoanCollatteralRatioInLoan = (unit) => {
    setIsLoading(true);
    setActiveId("11");
    setLoanCollatteralRatioInLoan(Number(unit))
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };
  // 12
  const handelSetTradeFeeInProx = (unit,APY) => {
    setIsLoading(true);
    setActiveId("12");
    setTradeFeeInProx(Number(unit),Number(APY))
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
  };
// 13
const handelSetRewardContract=(address)=>{
  setIsLoading(true);
    setActiveId("13");
    setRewardContract(address)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          alert.show("Address added successfully.", { type: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (err?.code === 4001) {
          alert.show(err.message, { type: "error" });
        } else {
          alert.show("Invalid Address!", { type: "error" });
        }
      });
}
  return (
    <>
      {!isStarted && isConnected && (
        <button
          onClick={handelStartExchangeBExProx}
          style={{ backgroundColor: "#5183bf", width: "100%" }}
          className="text-white btn btn-sm mb-5"
        >
          {isLoading && activeId === "6" ? (
            <Loader type="Bars" color="#ffffff" height={18} width={20} />
          ) : (
            <>
              START EXCHANGE
              <i className="flaticon2-start-up ml-2"></i>
            </>
          )}
        </button>
      )}
      <ChangeAddress
        isLoading={isLoading && activeId === "9" ? true : false}
        placeholdertext={"e.g 50%"}
        labelText={"Enter value"}
        buttonText={"SET VALUE"}
        title={"Update Loan Fee Ratio"}
        description={"To update Loan Fee in Loan contract from Beyond Exchange"}
        handelAddAddress={handelSetLoanFeeRationInLoan}
      />
      <ChangeAddress
        isLoading={isLoading && activeId === "10" ? true : false}
        placeholdertext={"e.g 50%"}
        labelText={"Enter value"}
        buttonText={"SET VALUE"}
        title={"Update Collatteral Ratio"}
        description={
          "To update collatteral ratio in Proxy contract from Beyond Exchange"
        }
        handelAddAddress={handelSetCollatteralRatioInProx}
      />
      <ChangeAddress
        isLoading={isLoading && activeId === "11" ? true : false}
        placeholdertext={"e.g 50%"}
        labelText={"Enter value"}
        buttonText={"SET VALUE"}
        title={"Update Loan Collatteral Ratio"}
        description={
          "To update collatteral ratio in Loan contract from Beyond Exchange"
        }
        handelAddAddress={handelSetLoanCollatteralRatioInLoan}
      />
      {/* start */}
      <ChangeSynthAddress
        isLoading={isLoading && activeId === "12" ? true : false}
        title={"Update Trade Fee & APY"}
        description={
          "To update trade fee in Proxy contract from Beyond Exchange"
        }
        firstlabel="Enter Trade Fee"
        firstPlaceholder="e.g 50%"
        secondlabel="Enter APY"
        secondPlaceholder="e.g 50%"
        buttonText="SET VALUE"
        handelAddAddress={handelSetTradeFeeInProx}
      />
      {/* <ChangeAddress
        isLoading={isLoading && activeId === "12" ? true : false}
        placeholdertext={"e.g 50%"}
        labelText={"Enter value"}
        buttonText={"SET VALUE"}
        title={"Update Trade Fee & APY"}
        description={
          "To update trade fee in Proxy contract from Beyond Exchange"
        }
        handelAddAddress={handelSetTradeFeeInProx}
      /> */}
      {/* End */}
      <ChangeAddress
        isLoading={isLoading && activeId === "1" ? true : false}
        title={"Set Beyond Ex Prox Address In Beyond"}
        description={
          "To add Beyond Exchange Proxy contract address in Beyond contract so that Beyond's specified function can only be called by Beyond Exchange Proxy Contract"
        }
        handelAddAddress={handelSetBeyondExchangeAddressProx}
      />
      <ChangeAddress
        isLoading={isLoading && activeId === "1" ? true : false}
        title={"Set Reward Contract Address In Beyond"}
        description={
          "To add Reward contract address in Beyond contract so that Beyond's specified function can only be called by Reward Contract"
        }
        handelAddAddress={handelSetRewardContract}
      />
      <ChangeAddress
        isLoading={isLoading && activeId === "2" ? true : false}
        title={"Set Beyond Ex Prox Address In Beyond Exchange"}
        description={
          "To set Beyond Exchange Proxy contract address in Beyond Exchange incase if Proxy contract is redeployed in future, it will know which contract to call"
        }
        handelAddAddress={handelSetBeyondExProx}
      />
      <ChangeAddress
        isLoading={isLoading && activeId === "3" ? true : false}
        title={"Set Loan Contract Address In Beyond Exchange"}
        description={
          "To set Loan contract address in Beyond Exchange incase if Loan contract is redeployed in future, it will know which contract to call"
        }
        handelAddAddress={handelSetLoanProx}
      />
      <ChangeAddress
        isLoading={isLoading && activeId === "5" ? true : false}
        title={"Set Beyond Exchange address in Beyond Ex Prox"}
        description={
          "To add Beyond Exchange contract address in Beyond Exhange Prox contract so that it's specified function can only be called by Beyond Exchange Contract"
        }
        handelAddAddress={handelSetBeyondExchangeAddressBExProx}
      />
      <ChangeAddress
        isLoading={isLoading && activeId === "7" ? true : false}
        title={"Set Beyond Exchange address in Loan"}
        description={
          "To add Beyond Exchange contract address in Loan contract so that it's specified function can only be called by Beyond Exchange Contract"
        }
        handelAddAddress={handelSetBeyondExchangeAddressLoan}
      />
      <ChangeSynthAddress
        isLoading={isLoading && activeId === "4" ? true : false}
        title={"Set new synth name and address"}
        description={
          "If a new Synth is made, after deployment of its contract its address will be added in Beyond Exchange Proxy contract so that it can be interacted with on need"
        }
        handelAddAddress={handelSetSynthAddressBExProx}
        buttonText="ADD ADDRESS"
      />
      <ChangeSynthAddress
        isLoading={isLoading && activeId === "8" ? true : false}
        title={"Set new Synth Price Feed Oracle Address"}
        description={
          "To add Oracle Price contract address of specified synth in Price Feed Contract"
        }
        handelAddAddress={handelSetSynthAddressPriceFeed}
        buttonText="ADD ADDRESS"
      />
    </>
  );
};
export default MakeChanges;
