export const PORTIS_APP_ID = "369cfb7d-4686-4b46-a2ed-7d50434f2b16";
export const INFURA_ID = '27e484dcd9e3efcfd25a83a78777cdf1';
export enum ChainId {
    Mainnet = 1,
    Ropsten = 3,
    Kovan = 42,
    Ganache = 1337,
}
export enum web3Sources {
    Network = 'Network',
    Metamask = 'Metamask',
    Portis = 'Portis',
    Torus = 'Torus',
    Fortmatic = 'Fortmatic',
    WalletConnect = 'WalletConnect',
    Coinbase = 'Coinbase Wallet',
    Enjin = 'Enjin Wallet',
    Cipher = 'Cipher Wallet',
    Trust = 'Trust Wallet',
};
export enum Network {
    Mainnet = 1,
    Ropsten = 3,
    Rinkeby = 4,
    Kovan = 42,
    Ganache = 50,
}
export enum locaStorageConstants {
    default = 1,
    saveAddress = 2,
    getAddress = 3,
    getWalletConnected = 4,
    addAddress = 5,
    getAllWallets = 6
}
export enum notificationPrefix {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error'
}
export enum notificationTitles {
    Transation = 'Transaction',
    Swap = 'Swap',
    Pool = 'Pool'

}
export enum notificationMessages {
    messageOne = 'Please connect your wallet first',
    messageTwo = 'Wallet not found',
    NotEnoughCredit = 'You dont have enough credit for this transaction',
    SuccessfullTransaction = 'Your Transaction was successfull',
    NotSuccessfullTransaction ='Your Transaction was not successfull'

}
export enum stake {
    swap = 'SWAP',
    mint = 'Mint',
    reward = 'Rewards',
    transfer = 'Transfer',
    burn = 'Burn',
    pool = 'POOL'

}
export enum loan {
    All = 'ALL',
    EQUATIES = 'EQUITIES',
    COMMODITIES = 'COMMODITIES',
    FOREX = 'FOREX',
    CRYPTO = 'CRYPTO',
    TOPGAINER = 'TOP GAINER',
    NEWEST = 'NEWEST'

}
export enum trade {
    EQUITY = 'EQUITY',
    FOREX = 'FOREX',
    CRYPTO = 'CRYPTO',
    YOUR_ORDERS = 'YOUR ORDERS',
    YOUR_TRADES = 'YOUR TRADES',
    ALL_TRADES = 'ALL TRADES'
}
export enum header {
    Stake = 'STAKE',
    Market = 'MARKET',
    Trade = 'TRADE',
    Loan = 'LOAN',
    Wallet = 'WALLET'
}
export const NETWORK_ID: number = Number.parseInt('50', 10) || Network.Mainnet;
// HACK(dekz): re-write the Ganache chain id which isn't network id
// export const CHAIN_ID: number = 1337
//     ? Number.parseInt('1337', 10)
//     : NETWORK_ID === 50
//         ? 1337
//         : NETWORK_ID;

// export const NETWORK_NAME: string = Network[NETWORK_ID];
export const NETWORK_NAME: string = 'rinkeby';

export const EtherscanBrowsUrl = 'https://rinkeby.etherscan.io/address/';

export const FORTMATIC_APP_ID: string = 'pk_test_E55592A7ED0DB69A';
export const APP_NAME = 'My Awesome App'
export const APP_LOGO_URL = 'https://example.com/logo.png'
export const ETH_JSONRPC_URL = 'https://kovan.infura.io/v3/866d99cf6fde46e498d9f5506221c313'
export const CHAIN_ID = 1
export const exchange = 'exchange';
export const overview = 'overview'
