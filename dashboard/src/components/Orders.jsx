import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./Generalcontext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { orderVersion } = useContext(GeneralContext);

  useEffect(() => {
    axios.get(`${API_URL}/allOrders`).then((res) => {
      setOrders(res.data);
    });
  }, [orderVersion]);

  if (!orders.length) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{Number(order.price).toFixed(2)}</td>
                <td className={order.mode === "SELL" ? "loss" : "profit"}>
                  {order.mode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
