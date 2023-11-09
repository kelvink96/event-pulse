import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Models} from "appwrite";
import {deleteCurrentSession, getCurrentSession, logIn, verifySession, VerifySessionOptions} from "@/lib/auth.ts";

interface EventPulseAuthContext {
  session?: Models.Session
  logOut: () => void,
  logIn: (email: string) => void,
  verifySession: (options: VerifySessionOptions) => void,
}

export const AuthContext = createContext<EventPulseAuthContext | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const auth = useAuthState()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthState() {
  const [session, setSession] = useState<Models.Session>()

  async function logOut() {
    await deleteCurrentSession()
    setSession(undefined);
  }

  async function verifySessionAndSave(options: VerifySessionOptions) {
    const data  = await verifySession(options)
    setSession(data)
  }

  useEffect(() => {
    (async function run() {
      const data = await getCurrentSession()

      setSession(data.session)
    })()
  }, []);

  return {
    session,
    logOut,
    logIn,
    verifySession: verifySessionAndSave
  }
}


export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth can not be used outside of auth context!!!')
  }

  return auth;
}
