import { Pair as UniPair} from '@uniswap/v2-sdk'
import { Token as UniToken } from '@uniswap/sdk-core';
import { Pair as SushiPair, Token as SushiToken, Router as SushiRouter} from '@sushiswap/sdk'
import { Pair as PartyPair, Token as PartyToken} from '@partyswap-libs/sdk'
import { Pair as VvsPair} from 'vvs-sdk'
import { Pair as PangolinPair, Token as PangolinToken, Router as PangolionRouter, CAVAX as PangolinCAVAX, WAVAX} from '@pangolindex/sdk'
import { Pair as PolygonPair} from 'quickswap-sdk'
import { Pair as SpookyPair} from '@ac32/spookyswap-sdk'
import {TokenAmount, Pair, Currency, Token, Router, ChainId, WETH} from '@123swap/swap-sdk'
import {InjectedConnector} from "@web3-react/injected-connector";
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { abi as IPangolinRouterABI } from '@pangolindex/exchange-contracts/artifacts/contracts/pangolin-periphery/PangolinRouter.sol/PangolinRouter.json'
import {ALL_SUPPORTED_CHAIN_IDS} from "../constants/chains";


export const ETHER: Currency = new Currency(18, 'BNB', 'BNB');
export const ETHER_UNI: Currency = new Currency(18, 'ETH', 'ETH');
export const MATIC: Currency = new Currency(18, 'MATIC', 'MATIC');
export const FTM: Currency = new Currency(18, 'FTM', 'FTM');
export const ONE: Currency = new Currency(18, 'ONE', 'ONE');
export const MOVR: Currency = new Currency(18, 'MOVR', 'MOVR');
export const HT: Currency = new Currency(18, 'HT', 'HT');
export const OKT: Currency = new Currency(18, 'OKT', 'OKT');
export const CRO: Currency = new Currency(18, 'CRO', 'CRO');
export const XDAI: Currency = new Currency(18, 'XDAI', 'XDAI');
export const CELO: Currency = new Currency(18, 'CELO', 'CELO');
export const PALM: Currency = new Currency(18, 'PALM', 'PALM');
export const TLOS: Currency = new Currency(18, 'TLOS', 'TLOS');
export const CAVAX = PangolinCAVAX;

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
    pair: SushiPair,
    icon: "/images/coins/eth.png",
    currency: ETHER_UNI,
    injected: new InjectedConnector({supportedChainIds: ALL_SUPPORTED_CHAIN_IDS}),
    multicall: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
    wrappedCurrency: new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped ETH'),
    router: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    scanUrl: 'etherscan.com',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const bnb: NetworkConfig = {
    title: "BNB",
    chainId: 56,
    pair: SushiPair,
    icon: "/images/coins/bnb.png",
    currency: ETHER,
    injected:  new InjectedConnector({supportedChainIds: [56, 97]}),
    multicall: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
    wrappedCurrency: new Token(56, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'),
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
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

const ftm: NetworkConfig = {
    title: "FTM",
    chainId: 250,
    pair: SpookyPair,
    icon: "/images/coins/ftm.png",
    currency: FTM,
    injected:  new InjectedConnector({supportedChainIds: [250, 4002]}),
    multicall: '0xb828c456600857abd4ed6c32facc607bd0464f4f',
    wrappedCurrency: new Token(250, '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', 18, 'WFTM', 'Wrapped FTM'),
    router: "0xf491e7b69e4244ad4002bc14e878a34207e38c29",
    scanUrl: 'ftmscan.com',
    tokenClass: UniToken,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const one: NetworkConfig = {
    title: "ONE",
    chainId: 1666600000,
    pair: SushiPair,
    icon: "/images/coins/one.png",
    currency: ONE,
    injected:  new InjectedConnector({supportedChainIds: [1666600000, 1666600001]}),
    multicall: '0x34b415f4d3b332515e66f70595ace1dcf36254c5',
    wrappedCurrency: new Token(1666600000, '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a', 18, 'WONE', 'Wrapped ONE'),
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    scanUrl: 'explorer.harmony.one',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const movr: NetworkConfig = {
    title: "MOVR",
    chainId: 1285,
    pair: SushiPair,
    icon: "/images/coins/movr.png",
    currency: MOVR,
    injected:  new InjectedConnector({supportedChainIds: [1285]}),
    multicall: '0xe05349d6fE12602F6084550995B247a5C80C0E2C',
    wrappedCurrency: new Token(1285, '0xf50225a84382c74CbdeA10b0c176f71fc3DE0C4d', 18, 'WMOVR', 'Wrapped MOVR'),
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    scanUrl: 'moonriver.moonscan.io',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const ht: NetworkConfig = {
    title: "HT",
    chainId: 128,
    pair: SushiPair,
    icon: "/images/coins/heco.svg",
    currency: HT,
    injected:  new InjectedConnector({supportedChainIds: [128]}),
    multicall: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
    wrappedCurrency: new Token(128, '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', 18, 'WHT', 'Wrapped HT'),
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    scanUrl: 'hecoinfo.com',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const okt: NetworkConfig = {
    title: "OKT",
    chainId: 66,
    pair: SushiPair,
    icon: "/images/coins/okt.png",
    currency: OKT,
    injected:  new InjectedConnector({supportedChainIds: [66]}),
    multicall: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
    wrappedCurrency: new Token(66, '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15', 18, 'WOKT', 'Wrapped OKExChain'),
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    scanUrl: 'oklink.com/oec',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const cro: NetworkConfig = {
    title: "CRO",
    chainId: 25,
    pair: VvsPair,
    icon: "/images/coins/cro.png",
    currency: CRO,
    injected:  new InjectedConnector({supportedChainIds: [25]}),
    multicall: '0x5e954f5972EC6BFc7dECd75779F10d848230345F',
    wrappedCurrency: new Token(25, '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', 18, 'WMATIC', 'Wrapped MATIC'),
    router: "0x145863Eb42Cf62847A6Ca784e6416C1682b1b2Ae",
    scanUrl: 'cronos.crypto.org/explorer',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};


const arb: NetworkConfig = {
    title: "ARBITRUM",
    chainId: ChainId.ARBITRUM,
    pair: SushiPair,
    icon: "/images/coins/arbitrum.svg",
    currency: ETHER_UNI,
    injected:  new InjectedConnector({supportedChainIds: [ChainId.ARBITRUM]}),
    multicall: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
    wrappedCurrency: WETH[ChainId.ARBITRUM],
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    scanUrl: 'arbiscan.io',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const xdai: NetworkConfig = {
    title: "XDAI",
    chainId: ChainId.XDAI,
    pair: SushiPair,
    icon: "/images/coins/xdai.svg",
    currency: XDAI,
    injected:  new InjectedConnector({supportedChainIds: [ChainId.XDAI]}),
    multicall: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
    wrappedCurrency: WETH[ChainId.XDAI],
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    scanUrl: 'blockscout.com/poa/xdai',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const celo: NetworkConfig = {
    title: "CELO",
    chainId: ChainId.CELO,
    pair: SushiPair,
    icon: "/images/coins/celo.svg",
    currency: CELO,
    injected:  new InjectedConnector({supportedChainIds: [ChainId.CELO]}),
    multicall: '0x9aac9048fC8139667D6a2597B902865bfdc225d3',
    wrappedCurrency: WETH[ChainId.CELO],
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    scanUrl: 'explorer.celo.org',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const palm: NetworkConfig = {
    title: "PALM",
    chainId: ChainId.PALM,
    pair: SushiPair,
    icon: "/images/coins/palm.png",
    currency: PALM,
    injected:  new InjectedConnector({supportedChainIds: [ChainId.PALM]}),
    multicall: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
    wrappedCurrency: WETH[ChainId.PALM],
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    scanUrl: 'explorer.palm.io',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

const telos: NetworkConfig = {
    title: "TLOS",
    chainId: ChainId.TELOS,
    pair: SushiPair,
    icon: "/images/coins/telos.png",
    currency: TLOS,
    injected:  new InjectedConnector({supportedChainIds: [ChainId.TELOS]}),
    multicall: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
    wrappedCurrency: WETH[ChainId.TELOS],
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    scanUrl: 'rpc1.us.telos.net/v2/explore',
    tokenClass: Token,
    routerClass: Router,
    routerABI: IUniswapV2Router02ABI
};

export const networks: Map<string, NetworkConfig> = new Map([
    ["BNB", bnb],
    ["ETH", eth] ,
    ["MATIC", matic],
    ["FTM", ftm],
    ["AVAX", avax],
    ["ONE", one],
    ["MOVR", movr],
    ["HT", ht],
    ["OKT", okt],
    ["CRO", cro],
    ["ARBITRUM", arb],
    ["XDAI", xdai],
    ["CELO", celo],
    ["PALM", palm],
    ["TLOS", telos]
]);