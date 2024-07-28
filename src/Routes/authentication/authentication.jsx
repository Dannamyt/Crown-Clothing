import SignIn from "../../component/sign-in-form/SignIn"
import SignUp from "../../component/sign-up-form/SignUp"

function Authentication(){
    return(
        <>
        <div className="authentication-container" style={{display:'flex',
            justifyContent:'space-between',
            margin:'30px auto',
            width:'1020px'
            }}>
            <SignIn/>
            <SignUp/>
        </div>
        </>
    )
}
export default Authentication