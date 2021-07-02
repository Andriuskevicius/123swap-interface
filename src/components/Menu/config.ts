import {MenuEntry, menuStatus} from '@123swap/uikit'

const config: MenuEntry[] = [
    {
        label: 'Home',
        icon: 'HomeIcon',
        href: '/',
    },
    {
        label: 'Trade',
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
        label: 'More',
        icon: 'MoreIcon',
        items: [
            // {
            //   label: 'Contact',
            //   href: 'https://docs.123swap.finance/contact-us',
            // },
            // {
            //   label: 'Voting',
            //   href: 'https://voting.123swap.finance',
            // },
            {
                label: 'Github',
                href: 'https://github.com/123swapProject',
            },
            // {
            //   label: 'Docs',
            //   href: 'https://docs.123swap.finance',
            // },
            // {
            //   label: 'Blog',
            //   href: 'https://pancakeswap.medium.com',
            // },
            // {
            //   label: 'Merch',
            //   href: 'https://pancakeswap.creator-spring.com/',
            // },
        ],
    },
]

export default config
