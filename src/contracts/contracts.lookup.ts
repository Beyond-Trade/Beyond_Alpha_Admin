import { BTCbAbi } from "./abi/btcb.abi";
import { ETHbAbi } from "./abi/ethb.abi";
import { OILbAbi } from "./abi/oilb.abi";
import { GBPbAbi } from "./abi/gbpb.abi";
import { EURbAbi } from "./abi/eurb.abi";
import { SyntheticCategories } from "./constants/synthetic.enum";
import { WeenusAbi } from "./abi/weenus.abi";
import { ERC20Contracts } from "./constants/contracts";
import { BeyondAbi } from "./abi/beyond.abi";
import { BeyondExchangeAbi } from "./abi/beyondExchange.abi";
import { BeyondExProxAbi } from "./abi/beyondExProx.abi";
import { PriceFeedAbi } from "./abi/priceFeed";

import * as icons from "../utils/coinIcons";
import { AbiItem } from 'web3-utils'
import { USDbAbi } from "./abi/Usdb.abi";
import { LoanAbi } from "./abi/loan.abi";
import { RewardAbi } from "./abi/reward.abi";



export interface IContractLookup {
    contractName: string,
    contractAddress:string,
    marketRateApiID: string,
    oracleRateID:string,
    fullName: string,
    contractAbi: any,
    decimal:number,
    isSyntheticAsset:boolean,
    isNativeToken: boolean,
    isMainToken: boolean, // only for BYN,
    isFixedRate:boolean,
    fixedRateValue:number,
    syntheticCategory: any, 
    icon:string
}


export const ContractLookup:IContractLookup[] = [
    {
        contractName: ERC20Contracts.ETH,
        contractAddress: "",
        marketRateApiID: "ethereum",
        oracleRateID: "sETH",
        fullName: "Ethereum",
        contractAbi: '',
        decimal:18,
        isSyntheticAsset:true,
        isNativeToken: true,
        isMainToken: false, // only for BYN,
        isFixedRate:false,
        fixedRateValue:0,
        syntheticCategory: SyntheticCategories.CRYPTOCURRENCY, 
        icon:icons.iconETH
    }, 
    {
        contractName: ERC20Contracts.BEYOND,
        contractAddress: "0xcF285592A4412b5b94f7492d88702fB01b749fA9",
        marketRateApiID: "",
        oracleRateID: "",
        fullName: "Beyond",
        decimal:18,
        contractAbi: BeyondAbi,
        isSyntheticAsset:true,
        isNativeToken: false,
        isMainToken: true, // only for BYN,
        isFixedRate:true,
        fixedRateValue:0.5,
        syntheticCategory: SyntheticCategories.CRYPTOCURRENCY,
        icon:icons.iconBEYOND
    }, 
    {
        contractName: ERC20Contracts.BTCb,
        contractAddress: "0xc2f1B9Aa87A0229d165AaCCc4E889EAe7969b1C1",
        marketRateApiID: "bitcoin",
        oracleRateID: "sBTC",
        fullName: "Bitcoin",
        contractAbi: BTCbAbi,
        decimal:18,
        isSyntheticAsset:true,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:false,
        fixedRateValue:0,
        syntheticCategory: SyntheticCategories.CRYPTOCURRENCY, 
        icon:icons.iconBTCb
    },  
    {
        contractName: ERC20Contracts.ETHb,
        contractAddress: "0x837160c3d1549C384caE9b7cdB8E146B486aa3C4",
        marketRateApiID: "ethereum",
        oracleRateID: "sETH",
        fullName: "Ethereum",
        contractAbi: ETHbAbi,
        decimal:18,
        isSyntheticAsset:true,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:false,
        fixedRateValue:0,
        syntheticCategory: SyntheticCategories.CRYPTOCURRENCY, 
        icon:icons.iconETHb
    },
    {
        contractName: ERC20Contracts.OILb,
        contractAddress: "0x942E2D8E545210584E938Ee0CD8C652c86c3D12f",
        marketRateApiID: "OIL",
        oracleRateID: "sOIL",
        fullName: "OIL",
        contractAbi: OILbAbi,
        decimal:18,
        isSyntheticAsset:true,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:false,
        fixedRateValue:0,
        syntheticCategory: SyntheticCategories.COMMODITIES, 
        icon:icons.iconOILb
    }, 
    {
        contractName: ERC20Contracts.GBPb,
        contractAddress: "0x2FdB57896a80A85feAa63B04c5f1c59c8060D585",
        marketRateApiID: "gbp",
        oracleRateID: "sGBP",
        fullName: "Great britain Pound",
        contractAbi: GBPbAbi,
        decimal:18,
        isSyntheticAsset:true,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:false,
        fixedRateValue:0,
        syntheticCategory: SyntheticCategories.FOREX, 
        icon:icons.iconGBPb
    }, 
    {
        contractName: ERC20Contracts.EURb,
        contractAddress: "0x6f37D5E716Fb16ed13d80d31D4323C3811E0835F",
        marketRateApiID: "Euro",
        oracleRateID: "sEUR",
        fullName: "Euro",
        contractAbi: EURbAbi,
        decimal:18,
        isSyntheticAsset:true,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:false,
        fixedRateValue:0,
        syntheticCategory: SyntheticCategories.FOREX, 
        icon:icons.iconEURb
    },
    {
        contractName: ERC20Contracts.USDb,
        contractAddress: "0x7Cec32EE635F334dfFC35d2E15880004d4Ef3565",
        marketRateApiID: "",
        oracleRateID: "",
        fullName: "USDb",
        contractAbi: USDbAbi,
        decimal:18,
        isSyntheticAsset:true,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:true,
        fixedRateValue:1,
        syntheticCategory: SyntheticCategories.CRYPTOCURRENCY,
        icon:icons.iconUSDb
    },
    
    {
        contractName: ERC20Contracts.PRICE_FEED,
        contractAddress: "0x50769d338579E754B5A5f32e2E86667Db70A67F0",
        marketRateApiID: "",
        oracleRateID: "",
        fullName: "PriceFeed",
        decimal:18,
        contractAbi: PriceFeedAbi,
        isSyntheticAsset:false,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:false,
        fixedRateValue:0,
        syntheticCategory: SyntheticCategories.CRYPTOCURRENCY,
        icon:icons.iconUSDb
    },
    {
        contractName: ERC20Contracts.BEYOND_EXCHANGE,
        contractAddress: "0xA5C6ef0cD09b2CC71F9fD6037D05161014dFE1e0",
        marketRateApiID: "",
        oracleRateID: "",
        fullName: "beyondExchange",
        decimal:18,
        contractAbi: BeyondExchangeAbi,
        isSyntheticAsset:false,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:false,
        fixedRateValue:0,
        syntheticCategory: SyntheticCategories.CRYPTOCURRENCY,
        icon:icons.iconETH
    },
    {
        contractName: ERC20Contracts.BEYOND_EX_PROX,
        contractAddress: "0x30Fa378DeB96bB0f33ddd5640ADe63Fc489AC455",
        marketRateApiID: "",
        oracleRateID: "",
        fullName: "beyondExProx",
        decimal:18,
        contractAbi: BeyondExProxAbi,
        isSyntheticAsset:false,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:false,
        fixedRateValue:0,
        syntheticCategory: SyntheticCategories.CRYPTOCURRENCY,
        icon:icons.iconETH
    },
    {
        contractName: ERC20Contracts.LOAN,
        contractAddress: "0xE9424828d3deabd28340D87b27C5B473756bd652",
        marketRateApiID: "",
        oracleRateID: "",
        fullName: "loan",
        decimal:18,
        contractAbi: LoanAbi,
        isSyntheticAsset:false,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:false,
        fixedRateValue:0,
        syntheticCategory: SyntheticCategories.CRYPTOCURRENCY,
        icon:icons.iconETH
    },
    {
        contractName: ERC20Contracts.REWARD,
        contractAddress: "0x846261D237C8423E5fad57134B70b13F05446930",
        marketRateApiID: "",
        oracleRateID: "",
        fullName: "REWARD",
        contractAbi: RewardAbi,
        decimal:18,
        isSyntheticAsset:false,
        isNativeToken: false,
        isMainToken: false, // only for BYN,
        isFixedRate:true,
        fixedRateValue:1,
        syntheticCategory: SyntheticCategories.CRYPTOCURRENCY,
        icon:""
    },
]