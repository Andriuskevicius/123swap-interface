import React, {StrictMode, Suspense} from 'react'
import {HashRouter} from "react-router-dom";
import ReactDOM from 'react-dom'
import {ResetCSS} from '@123swap/uikit'
import GlobalStyle from './style/Global'
import App from './pages/App'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import ToastListener from './components/ToastListener'
import Providers from './Providers'
import 'inter-ui'
import './i18n'

if ('ethereum' in window) {
    (window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
    localStorage?.removeItem('redux_localstorage_simple_lists')
})

ReactDOM.render(
    <StrictMode>
        <Providers>
            <
            >
            <ListsUpdater/>
            <ApplicationUpdater/>
            <TransactionUpdater/>
            <MulticallUpdater/>
            <ToastListener/>
        </>
        <ResetCSS/>
        <GlobalStyle/>
        <Suspense fallback={null}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Suspense>
    </Providers>
</StrictMode>,
document.getElementById('root')
)
