import { createContext, useContext, useState } from "react";

const UserContext = createContext<{
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  email: null,
  setEmail: () => {},
});

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};

export { UserContext, UserProvider, useUser };
