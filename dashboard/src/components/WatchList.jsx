import { Tooltip, Grow } from "@mui/material";
import { useContext, useState } from "react";
import { watchlist } from "../assets/data";
import { KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material";
import { BarChartOutlined } from "@mui/icons-material";
import GeneralContext from "./Generalcontext";
const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);
  const handleMouseEnter = () => {
    setShowWatchListActions(true);
  }
  const handleMouseLeave = () => {
    setShowWatchListActions(false);
  }
  return(
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
          <div className="itemInfo">
            <span className="percent">{stock.percent}</span>  
            {stock.isDown ? <KeyboardArrowDown className="down" /> : <KeyboardArrowUp className="up" />}
          <span className="price">{stock.price}</span> 
          </div>
      </div>
      {showWatchListActions && (
        <WatchListActions uid={stock.name} price={stock.price} />
      )}
    </li>
  );
}

const WatchListActions = ({ uid, price }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  return (
    <span className="actions">
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button className="buy" onClick={() => openBuyWindow(uid, price)}>Buy</button>
        </Tooltip>
          <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
        <button className="sell" onClick={() => openSellWindow(uid, price)}>Sell</button>
        </Tooltip>
          <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" style={{height:"30%",paddingBottom:"2%"}}><BarChartOutlined className="analytics" /></button>
        </Tooltip>
          <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button className="action" style={{height:"30%"}}><MoreHoriz className="analytics" /></button>
        </Tooltip>
    </span>



  );
}
export default WatchList;
