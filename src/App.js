import React, {useEffect} from 'react';
import { userAtom, exeAtom, userWorkouts } from "./Atoms/Atoms"
import { useSetRecoilState } from "recoil"
import './App.css'
import {URL} from "./constants/index"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Nav from "./Containers/NavContainer"
import CreateWorkoutContainer from "./Containers/CreateWorkoutContainer"
import CreateRoutineContainer from './Containers/CreateRoutineContainer'
import Footer from "./Components/Footer"

function App() {

  const setUser = useSetRecoilState (userAtom),
    setExercises = useSetRecoilState (exeAtom),
    setWorkouts = useSetRecoilState(userWorkouts)

  useEffect(()=>{
    fetch(`${URL}/users/1`)
    .then(resp => resp.json())
    .then(user =>{ 
      setUser(user)
      setWorkouts(user.workouts)
    })
  },[setUser])

  // if(localStorage.getItem("token")){
  //   fetch("https://young-meadow-44827.herokuapp.com/login", {
  //     headers: {
  //       "Authenticate": localStorage.token
  //     }
  //   })
  //   .then(res => res.json())
  // .then(user=> {
      
  //     this.handleLogin(user)
  //     //if error, don't update the state
  //   })

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
            <CreateWorkoutContainer/>
          </Route>
          <Route path="/create-routine">
            <CreateRoutineContainer />
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
