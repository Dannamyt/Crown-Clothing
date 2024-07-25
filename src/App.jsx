import { Routes,Route } from "react-router-dom"

import Home from "./Routes/home/Home"
import Navigation from "./Routes/navigation/Navigation"
import SignIn from "./Routes/sign-in/sign-in"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="sign-in" element={<SignIn/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
