import { createContext, useContext, useState } from "react";

const AdminContext = createContext<{
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  email: null,
  setEmail: () => {},
});

type AdminProviderProps = {
  children: React.ReactNode;
};

const AdminProvider = ({ children }: AdminProviderProps) => {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <AdminContext.Provider value={{ email, setEmail }}>
      {children}
    </AdminContext.Provider>
  );
};

const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export { AdminContext, AdminProvider, useAdmin };
