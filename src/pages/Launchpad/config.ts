

export interface LaunchpadProject {
    id: number;
    name: string;
    icon: string;
    start_date: string;
    end_date: string;
    price: number;
    max: string;
    address: string;
    minimumAmount: number;
    maximumAmount: number;
    header: string;
}

export const launchpadConfig: LaunchpadProject[] = [
    {
        id: 1,
        name: 'TEST',
        icon: 'images/coins/one.png',
        start_date: "09-16",
        end_date: "12-16",
        price: 0.01,
        max: '500.000$',
        address: "0xae51B9B566D174AEfBA1882Df3a25573aa9A8b5E",
        minimumAmount: 36,
        maximumAmount: 18000000,
        header: "TEST sale (SEED)"
    }
]

export function getLaunchpadConfigById(id: number) : LaunchpadProject|undefined {
    return launchpadConfig.find(i => i.id === id);
}