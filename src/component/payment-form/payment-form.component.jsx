import { CardElement,useStripe,useElements, PaymentElement } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/Button";
import { FormContainer, PaymentFormContainer } from "./payment-form.styles";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";


const PaymentForm =()=>{

    const{currentUser} = useContext(UserContext)
    const {cartTotal} = useContext(CartContext)
    const[isProccessingPayment, setIsProcessingPayment] = useState(false)
    
    
    const stripe = useStripe()
    const elements = useElements()
    
    const paymentHandler = async(e)=>{
        e.preventDefault()

        if(!stripe || !elements) return;

        setIsProcessingPayment(true)
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: cartTotal * 100})
         }).then(res => res.json())
        
             const {paymentIntent:{client_secret}} = response
            
             console.log(client_secret)

             const paymentResult = await stripe.confirmCardPayment(client_secret,{
                 
                payment_method:{
                     card: elements.getElement(CardElement),
                     billing_details:{
                       name:currentUser ? currentUser.displayName : 'Visitor'
                    }
                 }
             })

             setIsProcessingPayment(false)

             if(paymentResult.error){
                 alert(paymentResult.error)
             }else{
                 if(paymentResult.paymentIntent.status === 'succeeded'){
                     alert('payment succesful')
               }
             }
        }
    


    return(
    <>
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <div>
                    <CardElement/>
                    <button onClick={paymentHandler} >payyyyyy</button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProccessingPayment}>Pay Now</Button>
                </div>
            </FormContainer>
        </PaymentFormContainer>
    </>
)
}
export default PaymentForm