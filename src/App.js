import React, {useEffect} from 'react';
import { userAtom, exeAtom, userRoutines, userFollowing, userFollowers, userAchievements } from "./Atoms/Atoms"
import { useSetRecoilState, useRecoilState } from "recoil"
import './App.css'
import {API} from "./constants/index"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Nav from "./Containers/NavContainer"
import CreateWorkoutContainer from "./Containers/CreateWorkoutContainer"

import ProfileContainer from "./Containers/ProfileContainer"
import LoginContainer from './Containers/LoginContainer';
import RoutineContainer from './Containers/RoutineContainer';
import ProfileShowContainer from './Containers/ProfileShowContainer';
import Achievements from "./Components/Achievement"
import MainPage from './Containers/MainPage';

function App() {

  const [user, setUser] = useRecoilState (userAtom),
    setExercises = useSetRecoilState (exeAtom),
    setRoutines = useSetRecoilState(userRoutines),
    setFollowing = useSetRecoilState(userFollowing),
    setFollowers = useSetRecoilState(userFollowers),
    setAchievements = useSetRecoilState(userAchievements)

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
        setAchievements(user.achievements)
        
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
        <Achievements/>
        <Nav />
        <Switch>
          <Route exact path="/" render={()=><MainPage/>}/> 
          <Route path="/create-workout">
          {/* <CreateWorkoutContainer/>  */}
            {user.name ? <CreateWorkoutContainer/> : <Redirect to="/profile"/>}
          </Route>
          <Route path="/routines">
            {user.name ? <RoutineContainer /> : <Redirect to="/login"/>}
          </Route>
          <Route exact path="/profile" >
            {user.name ? <ProfileContainer/>: <Redirect to="/"/>}
          </Route>
          <Route exact path="/profile/:id" render={(routerProps) => 
              <ProfileShowContainer user={routerProps.match.params.id}/>
            
          }
          />
       

          <Route path="/login">
            {!user.name ? <LoginContainer/>: <Redirect to="/profile"/>}
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
