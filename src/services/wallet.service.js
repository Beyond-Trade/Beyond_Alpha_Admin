import Web3 from 'web3';
import { ERC20Contracts } from "../contracts/constants/contracts";
import store from '../redux/store';
// import { Balance } from '../store/types/WalletState';
import { ContractLookup, IContractLookup } from '../contracts/contracts.lookup';
import { SyntheticCategories } from '../contracts/constants/synthetic.enum';
import { saveBalanceInfoAction } from '../store/actions/WalletActions';
import { getCrypto, getForex, getSynthetixPrices } from './axios.service';
import { BYNTokenValue } from './swap.service';
import { getStackedByn } from './mint.service';
import moment from "moment"


let cryptoRates, forexRates, synthetixRates, activeAddress;
let web3 = new Web3();

var curDate = new Date(Date.now());
// var today = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate();
// var yesterday = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + (curDate.getDate() - 1);
var today=moment().format('YYYY-MM-DD')
var yesterday=moment().add(-1, 'days').format('YYYY-MM-DD')

const loadRates = async () => {
    var cryptoCoinsIds = ContractLookup.reduce(function (filtered, option) {
        if (option.syntheticCategory == SyntheticCategories.CRYPTOCURRENCY && !option.isFixedRate && !option.isNativeToken && option.isSyntheticAsset) {
            filtered.push(option.marketRateApiID);
        }
        return filtered;
    }, []).join(",");

    var forexCoinsIds = ContractLookup.reduce(function (filtered, option) {
        if (option.syntheticCategory == SyntheticCategories.FOREX && !option.isFixedRate && !option.isNativeToken && option.isSyntheticAsset) {
            filtered.push(option.marketRateApiID);
        }
        return filtered;
    }, []).join(",");


    [cryptoRates, forexRates, synthetixRates] = await Promise.all([
        getCrypto(cryptoCoinsIds),
        getForex({
            today: today, yesterday: yesterday, symbols: forexCoinsIds
        }),
        getSynthetixPrices()
    ])
}

function getForexChange(symbol) {
    symbol = symbol.toUpperCase();
    if (forexRates) {
        var startprice = (forexRates[yesterday])[symbol];
        var endprice = (forexRates[today])[symbol];
        var change = (endprice - startprice) / startprice * 100;
        change = parseFloat(change.toFixed(2));
        return change;
    }
    else
        return 0
}


const getPriceObject = async (asset) => {

    let balance = {
        name: asset.fullName,
        short: asset.contractName,
        rate: 0,
        change24h: 0,
        high24h: 0,
        low24h: 0,
        cryptoBalance: 0,
        category: asset.syntheticCategory,
        isEther: asset.isNativeToken,
        isSiteToken: asset.isMainToken,
        icon: asset.icon
    }
try
{


    if (synthetixRates) {
        try {

            let synthRate = synthetixRates.find((x) => x.id == asset.oracleRateID);

            balance.rate = synthRate ? synthRate.rate / Math.pow(10, asset.decimal) : 0;
        }
        catch (e) {
            console.log(e)
        }
    }
    if (activeAddress) {
        if (balance.isEther) {
            balance.cryptoBalance = await getETHBalance(activeAddress);
        }
        else {
            balance.cryptoBalance = await getERC20Balance(asset, activeAddress);
        }
    }
    switch (asset.syntheticCategory) {
        case SyntheticCategories.CRYPTOCURRENCY:

            let rateObj = cryptoRates.find((x) => x.id == asset.marketRateApiID)
            if (rateObj) {
                balance.change24h = rateObj.price_change_percentage_24h;
                balance.high24h = rateObj.high_24h;
                balance.low24h = rateObj.low_24h;
            }
            break;

        case SyntheticCategories.FOREX:
            let fchange = getForexChange(asset.marketRateApiID);
            balance.change24h = fchange ? fchange : 0;
            break;
    }
    if (asset.isFixedRate) {
        balance.rate = asset.fixedRateValue;
    }
    if (asset.isMainToken) {
        const ETHcontractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.ETH)
        let EthPriceObj = cryptoRates.find((x) => x.id == ETHcontractInfo?.marketRateApiID)
        let ethRate = EthPriceObj ? EthPriceObj.current_price : 0;
        let tokenValue = await BYNTokenValue();

        balance.rate = ethRate / tokenValue;
    }
}catch(e)
{
console.log(e.message)
}
    return balance;
}

export const updateBalances = async () => {
    let walletInfo = store.getState().wallet;

    activeAddress = walletInfo.selected.address;
    const assets = ContractLookup.filter(c => c.isSyntheticAsset);

    await loadRates();
    let balances = [];
    for (let i = 0; i < assets.length; i++) {
        balances.push(await getPriceObject(assets[i]));
    }
    store.dispatch(saveBalanceInfoAction(balances));
    await getStackedByn();
}

export const getETHBalance = async (address) => {
    web3 = store.getState().wallet.web3;
    if (web3.currentProvider) {
        try {
            var balanceInWei = await web3.eth.getBalance(address)
            balanceInWei = Web3.utils.fromWei(balanceInWei, 'ether')
            return Number(balanceInWei);
        } catch (error) {
            return 0;
        }
    } else {
        return 0
    }
}

// @ts-ignore
export const getERC20Balance = async (contractInfo, address) => {
    web3 = store.getState().wallet.web3;
    if (web3.currentProvider) {
        if (contractInfo) {
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo.contractAddress, {});
            try {
                const balance = await contract.methods.balanceOf(address).call();
                var balanceInWei = web3.utils.fromWei(balance, 'ether');
                let bal = Number(Number(balanceInWei).toFixed(7));// / Math.pow(10, contractInfo.decimal)
                return bal;
            } catch (error) {
                return 0;
            }
        }
    } else {
        return 0
    }
}

// @ts-ignore
export const getPriceFeed = async (contractName, decimal) => {
    web3 = store.getState().wallet.web3;
    const contractInfo = ContractLookup.find(contract => contract.contractName === ERC20Contracts.PRICE_FEED)
    if (web3.currentProvider) {
        if (contractInfo) {
            // @ts-ignore
            const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress);
            try {
                const price = await contract.methods.viewLatestPrice(contractName).call();
                return price;
            } catch (error) {
                return 0;
            }
        }
    }
    else return 0;
}



// export const getByondRate = async () => {
//     web3 = store.getState().wallet.web3;
//     if (web3.currentProvider) {
//         const contractInfo = ContractLookup.find(c => c.contractName == ERC20Contracts.BEYOND_EX_PROX);
//         if (contractInfo) {
//             // @ts-ignore
//             const contract = new web3.eth.Contract(contractInfo.contractAbi, contractInfo?.contractAddress);
//             try {
//                 const price = await contract.methods.beyondTokenValueInDollar().call();
//                 return price;
//             } catch (error) {
//                 return 0;
//             }
//         }
//     }
//     else return null;

// };







