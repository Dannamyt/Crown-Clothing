import { Routes,Route } from "react-router-dom"
import { createAction } from "../utils/reducer/reducer.util";
import Home from "./Routes/home/Home"
import Navigation from "./Routes/navigation/Navigation"
import Authentication from "./Routes/authentication/authentication"
import Shop from "./Routes/shop/shop.component"
import Checkout from "./Routes/checkout/checkout.component"
import { useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
function App() {

  useEffect(()=>{
    const unsubscribe = onAuthStateChangedListener((user)=>{
       if(user){
        createUserDocumentFromAuth(user)
       }
        setCurrentUser(user)
    })
    return unsubscribe
},[])
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path ='shop/*' element={<Shop/>}/>
        <Route path="auth" element={<Authentication/>}/>
        <Route path="checkout" element={<Checkout/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
