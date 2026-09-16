import { createContext, useState } from "react";

import BuyActionWindow from "./Buyactionwindow";

const GeneralContext = createContext({
  openBuyWindow: (uid, price) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid, price) => {},
  closeSellWindow: () => {},
  orderVersion: 0,
  markOrderUpdated: () => {},
});

export const GeneralContextProvider = (props) => {
  const [actionWindow, setActionWindow] = useState(null);
  const [orderVersion, setOrderVersion] = useState(0);

  const handleOpenBuyWindow = (uid, price = 0) => {
    setActionWindow({ mode: "BUY", uid, price });
  };

  const handleOpenSellWindow = (uid, price = 0) => {
    setActionWindow({ mode: "SELL", uid, price });
  };

  const handleCloseActionWindow = () => {
    setActionWindow(null);
  };

  const handleOrderUpdated = () => {
    setOrderVersion((version) => version + 1);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseActionWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseActionWindow,
        orderVersion,
        markOrderUpdated: handleOrderUpdated,
      }}
    >
      {props.children}
      {actionWindow && (
        <BuyActionWindow
          uid={actionWindow.uid}
          mode={actionWindow.mode}
          defaultPrice={actionWindow.price}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
