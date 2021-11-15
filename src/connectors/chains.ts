import { Tags, TokenInfo, TokenList } from '@uniswap/token-lists'
import { ChainId, Token, WETH } from '@123swap/swap-sdk'
import {getNetworkWrappedCurrency} from "./utils";

type TagDetails = Tags[keyof Tags]
export interface TagInfo extends TagDetails {
  id: string
}

export class WrappedTokenInfo extends Token {
  public readonly tokenInfo: TokenInfo

  public readonly tags: TagInfo[]

  constructor(tokenInfo: TokenInfo, tags: TagInfo[]) {
    super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name)
    this.tokenInfo = tokenInfo
    this.tags = tags
  }

  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI
  }
}

export type TokenAddressMap = Readonly<{ [chainId in ChainId]: Readonly<{ [tokenAddress: string]: WrappedTokenInfo }> }>

type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const EMPTY_LIST: TokenAddressMap = {
  [ChainId.MAINNET]: {},
  [ChainId.BSCTESTNET]: {},
  [ChainId.ETHMAINNET]: {},
  [ChainId.ROPSTEN]: {},
  [ChainId.RINKEBY]: {},
  [ChainId.POLYON_MAINET]: {},
  [ChainId.POLYON_TESTNET]: {},
  [ChainId.AVALANCHE]: {},
  [ChainId.FANTOM]: {},
  [ChainId.HARMONY]: {},
  [ChainId.MOONRIVER]: {},
}

export const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
  [ChainId.ETHMAINNET]: [WETH[ChainId.ETHMAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.POLYON_MAINET]: [WETH[ChainId.POLYON_MAINET]],
  [ChainId.POLYON_TESTNET]: [WETH[ChainId.POLYON_TESTNET]],
  [ChainId.AVALANCHE]: [WETH[ChainId.AVALANCHE]],
  [ChainId.FANTOM]: [WETH[ChainId.FANTOM]],
  [ChainId.HARMONY]: [WETH[ChainId.HARMONY]],
  [ChainId.MOONRIVER]: [WETH[ChainId.MOONRIVER]],
}
