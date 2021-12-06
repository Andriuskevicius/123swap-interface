import { useCallback, useMemo } from 'react'
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";

export function sendStatistic(account, chainId, action, data) {
    axios.post(`${BACKEND_URL}/stats/entry/`, {user: account, chain_id:chainId, action, data}).catch((error) => {
        console.log("Error", error);
    })
}

export function sendStatLogin(account, chainId){
    sendStatistic(account, chainId, "LOGIN", {})
}

export function sendStatSwap(account, chainId, data){
    sendStatistic(account, chainId, "SWAP", data)
}