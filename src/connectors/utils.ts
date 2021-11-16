import {Currency, ETHER, Token} from "@123swap/swap-sdk";
import {InjectedConnector} from "@web3-react/injected-connector";
import {CAVAX} from "@pangolindex/sdk";
import {injected} from "./index";
import {NetworkConfig, networks} from "./config";


function getNetworkAttributeOrDefault(key: string, attribute: string, defaultReturn:any){
    const network = networks.get(key);
    if (network !== undefined){
        return network[attribute];
    }
    return defaultReturn;
}

export function isBaseCurrency(currency: Currency | undefined) : boolean{
    return networks.has(currency?.symbol ?? "")
}

export function getBaseCurrencyFromChainId(chainId: number) : string{
    let networkId = "";
    networks.forEach((network: NetworkConfig, key: string) => {
        if (network.chainId === chainId){
            networkId = key;
        }
    });
    return networkId;
}

export function overwriteBaseCurrency(currency:any) : any{
    if (localStorage.getItem("networkId") === "AVAX"){
        return CAVAX;
    }
    return currency;
}

export function getTradeCurrencyFromBase(currency: Currency) : Currency {
    if (isBaseCurrency(currency)){
        return ETHER
    }
    return currency
}

export function getCurrency() : Currency{
    return getNetworkAttributeOrDefault(localStorage.getItem("networkId") ?? "", "currency", ETHER);
}

export function getCurrencyLogo(currency) : string {
    return getNetworkAttributeOrDefault(currency.symbol, "icon", "");
}

export function getBaseCurrencyTitle() : string{
    return getNetworkAttributeOrDefault(localStorage.getItem("networkId") ?? "", "title", "");
}

export function getCurrencyInjectedConnector() : InjectedConnector{
    return getNetworkAttributeOrDefault(localStorage.getItem("networkId") ?? "", "injected", injected);
}

export function getNetworkMulticallContractAddress(chainId: number) : string | undefined{
    return getNetworkAttributeOrDefault(getBaseCurrencyFromChainId(chainId), "multicall", undefined);
}

export function getNetworkWrappedCurrency(chainId: number) : Token{
    return getNetworkAttributeOrDefault(getBaseCurrencyFromChainId(chainId), "wrappedCurrency", new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped ETH'));
}

export function getNetworkRouterAddress() : string{
    return getNetworkAttributeOrDefault(localStorage.getItem("networkId") ?? "", "router", "");
}

export function getNetworkPairClass() : any{
    return getNetworkAttributeOrDefault(localStorage.getItem("networkId") ?? "", "pair", undefined);
}

export function getNetworkTokenClass() : any{
    return getNetworkAttributeOrDefault(localStorage.getItem("networkId") ?? "", "tokenClass", undefined);
}

export function getNetworkRouterClass() : any{
    return getNetworkAttributeOrDefault(localStorage.getItem("networkId") ?? "", "routerClass", undefined);
}

export function getNetworkScanUrl(chainId: number) : string{
    return getNetworkAttributeOrDefault(getBaseCurrencyFromChainId(chainId), "scanUrl", 'etherscan.com');
}

export function getNetworkRouterABI() : any{
    return getNetworkAttributeOrDefault(localStorage.getItem("networkId") ?? "", "routerABI", undefined);
}

