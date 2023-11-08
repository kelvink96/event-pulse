import './App.css'
import {Route} from "wouter";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
import Session from "@/pages/Session.tsx";
import EventId from "@/pages/event/[eventid].tsx";
import EventNew from "@/pages/event/new.tsx";

function App() {
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

export default App
