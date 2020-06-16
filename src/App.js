import React, {useEffect} from 'react';
import { userAtom, exeAtom, userRoutines, userFollowing, userFollowers } from "./Atoms/Atoms"
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
import ProfileShowContainer from './Containers/ProfileShowContainer';

function App() {

  const [user, setUser] = useRecoilState (userAtom),
    setExercises = useSetRecoilState (exeAtom),
    setRoutines = useSetRecoilState(userRoutines),
    setFollowing = useSetRecoilState(userFollowing),
    setFollowers = useSetRecoilState(userFollowers)

  useEffect(()=>{
    if(localStorage.getItem("token")) {
      fetch(`${API}/login`, {
        headers: {"Authenticate": localStorage.token}
      })
      .then(resp => resp.json())
      .then(user =>{ 
        
        setUser(user)
        setRoutines(user.routines)
        setFollowers(user.followers)
        setFollowing(user.followed)
        
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
          <Route exact path="/profile" >
            {user.name ? <ProfileContainer/>: <Redirect to="/login"/>}
          </Route>
          <Route exact path="/profile/:id" render={
            (routerProps) => { 
              let id = routerProps.match.params.id
              return <ProfileShowContainer user={id}/>
            }
          }
          />
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
