import { useContext, useState } from "react"
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import Button from "../button/Button"
import FormInput from "../form-input/FormInput"
import { UserContext } from "../../context/user.context"


const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

function SignUp(){
    
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields
    
    const {setCurrentUser} = useContext(UserContext)
    
    function resetFormFields(){
        setFormFields(defaultFormFields)
    }

    async function handleSubmit(event){
        event.preventDefault()
        if(password !== confirmPassword) return;

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password)
           await createUserDocumentFromAuth(user,{displayName})
           setCurrentUser(user) 
           console.log(user)
           resetFormFields()
        }  
        catch(error){
            console.log('user got errored '+ error)
        }
    }
    
    function handleChange(event){
        const{name,value}  = event.target
        setFormFields({...formFields,[name]:value})
        
    }
    
    return(
        <>
        <div>
            <h1>Sign up with your email and password</h1>
            <form action="" onSubmit={handleSubmit}>
                <FormInput label={'Display Name'} type="text" onChange={handleChange} required name="displayName" value={displayName}/>
                <FormInput label={'Email'} type="email" onChange={handleChange} required name="email" value={email}/>
                <FormInput label ={'Password'} type="password" onChange={handleChange} required name="password" value={password}/>
                <FormInput label={'Confirm Password'} type="password" onChange={handleChange} required name="confirmPassword" value={confirmPassword}/>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
        
        </>
    )
}
export default SignUp