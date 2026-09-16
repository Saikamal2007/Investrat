import { useContext, useState, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./Generalcontext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Positions = () => {
  const [positions,setPositions]=useState([]);
  const { orderVersion } = useContext(GeneralContext);
  useEffect(()=>{
      axios.get(`${API_URL}/allPositions`).then((res)=>{
      setPositions(res.data.filter((stock) => (stock.price - stock.avg) * stock.qty < 0));
    })
  },[orderVersion]);
  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          {positions.map((stock, index) =>{
            const currValue=stock.price * stock.qty ;
            const isProfit=currValue-stock.avg*stock.qty>=0.0;
            const profClass=isProfit?"profit":"loss";
            const daygClass=!stock.isLoss?"profit":"loss";
            return ( 
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>{(currValue-stock.avg*stock.qty).toFixed(2)}</td>
                <td className={daygClass}>{stock.day}%</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
