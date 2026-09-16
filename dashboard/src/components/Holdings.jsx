import { useContext, useState, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./Generalcontext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const Holdings = () => {
  const [holdings,setHoldings]=useState([]);
  const { orderVersion } = useContext(GeneralContext);
  useEffect(()=>{
    axios.get(`${API_URL}/allHoldings`).then((res)=>{
      setHoldings(res.data);
    })
  },[orderVersion]);
  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {holdings.map((stock, index) =>{
            const currValue=stock.price * stock.qty ;
            const isProfit=currValue-stock.avg*stock.qty>=0.0;
            const profClass=isProfit?"profit":"loss";
            const daygClass=!stock.isLoss?"profit":"loss";
            return ( 
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{currValue.toFixed(2)}</td>
                <td className={profClass}>{(currValue-stock.avg*stock.qty).toFixed(2)}</td>
                <td className={profClass}>{stock.net}%</td>
                <td className={daygClass}>{stock.day}%</td>
              </tr>
              );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
