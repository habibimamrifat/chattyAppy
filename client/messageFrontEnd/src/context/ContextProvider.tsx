import { createContext, ReactNode, useState } from "react";

// Define the user type
export type TUser = {
  userId: string;
  approvalToken: string;
  refreshToken: string;
};

interface IAppContext {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

// Create the context with a default value of `null`
export const AppContext = createContext<IAppContext | null>(null);

// ContextProvider component
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with `null` (user is initially not set)
  const [user, setUser] = useState<TUser | null>(null);

  // Set up context values
  const contextValues: IAppContext = { user, setUser };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};
