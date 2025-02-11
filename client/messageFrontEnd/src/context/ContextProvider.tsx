import { createContext, ReactNode, useState } from "react";

// Define the user type
export type TUser = {
  userId: string;
  approvalToken: string;
  refreshToken: string;
};


export const AppContext = createContext<any>(null);

// ContextProvider component
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with `null` (user is initially not set)
  const [user, setUser] = useState<TUser | null >(null);

  // Set up context values
  const contextValues= { user, setUser };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};
