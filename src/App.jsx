import { BrowserRouter , Routes ,Route } from 'react-router-dom'
import './App.css'
import LogIn from './pages/auth/logIn'
import SignUp from './pages/auth/signUp'
import Notes from './pages/notes'
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from 'react'
import { auth } from './config/firebase'

export const UserContext = createContext()

function App() {
const [user,setUser]=useState();
    onAuthStateChanged(auth, (FbUser) => {
      if (FbUser) {
        setUser(FbUser)
      } else {
        setUser(null)
      }
    });

  return (
    <UserContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/home/:id" element={<Notes />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>

  )
}

export default App
