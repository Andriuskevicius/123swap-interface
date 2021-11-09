import { Pair as UniPair} from '@uniswap/v2-sdk'
import { Token as UniToken } from '@uniswap/sdk-core';
import { Pair as PartyPair, Token as PartyToken} from '@partyswap-libs/sdk'
import { Pair as PangolinPair, Token as PangolinToken, Router as PangolionRouter, CAVAX as PangolinCAVAX, WAVAX} from '@pangolindex/sdk'
import { Pair as PolygonPair} from 'quickswap-sdk'
import {TokenAmount, Pair, Currency, Token, Router} from '@123swap/swap-sdk'
import {InjectedConnector} from "@web3-react/injected-connector";
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { abi as IPangolinRouterABI } from '@pangolindex/exchange-contracts/artifacts/contracts/pangolin-periphery/PangolinRouter.sol/PangolinRouter.json'
import {ALL_SUPPORTED_CHAIN_IDS} from "../constants/chains";

export const ETHER: Currency = new Currency(18, 'BNB', 'BNB');
export const ETHER_UNI: Currency = new Currency(18, 'ETH', 'ETH');
export const MATIC: Currency = new Currency(18, 'MATIC', 'MATIC');
export const CAVAX = PangolinCAVAX;

// IPangolinRouter
export enum NewChainId {
    ETHMAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    MAINNET = 56,
    BSCTESTNET = 97,
    POLYON_MAINET = 137,
    POLYON_TESTNET = 80001,
    AVALANCHE = 43114
}

export type NetworkConfig = {
    title: string;
    chainId: number;
    pair: any;
    currency: Currency;
    icon: string;
    injected: any;
    multicall: string;
    wrappedCurrency: Token;
    router: string;
    scanUrl: string;
    tokenClass: any;
    routerClass: any;
    routerABI: any;
};

const eth: NetworkConfig = {
    title: "ETH",
    chainId: 1,
    pair: UniPair,
    icon: "/images/coins/eth.png",
    currency: ETHER_UNI,
    injected: new InjectedConnector({supportedChainIds: ALL_SUPPORTED_CHAIN_IDS}),
    multicall: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
    wrappedCurrency: new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped ETH'),
    router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    scanUrl: 'etherscan.com',
    tokenClass: UniToken,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI

};

const bnb: NetworkConfig = {
    title: "BNB",
    chainId: 56,
    pair: Pair,
    icon: "/images/coins/bnb.png",
    currency: ETHER,
    injected:  new InjectedConnector({supportedChainIds: [56, 97]}),
    multicall: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
    wrappedCurrency: new Token(56, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'),
    router: "0x829AdDC0B20AA383533488fBf00f5bE2D8326793",
    scanUrl: 'bscscan.com',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const matic: NetworkConfig = {
    title: "MATIC",
    chainId: 137,
    pair: PolygonPair,
    icon: "/images/coins/matic.png",
    currency: MATIC,
    injected:  new InjectedConnector({supportedChainIds: [137, 80001]}),
    multicall: '0xa1B2b503959aedD81512C37e9dce48164ec6a94d',
    wrappedCurrency: new Token(137, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 18, 'WMATIC', 'Wrapped MATIC'),
    router: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
    scanUrl: 'polygonscan.com',
    tokenClass: UniToken,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const avax: NetworkConfig = {
    title: "AVAX",
    chainId: 43114,
    pair: PangolinPair,
    icon: "/images/coins/avax.png",
    currency: CAVAX,
    injected:  new InjectedConnector({supportedChainIds: [43114, 43113]}),
    multicall: '0x0FB54156B496b5a040b51A71817aED9e2927912E',
    wrappedCurrency: new Token(43114, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', 18, 'WAVAX', 'Wrapped AVAX'),
    router: "0xe54ca86531e17ef3616d22ca28b0d458b6c89106",
    scanUrl: 'snowtrace.io',
    tokenClass: PangolinToken,
    routerClass: PangolionRouter,
    routerABI: IPangolinRouterABI
};

export const networks: Map<string, NetworkConfig> = new Map([
    ["BNB", bnb],
    ["ETH", eth] ,
    ["MATIC", matic],
    ["AVAX", avax]]);