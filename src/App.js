import React, {useEffect} from 'react';
import { userAtom, exeAtom, userRoutines } from "./Atoms/Atoms"
import { useSetRecoilState, useRecoilState } from "recoil"
import './App.css'
import {API} from "./constants/index"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Nav from "./Containers/NavContainer"
import CreateWorkoutContainer from "./Containers/CreateWorkoutContainer"
import Footer from "./Components/Footer"
import ProfileContainer from "./Containers/ProfileContainer"
import LoginContainer from './Containers/LoginContainer';
import RoutineContainer from './Containers/RoutineContainer';

function App() {

  const [user, setUser] = useRecoilState (userAtom),
    setExercises = useSetRecoilState (exeAtom),
    setRoutines = useSetRecoilState(userRoutines)

  useEffect(()=>{
    if(localStorage.getItem("token")) {
      fetch(`${API}/login`, {
        headers: {"Authenticate": localStorage.token}
      })
      .then(resp => resp.json())
      .then(user =>{ 
        
        setUser(user)
        setRoutines(user.routines)
      })
    }
  },[setUser, setRoutines])

  useEffect(()=>{
    fetch(`${API}/exercises`)
    .then(resp => resp.json())
    .then(data => setExercises(data))
  },[setExercises])

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/create-workout">
          <CreateWorkoutContainer/> 
            {/* {user.name ? <CreateWorkoutContainer/> : <Redirect to="/login"/>} */}
          </Route>
          <Route path="/routines">
            {user.name ? <RoutineContainer /> : <Redirect to="/login"/>}
          </Route>
          <Route path="/profile" >
            {user.name ? <ProfileContainer/>: <Redirect to="/login"/>}
          </Route>
          <Route path="/login">
            {!user.name ? <LoginContainer/>: <Redirect to="/profile"/>}
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
