import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);
  // const [rates, setRates] = React.useState({});
  const retesRef = React.useRef({});

  React.useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((json) => {
        // setRates(json.rates);
        retesRef.current = json.rates;
        onChangeFromPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        // alert("Не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / retesRef[fromCurrency];
    const result = price * retesRef[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result = (retesRef[fromCurrency] / retesRef[toCurrency]) * value;
    setFromPrice(result);
    setToPrice(value);
  };

  // const onChangeFromCurrency = (cur) => {
  //   setFromCurrency(cur);
  //   onChangeFromPrice(fromPrice)
  // };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
