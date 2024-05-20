import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Symbol {
  symbol: string;
}

interface Price {
  id: number;
  price: string;
  qty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
        setSymbols(response.data.symbols);
      } catch (error) {
        console.error('Error fetching symbols:', error);
      }
    };

    fetchSymbols();
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      if (selectedSymbol) {
        try {
          const response = await axios.get(`https://api.binance.com/api/v3/trades?symbol=${selectedSymbol}`);
          setPrices(response.data);
        } catch (error) {
          console.error('Error fetching prices:', error);
        }
      }
    };

    fetchPrices();
  }, [selectedSymbol]);

  const logoutHandle = () => {
    localStorage.removeItem('loggedIn');
    navigate("/login")
  };

  return (
    <div>
      <section className='order-book-pg'>
        <select onChange={(e) => setSelectedSymbol(e.target.value)} value={selectedSymbol}>
          <option value="">Select a symbol</option>
          {symbols.map((symbol) => (
            <option key={symbol.symbol} value={symbol.symbol}>
              {symbol.symbol}
            </option>
          ))}
        </select>
        <button onClick={logoutHandle}>Logout</button>
      </section>
      {prices.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(prices[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prices.map((price) => (
              <tr key={price.id}>
                {Object.values(price).map((value, index) => (
                  <td key={index}>{value.toString()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderPage;
