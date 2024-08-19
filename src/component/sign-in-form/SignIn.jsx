import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils"
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import FormInput from "../../component/form-input/FormInput"
import Button, {BUTTON_TYPE_CLASSES} from "../../component/button/Button"
import {  useState,useContext } from "react"
import { UserContext } from "../../context/user.context"



const defaultLogIn ={
    email:'',
    password:''
}
function SignIn(){
    
  
    const [userLogin,setUserLogin] = useState(defaultLogIn)
    const{email,password} = userLogin

    const {setCurrentUser} = useContext(UserContext)
    
    const signInWithGoogle = async()=>{
        await signInWithGooglePopup()
    }
    function resetFormField(){
        setUserLogin(defaultLogIn)
    }
    async function handleSubmit(event){
        event.preventDefault()
        if(!email || !password){
            alert('Please enter email and password')
            return;
        } 

        try{
             const res =await signInUserWithEmailAndPassword(email,password)
            setCurrentUser(user)
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
                <div className="buttons-container" style={{display:'flex',gap:'10px'}}>
                    <Button type='submit' buttonType={BUTTON_TYPE_CLASSES.base} >Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Sign in with Google</Button>
                </div>
                 </form>
        </div>
        </>
    )
}
export default SignIn