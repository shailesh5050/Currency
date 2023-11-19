import React, { useState, useEffect } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import exchange from './assets/icons/exchange.png'
const InputField = () => {
  const options = [
    "INR",
    "USD",
    "JPY",
    "SGD",
    "EUR",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "HKD",
    "NZD",
  ];
  const [fromCurrency, setFromCurrency] = useState(
    localStorage.getItem("fromCurrency") || "INR"
  );
  const [toCurrency, setToCurrency] = useState(
    localStorage.getItem("toCurrency") || "USD"
  );
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyValue = useCurrencyInfo({ fromCurrency, toCurrency })[
    toCurrency
  ];
  const [fromCurrencyImage, setFromCurrencyImage] = useState(null);
  const [toCurrencyImage, setToCurrencyImage] = useState(null);

  useEffect(() => {
    setConvertedAmount((amount * currencyValue).toFixed(2));
    // set from fromCurrency and toCurrency to local storage
    localStorage.setItem("fromCurrency", fromCurrency);
    localStorage.setItem("toCurrency", toCurrency);
    setImageDynamicaly();
  }, [currencyValue, amount, toCurrency, fromCurrency]);

  function setImageDynamicaly() {
    // Dynamically import the image based on the currency code
    import(`./assets/icons/${fromCurrency}.png`)
      .then((image) => setFromCurrencyImage(image.default))
      .catch((error) => console.error("Error loading image:", error));
    // Dynamically import  to image based on the currency code
    import(`./assets/icons/${toCurrency}.png`)
      .then((image) => setToCurrencyImage(image.default))
      .catch((error) => console.error("Error loading image:", error));
  }

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleExchange = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
  };

  return (
    <>

    <div className="wrapper">
      <div className="container">
        <p>Amount</p>
        <div className="from">
          {fromCurrencyImage && (
            <img
              className="curImage"
              src={fromCurrencyImage}
              alt={fromCurrency}
            />
          )}
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <hr />
        <p className="mt3">Converted Amount</p>
        <div className="to">
          {toCurrencyImage && (
            <img
              className="curImage"
              src={toCurrencyImage}
              alt={fromCurrency}
            />
          )}
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input type="number" value={convertedAmount} disabled />
        </div>
        <button className="exc" onClick={handleExchange}><img src={exchange} alt="Exchange"  /></button>
      </div>
      
    </div>
    <div className="indication">
        <p >Indicative Exchange Rate</p>
    <p style={{color:'black'}}>1 {fromCurrency} = {parseFloat(currencyValue).toFixed(4)} {toCurrency} </p>
    </div>
    </>
  );
};

export default InputField;
