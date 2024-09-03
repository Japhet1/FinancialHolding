import * as React from 'react'
import { ICurrency } from '../common/types'


export interface CurrencyContextProp {
    currency: ICurrency
}

export const CurrencyContext = React.createContext<CurrencyContextProp>(null)

export const CurrencyContextProvider: React.FC<CurrencyContextProp> = (props) => {
    return(
        <CurrencyContext.Provider value={{ currency: props.currency}}>
            {props.children}
        </CurrencyContext.Provider>
    )
}