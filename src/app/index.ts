import * as appAsyncActions from "app/appActions"
import {setAppErrorAC, setAppStatusAC} from "app/appSlice"

const appActions = {...appAsyncActions, setAppErrorAC, setAppStatusAC}

export {appActions}

export * as appSelectors from "app/appSelectors"
