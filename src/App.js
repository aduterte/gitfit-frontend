import React, {useState, useEffect} from 'react';
import { userAtom, exeAtom } from "./Atoms/Atoms"
import { useRecoilState } from "recoil"
import './App.css';
import Exercise from "./Components/Exercise"
import {URL} from "./constants/index"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Nav from "./Containers/NavContainer"
import CreateWorkoutContainer from "./Containers/CreateWorkoutContainer"

function App() {

  const [user, setUser] = useRecoilState(userAtom),
    [exercises, setExercises] = useRecoilState(exeAtom)

  const [workout, setWorkout] = useState({})

  useEffect(()=>{
    fetch(`${URL}/users/1`)
    .then(resp => resp.json())
    .then(data => setUser(data))
  },[setUser])

  useEffect(()=>{
    fetch(`${URL}/exercises`)
    .then(resp => resp.json())
    .then(data => setExercises(data))
  },[setExercises])

  // useEffect(()=>{
  //   fetch(`${URL}/workouts/7`)
  //   .then(resp => resp.json())
  //   .then(data => setWorkout(data))
  // },[])
  
  // console.log(workout)
  return (
    <Router>
      <div className="App">
        <Nav />
        <CreateWorkoutContainer/>
     
      </div>
    </Router>
  );
}

export default App;
