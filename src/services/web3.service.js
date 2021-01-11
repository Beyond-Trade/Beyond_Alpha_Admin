import { Web3Wrapper } from '@0x/web3-wrapper';
import { providerUtils } from '@0x/utils';
import WalletLink from 'walletlink'
import { providers } from 'ethers';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

import WalletConnectProvider from "@walletconnect/web3-provider";
import {
    APP_NAME,
    CHAIN_ID,
    ETH_JSONRPC_URL,
    FORTMATIC_APP_ID,
    INFURA_ID,
    NETWORK_ID,
    NETWORK_NAME,
    PORTIS_APP_ID,
    web3Sources
} from '../constants';

import { ERC20Contracts } from "../contracts/constants/contracts";
import store from '../redux/store';
import { loadingBalancePending, resetWalletsInfoAction, saveWalletsInfoAction, SaveWeb3InfoAction, SetSelectedWalletAction } from '../store/actions/WalletActions';
// import { Wallet } from '../store/types/WalletState';
import { getERC20Balance, getETHBalance, updateBalances } from './wallet.service';
import { ContractLookup } from '../contracts/contracts.lookup';




// let web3Wrapper: Web3Wrapper | null = null;
const web3 = new Web3();

// @ts-ignore
export const initializeWeb3 = async (source) => {
    console.log(source,"============WEB3 SERVICE==========")
    store.dispatch(loadingBalancePending())
    try {
        switch (source) {
            case web3Sources.Portis:
                await initPortis();
                break;
            case web3Sources.Metamask:
                await initMetamask();
                break;
            case web3Sources.Fortmatic:
                await initFortmatic();
                break;

            case web3Sources.WalletConnect:
                await initWalletConnect();
                break;
            case web3Sources.Coinbase:
                await initCoinbase();
                break;
            default:
                break;
        }
        if (web3.currentProvider) {
            store.dispatch(SaveWeb3InfoAction(source, web3));
            const accounts = await web3.eth.getAccounts();
console.log(accounts,"======================")
            if (accounts.length <= 0) { throw new Error('Error, Provider is not available') }

            let wallets= [];

            let isDefaultSelected = false;
            for (let i = 0; i < accounts.length; i++) {

                const BEYOND = ContractLookup.find(contract => contract.contractName === ERC20Contracts.BEYOND)
                const BUSD = ContractLookup.find(contract => contract.contractName === ERC20Contracts.USDb)

                let BYNBalance = await getERC20Balance(BEYOND, accounts[i]);
                let USDbBalance = await getERC20Balance(BUSD, accounts[i]);
                let EthBalance = await getETHBalance(accounts[i]);

                let walletObj = {
                    address: accounts[i],
                    BYNBalance: BYNBalance ? BYNBalance : 0,
                    EthBalance: EthBalance ? EthBalance : 0,
                    USDbBalance: USDbBalance ? USDbBalance : 0,
                }
                wallets.push(walletObj);
                if (!isDefaultSelected) {
                    isDefaultSelected = true;
                    store.dispatch(SetSelectedWalletAction(walletObj));
                }
            }
            if (wallets.length <= 0) { throw new Error('Error while accessing accounts.'); }
            store.dispatch(saveWalletsInfoAction(wallets));
            
            await updateBalances(); //Update all assets balances
        } else {
            throw new Error('Error while accessing web3 provider.');
        }
    }
    catch (e) {
        throw e;
    }
};


// @ts-ignore
export const initPortis = async () => {
    const { location } = window;
    if (!PORTIS_APP_ID) {
        // return null;
    }
    try {
        const Portis = await import('@portis/web3');
        const portis = new Portis.default(PORTIS_APP_ID, NETWORK_NAME.toLowerCase());
        web3.setProvider(portis.provider);
        const [account] = await web3.eth.getAccounts();
        portis.onLogout(() => {
            location.reload();
        });
        portis.onLogin(() => {
            location.reload();
        });
        if (account) {
            return web3;
        }
    } catch (error) {
        // return null;
    }
};
// @ts-ignore
export const initFortmatic = async () => {
    if (FORTMATIC_APP_ID) {

        // @ts-ignore - no typings
        const Fortmatic = await import('fortmatic');
        const fm =
            NETWORK_ID === 1
                ? new Fortmatic.default(FORTMATIC_APP_ID)
                : new Fortmatic.default(FORTMATIC_APP_ID, NETWORK_NAME.toLowerCase());

        const provider = await fm.getProvider()
        // @ts-ignore
        web3.setProvider(provider);
        let isUserLoggedIn = await fm.user.isLoggedIn();
        // user is already logged
        if (isUserLoggedIn) {
            return web3;
        } else {
            await fm.user.login();
            isUserLoggedIn = await fm.user.isLoggedIn();
            if (isUserLoggedIn) {
                //localStorage.saveWalletConnected(web3Sources.Fortmatic);
                return web3;
            }
        }
    }
};
// @ts-ignore
export const initCoinbase = async ()=> {
    //@ts-ignore
    if (window.web3) {
        // @ts-ignore
        const provider = providerUtils.standardizeOrThrow(window.web3.currentProvider);
        if (provider) {
            try {
                const walletLink = new WalletLink({
                    appName: APP_NAME,
                    appLogoUrl: APP_NAME,
                });
                const eth = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
                const provider = new providers.Web3Provider(eth);
                // @ts-ignore
                web3.setProvider(provider);

                eth.enable().then((accounts) => {
                    web3.eth.defaultAccount = accounts[0]
                })

                //const address = await web3.eth.getAccounts();
                //localStorage.saveWalletConnected(web3Sources.Coinbase);
                return web3;
            } catch (error) {
                // The user denied account access

            }
        } else {
            // localStorage.resetWalletConnected();
        }
    } else {
        //localStorage.resetWalletConnected();
        //  The user does not have metamask installed
        // return null;
    }
};
export const initWalletConnect = async () => {
    const { location } = window;

    const provider = new WalletConnectProvider({ infuraId: INFURA_ID });
    try {
        const res = await provider.enable();
        //localStorage.saveWalletConnected(web3Sources.WalletConnect);
    } catch {
        //localStorage.resetWalletConnected();
        location.reload();
    }

    // @ts-ignore
    web3.setProvider(provider);

    // Subscribe to accounts change
    provider.on('accountsChanged', (accounts) => {
        location.reload();
    });

    // Subscribe to chainId change
    provider.on('chainChanged', (chainId) => {
        location.reload();
    });

    // Subscribe to networkId change
    provider.on('networkChanged', (networkId) => {
        location.reload();
    });

    // Subscribe to session connection/open
    provider.on('open', () => {
        //localStorage.saveWalletConnected(web3Sources.WalletConnect);
    });

    // Subscribe to session disconnection/close
    provider.on('close', (code, reason) => {
        //deleteWeb3Wrapper();
        //localStorage.resetWalletConnected();
        location.reload();
    });

    return web3;
};
// @ts-ignore
export const initMetamask = async () => {
    //@ts-ignore
    const provider = await detectEthereumProvider();

    if (provider) {
        try {
            // @ts-ignore
            web3.setProvider(provider);
            // Request account access if needed
            // @ts-ignore
            // await provider.request('eth_requestAccounts')
            await provider.enable()
            // Subscriptions register
            //@ts-ignore
            provider.on('accountsChanged', async (accounts) => {
                // Reload to avoid MetaMask bug: "MetaMask - RPC Error: Internal JSON-RPC"
                window.location.reload();
            });
            //@ts-ignore
            provider.on('chainChanged', async (network) => {
                window.location.reload();
            });
            // localStorage.saveWalletConnected(web3Sources.Metamask);
            return web3;
        } catch (error) {
            // The user denied account access
        }
    } else {
        // @ts-ignore
        if (window.web3) {
            // @ts-ignore
            web3.setProvider(window.web3.currentProvider);
            return web3;
        } else {
            //localStorage.resetWalletConnected();
            store.dispatch(resetWalletsInfoAction());
            //  The user does not have metamask installed
        }
    }
};
// export const deleteWeb3Wrapper = (): void => {
//     web3Wrapper = null;
// };



