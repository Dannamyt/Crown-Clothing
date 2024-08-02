import { Routes,Route } from "react-router-dom"

import Home from "./Routes/home/Home"
import Navigation from "./Routes/navigation/Navigation"
import Authentication from "./Routes/authentication/authentication"
import Shop from "./Routes/shop/shop.component"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path ='shop' element={<Shop/>}/>
        <Route path="auth" element={<Authentication/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
