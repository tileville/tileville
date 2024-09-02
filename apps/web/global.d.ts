// eslint-disable-next-line no-var
declare var mina:
  | {
      requestAccounts: () => Promise<string[]>;
      getAccounts: () => Promise<string[]>;
      on: (event: "accountsChanged", handler: (event: any) => void) => void;
      request: (any) => Promise<any>;
      isPallad: boolean;
    }
  | undefined;
