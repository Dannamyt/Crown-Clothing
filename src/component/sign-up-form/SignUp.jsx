import { useState } from "react"
import { createAuthUserWithEmailAndPassword,
        createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import Button from "../button/Button"
import FormInput from "../form-input/FormInput"


const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

function SignUp(){
    
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields
    
    
    function resetFormFields(){
        setFormFields(defaultFormFields)
    }

    async function handleSubmit(event){
        event.preventDefault()
        if(password !== confirmPassword) return;

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password)
           await createUserDocumentFromAuth(user,{displayName})
           console.log(user)
           resetFormFields()
        }  
        catch(error){
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
              } else {
                console.log('user creation encountered an error', error);
              }      
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