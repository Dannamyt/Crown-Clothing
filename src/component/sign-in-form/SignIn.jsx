import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils"
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import FormInput from "../../component/form-input/FormInput"
import Button from "../../component/button/Button"
import { useState } from "react"



const defaultLogIn ={
    email:'',
    password:''
}
function SignIn(){
    
  
    const [userLogin,setUserLogin] = useState(defaultLogIn)
    const{email,password} = userLogin
    
    const signInWithGoogle = async()=>{
        const {user} = await signInWithGooglePopup()
       await createUserDocumentFromAuth(user)
    }
    
    async function handleSubmit(event){
        event.preventDefault()
        if(!password) return;

        try{
            const response = await signInUserWithEmailAndPassword(email,password)
            console.log(response)
        }
        catch(error){
            console.log('user cant login'+error.message)
        }
    }
    function handleLogInChange(event){
        const{name, value} = event.target
        setUserLogin({...userLogin,[name]:value})
    }
    
    return(
        <>
        <div>
            <h1>SIGN IN PAGE</h1>
            <h1>I already have an account</h1>
            <form action="" onSubmit={handleSubmit}>
                <p>Sign in with your email and password</p>
                <FormInput label={'Email'} type='email' name ='email' required onChange={handleLogInChange} value={email} />
                <FormInput label={'Password'} type='password' name='password' required onChange={handleLogInChange} value={password} />
                <div className="button-containers" style={{display:'flex',gap:'10px'}}>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoogle}>Sign in with Google</Button>
                </div>
                 </form>
        </div>
        </>
    )
}
export default SignIn