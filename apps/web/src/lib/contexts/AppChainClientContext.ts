import { type ClientAppChain } from "@proto-kit/sdk";
import { createContext } from "react";

const AppChainClientContext = createContext<
  ClientAppChain<any, any, any, any> | undefined
>(undefined);

export default AppChainClientContext;
