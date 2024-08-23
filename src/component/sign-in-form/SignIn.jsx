import { signInWithGooglePopup,signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import FormInput from "../../component/form-input/FormInput"
import Button, {BUTTON_TYPE_CLASSES} from "../../component/button/Button"
import {  useState  } from "react"
import { ButtonsContainer, SignInContainer } from "./sign-in.styles"
// import { UserContext } from "../../context/user.context"

const defaultLogIn ={
    email:'',
    password:''
}

function SignIn(){
    
  
    const [userLogin,setUserLogin] = useState(defaultLogIn)
    const{email,password} = userLogin

    function resetFormField(){
        setUserLogin(defaultLogIn)
    }
    
    const signInWithGoogle = async()=>{
        await signInWithGooglePopup()
    }
   
    async function handleSubmit(event){
        event.preventDefault()
        if(!email || !password){
            alert('Please enter email and password')
            return;
        } 
        try{
             const res =await signInUserWithEmailAndPassword(email,password)
            console.log(res)
            resetFormField()

        }
        catch(error){
            console.log('user cant login',error.message)
        switch(error.code){
            case 'auth/wrong-password':
            alert('incorrect password for email')
            break;
            case 'auth/user-not-found':
            alert('no user associated with this email')
            break;
        default:
            console.log(error)
        }
        }
    }
    function handleLogInChange(event){
        const{name, value} = event.target;
        setUserLogin({...userLogin,[name]:value})
    }
    
    return(
        <>
        <SignInContainer>
            <h2>Already have an account?</h2>
            <form  onSubmit={handleSubmit}>
                <p>Sign in with your email and password</p>
                <FormInput label='Email' type='email' name ='email' required onChange={handleLogInChange} value={email} />
                <FormInput label='Password' type='password' name='password' required onChange={handleLogInChange} value={password} />
                <ButtonsContainer>
                    <Button type='submit' onClick={handleSubmit} >Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Sign in with Google</Button>
                </ButtonsContainer>
                 </form>
        </SignInContainer>
        </>
    )
}
export default SignIn