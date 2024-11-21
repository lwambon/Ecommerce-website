import { createContext } from "react";
import AllProducts from "../../data/AllProducts";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const ContextValue = { AllProducts };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
