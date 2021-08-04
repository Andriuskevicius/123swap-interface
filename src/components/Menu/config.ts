import {MenuEntry, menuStatus} from '@123swap/uikit'

const config: MenuEntry[] = [
    {
        label: 'Home',
        icon: 'HomeIcon',
        href: '/',
    },
    {
        label: '123swap',
        icon: 'TradeIcon',
        initialOpenState: true,
        items: [
            {
                label: 'Exchange',
                href: '/swap',
            },
            {
                label: 'Liquidity',
                href: '/pool',
            },
        ],
    },
    {
        label: "123yield",
        icon: "PoolIcon",
        items: [
            {
                label: "Farms",
                href: "https://farm.123swap.finance/farms",
            },
            {
                label: "Pools",
                href: "https://farm.123swap.finance/syrup",
            },
        ]
    },

    {
        label: "123bridge",
        icon: "BridgeIcon",
        href: "#",
    },
    {
        label: "123nft",
        icon: "NftIcon",
        href: "#",
    },
    {
        label: "123lend&borrow",
        icon: "BorrowIcon",
        href: "#",
    },
    {
        label: "123gov",
        icon: "GovIcon",
        href: "#",
    },
    {
        label: "More",
        icon: "MoreIcon",
        items: [
            // {
            //   label: "Voting",
            //   href: "https://voting.pancakeswap.finance",
            // },
            {
                label: "Github",
                href: "https://github.com/123swapProject",
            },
            {
              label: "Docs",
              href: "https://docs.123swap.finance",
            },
            {
              label: "Contact us",
              href: "https://docs.123swap.finance/contact",
            },
            {
              label: "Blog",
              href: "https://medium.com/@123swap",
            },
        ],
    },
]

export default config
