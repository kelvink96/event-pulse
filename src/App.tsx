import './App.css'
import {Route} from "wouter";
import Home from "@/pages/home.tsx";
import Login from "@/pages/login.tsx";
import Session from "@/pages/session.tsx";
import EventId from "@/pages/event/[eventid].tsx";
import EventNew from "@/pages/event/new.tsx";
import {AuthProvider} from "@/hooks/use-auth.tsx";

const Router = () => {
  return (
    <>
      <Route path="" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/session" component={Session}/>
      <Route path="/events/new" component={EventNew}/>
      <Route path="/event/:eventId" component={EventId}/>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  )
}

export default App
