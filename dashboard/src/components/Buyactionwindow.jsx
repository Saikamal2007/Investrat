import { useContext, useState } from "react";
import axios from "axios";

import GeneralContext from "./Generalcontext";

import "./Buyactionwindow.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Buyactionwindow = ({ uid, mode = "BUY", defaultPrice = 0 }) => {
  const { closeBuyWindow, markOrderUpdated } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(Number(defaultPrice) || 0);
  const [error, setError] = useState("");
  const isSell = mode === "SELL";

  const handleSubmit = async () => {
    setError("");
    try {
      await axios.post(`${API_URL}/newOrder`, {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode,
      });
      markOrderUpdated();
      closeBuyWindow();
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    }
  };

  return (
    <div
      className={`container ${isSell ? "sell-window" : ""}`}
      id="buy-window"
      draggable="true"
    >
      <div className="regular-order">
        <p className="order-title">
          {isSell ? "Sell" : "Buy"} {uid}
        </p>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
        {error && <p className="order-error">{error}</p>}
      </div>

      <div className="buttons">
        <span>
          {isSell ? "Charges ₹20.00" : "Margin required ₹140.65"}
        </span>
        <div>
          <button
            type="button"
            className={isSell ? "btn btn-red" : "btn btn-blue"}
            onClick={handleSubmit}
          >
            {isSell ? "Sell" : "Buy"}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            onClick={closeBuyWindow}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buyactionwindow;
