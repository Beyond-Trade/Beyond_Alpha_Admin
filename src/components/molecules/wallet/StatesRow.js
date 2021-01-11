import { Balance } from "../../../store/types/WalletState";
import { ERC20Contracts } from "../../../contracts/constants/contracts";
import React from "react";
import { RootState } from "../../../store/reducers/Index";
import { useSelector } from "react-redux";

function StatesRow() {
  const { balances } = useSelector((state) => state.wallet);
  let totalWalletValue = balances.reduce((a, b) => {
    return a + Number(b.cryptoBalance * b.rate);
  }, 0);

  let totalSynthValue = balances
    .filter(function (obj) {
      return !obj.isEther;
    })
    .reduce((a, b) => {
      return a + Number(b.cryptoBalance * b.rate);
    }, 0);
  let bynBalance = balances.find(function (obj) {
    return obj.isSiteToken;
  });
  let totalBynPercentage = bynBalance
    ? ((bynBalance?.cryptoBalance * bynBalance?.rate) / totalSynthValue) * 100
    : 0;
  let USDbBalance = balances.find(function (obj) {
    return obj.short == ERC20Contracts.USDb;
  });

  let totalUSDbBalancePercentage = USDbBalance
    ? ((USDbBalance?.cryptoBalance * USDbBalance?.rate) / totalSynthValue) * 100
    : 0;

  let othersBalPercentage =
    totalUSDbBalancePercentage && totalBynPercentage
      ? ((totalUSDbBalancePercentage + totalBynPercentage) / totalSynthValue) *
        100
      : 0;
  return (
    <div className="px-8 xl:px-24 lg:px-24 xl:flex lg:flex">
      <div className="bg-customGray-100 rounded mr-8 w-full mt-8">
        <div className="rounded-t bg-gray-300 text-gray-600 text-xs xxl:text-base px-2 py-1 font-medium">
          <h5>TOTAL SYNTHETIC ASSET VALUE</h5>
        </div>
        <h3 className="font-medium text-xxs xxl:text-lg text-center my-6 mx-2">
          ${totalSynthValue ? totalSynthValue.toFixed(2) : "0.00"} USD
        </h3>
      </div>
      <div className="bg-customGray-100 rounded mr-8 w-full mt-8">
        <div className="rounded-t bg-gray-300 text-gray-600 text-xs xxl:text-base px-2 py-1 font-medium">
          <h5>SYNTHETIC ASSET BREAKDOWN</h5>
        </div>
        <div className="flex content-between justify-between px-8">
          <img
            src="assets/Icons/Synthetic asset breakdown.svg"
            alt="img"
            className="h-12 xxl:h-20 my-2 mr-6"
          />
          <div className="text-xxs xxl:text-lg">
            <div className="flex items-center text-xs xxl:text-sm text-gray-500 font-medium mt-1">
              <img
                src="assets/Icons/Purple.Ellipse.svg"
                alt="img"
                className="h-3 xxl:h-4 "
              />
              <h6 className="ml-1 mr-2">BYN</h6>
              <h6>
                {totalBynPercentage ? totalBynPercentage.toFixed(2) : "00.00"}%
              </h6>
            </div>
            <div className="flex items-center text-xs xxl:text-sm text-gray-500 font-medium mt-1">
              <img
                src="assets/Icons/Purple.Ellipse.svg"
                alt="img"
                className="h-3 xxl:h-4 "
              />
              <h6 className="ml-1 mr-2">USDb</h6>
              <h6>
                {totalUSDbBalancePercentage
                  ? totalUSDbBalancePercentage.toFixed(2)
                  : "00.00"}
                %
              </h6>
            </div>
            <div className="flex items-center text-xs xxl:text-sm text-gray-500 font-medium mt-1">
              <img
                src="assets/Icons/Purple.Ellipse.svg"
                alt="img"
                className="h-3 xxl:h-4 "
              />
              <h6 className="ml-1 mr-2">Others</h6>
              <h6>
                {othersBalPercentage ? othersBalPercentage.toFixed(2) : "00.00"}
                %
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-customGray-100 rounded mr-8 mt-8 w-full">
        <div className="rounded-t bg-gray-300 text-gray-600 text-xs xxl:text-base px-2 py-1 font-medium">
          <h5>COLLETERLIZATION RATIO</h5>
        </div>
        <div className="flex ">
          <div className="flex flex-col items-center w-full pt-3">
            <h2 className="text-orange-400 text-lg xxl:text-xl font-medium">
              0%
            </h2>
            <p className="font-bold text-xxs  xxl:text-lg">CURRENT</p>
          </div>
          <div className="flex flex-col items-center w-full pt-3">
            <h2 className="text-green-400 text-lg xxl:text-xl font-medium">
              750%
            </h2>
            <p className="font-bold text-xxs  xxl:text-lg">TARGET</p>
          </div>
        </div>
      </div>
      <div className="bg-customGray-100 rounded mt-8 w-full">
        <div className="rounded-t bg-gray-300 text-gray-600 text-xs xxl:text-base px-2 py-1 font-medium">
          <h5>TOTAL WALLET VALUE</h5>
        </div>
        <h3 className="font-semibold text-xxs xxl:text-lg text-center my-6 mx-2">
          ${totalWalletValue ? totalWalletValue.toFixed(2) : "0.00"} USD
        </h3>
      </div>
    </div>
  );
}

export default StatesRow;
