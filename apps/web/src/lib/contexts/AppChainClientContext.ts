import { type ClientAppChain } from "tileville-protokit-sdk";
import { createContext } from "react";

const AppChainClientContext = createContext<
  ClientAppChain<any, any, any, any> | undefined
>(undefined);

export default AppChainClientContext;
