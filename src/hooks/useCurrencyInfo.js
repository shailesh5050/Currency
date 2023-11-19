import { useState, useEffect } from 'react'
function useCurrencyInfo({fromCurrency, toCurrency}) {
    const key = 'fca_live_K6lSjv5h6iWPFAHxkiMweLVIpSsKtcygYrWCbb6v'
    const [currencyInfo, setCurrencyInfo] = useState({})
    async function getCurrencyInfo() {
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${key}&currencies=${toCurrency}&base_currency=${fromCurrency}`)
        const data = await response.json()
        return data
    }   
    useEffect(() => {
        getCurrencyInfo().then(data => {
            setCurrencyInfo(data.data)
        })
    }
    , [fromCurrency, toCurrency])


  return currencyInfo
}

export default useCurrencyInfo
