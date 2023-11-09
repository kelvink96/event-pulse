import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Models} from "appwrite";
import {deleteCurrentSession, getCurrentSession, logIn, verifySession, VerifySessionOptions} from "@/lib/auth.ts";
import {getTeams} from "@/lib/user.ts";

interface EventPulseAuthContext {
  session?: Models.Session
  isAdmin: boolean
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
  const [isAdmin, setIsAdmin] = useState(false)

  async function logOut() {
    await deleteCurrentSession()
    setSession(undefined);
  }

  async function verifySessionAndSave(options: VerifySessionOptions) {
    const data = await verifySession(options)
    setSession(data)
  }

  useEffect(() => {
    (async function run() {
      const data = await getCurrentSession()

      setSession(data.session)
    })()
  }, []);

  useEffect(() => {
    if (!session?.$id) return;

    (async function run() {
      const {teams} = await getTeams()
      const isAdmin = !!teams.find(team => team.$id === import.meta.env.VITE_APPWRITE_TEAM_ADMIN_ID)

      setIsAdmin(isAdmin)
    })()
  }, [session?.$id]);

  return {
    session,
    logOut,
    logIn,
    verifySession: verifySessionAndSave,
    isAdmin
  }
}


// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth can not be used outside of auth context!!!')
  }

  return auth;
}
