import { useUser } from '@supabase/auth-helpers-react';
import { createContext, useContext } from 'react';

import { createContext } from 'react';

interface RoleContextType {
  role: string;
  setRole: (role: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const user = useUser() as any;
  const role = user?.user_metadata?.role || 'Staff';

  const setRole = (newRole: string) => {
    // You can implement role-changing logic here if needed
    console.log('Changing role to:', newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
