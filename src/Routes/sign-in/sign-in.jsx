import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils"
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import SignUp from "../../component/sign-up-form/SignUp"

function SignIn(){
    
    const logGoogleUser = async()=>{
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    
   
    
    return(
        <>
        <div>
            <h1>SIGN IN PAGE</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <SignUp/>
        </div>
        </>
    )
}
export default SignIn