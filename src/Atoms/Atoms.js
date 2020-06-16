import { atom } from "recoil"

export const userAtom = atom({
    key: "user",
    default: {}
})

export const userRoutines = atom({
    key: "user-routines",
    default: []
})

export const exeAtom = atom({
    key: "exercises",
    default: []
})

export const searchExe = atom({
    key: "exercise-search",
    default: ""
})

export const selectedExeForWorkout = atom({
    key: "selected-exercise-for-workout",
    default: []
})

export const userPosts = atom({
    key: "user-posts",
    default: null
})

export const userFollowing = atom({
    key: "user-following",
    default: null
})

export const userFollowers = atom({
    key: "user-followers",
    default: null
})
