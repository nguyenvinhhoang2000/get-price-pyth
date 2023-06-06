import logo from './logo.svg';
import './App.css';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { useState } from 'react';

const TOKEN = [
  "Array [0]",
  "Array [1]",
]

function App() {
  const [state, setState] = useState([])

  const getPrice = async () => {
    const connection = new EvmPriceServiceConnection(
      "https://xc-testnet.pyth.network"
    ); // See Price Service endpoints section below for other endpoints
    
    const priceIds = [
      "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b", // BTC/USD price id in testnet
      "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6", // ETH/USD price id in testnet
      "0xecf553770d9b10965f8fb64771e93f5690a182edc32be4a3236e0caaa6e0581a", // BNB
    ];
    
    // In order to use Pyth prices in your protocol you need to submit the price update data to Pyth contract in your target
    // chain. `getPriceFeedsUpdateData` creates the update data which can be submitted to your contract. Then your contract should
    // call the Pyth Contract with this data.
    const priceUpdateData = await connection.getPriceFeedsUpdateData(priceIds);

    console.log(priceUpdateData);
    setState(priceUpdateData)
  }

  return (
    <div className="App">
      <div className='wrapper'>
      {state.map((item, idx) => (
        <div key={idx} className='a'>
          <div className='b'>{TOKEN[idx]}</div>
          <div className='item'>
          {item}
        </div>
        </div>
      ))}
      </div>
      <button onClick={getPrice} type="button">
        Get price
      </button>
    </div>
  );
}

export default App;
