import React, {useEffect} from 'react';
import { userAtom, exeAtom, userWorkouts } from "./Atoms/Atoms"
import { useSetRecoilState, useRecoilState } from "recoil"
import './App.css'
import {URL} from "./constants/index"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Nav from "./Containers/NavContainer"
import CreateWorkoutContainer from "./Containers/CreateWorkoutContainer"
import CreateRoutineContainer from './Containers/CreateRoutineContainer'
import Footer from "./Components/Footer"
import ProfileContainer from "./Containers/ProfileContainer"
import LoginContainer from './Containers/LoginContainer';

function App() {

  const [user, setUser] = useRecoilState (userAtom),
    setExercises = useSetRecoilState (exeAtom),
    setWorkouts = useSetRecoilState(userWorkouts)

  useEffect(()=>{
    if(localStorage.getItem("token")) {
      fetch(`${URL}/login`, {
        headers: {"Authenticate": localStorage.token}
      })
      .then(resp => resp.json())
      .then(user =>{ 
        setUser(user)
        setWorkouts(user.workouts)
      })
    }
  },[setUser, setWorkouts])

  useEffect(()=>{
    fetch(`${URL}/exercises`)
    .then(resp => resp.json())
    .then(data => setExercises(data))
  },[setExercises])

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/create-workout">
            {user.name ? <CreateWorkoutContainer/> : <Redirect to="/login"/>}
          </Route>
          <Route path="/create-routine">
            {user.name ? <CreateRoutineContainer />: <Redirect to="/login"/>}
          </Route>
          <Route path="/profile">
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
