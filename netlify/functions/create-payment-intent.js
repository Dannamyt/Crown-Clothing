require('dotenv').config()
const stripe = require("stripe")('sk_test_51PqIPsHY963B6gMqsjnT0jwDRFmaVIQAKvoHNKCi0GRJebXkFhgIiXY5S2B11re9RVRkwzrPwqV19Ne2z6hkPvKd008LVypLXn')

exports.handler = async(event) =>{
    
    try{
        const {amount} = JSON.parse(event.body)

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency:'usd',
            payment_method_types:["card"]
        })
        return{
            statusCode:200,
            body:JSON.stringify({paymentIntent})
        }
    }
    catch(error){
        console.log({error})
        return{
            statusCode:400,
            body:JSON.stringify({error})

        }
    }
}