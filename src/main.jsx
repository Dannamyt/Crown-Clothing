import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CategoriesProvider } from './context/categories.context.jsx'
import { CartProvider } from './context/cart.context.jsx'
// import { Provider } from 'react-redux'
// import { store } from './store/store.jsx'
import { UserProvider } from './context/user.context.jsx'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './stripe/stripe.utils.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <Elements stripe={stripePromise} >
                <App />
              </Elements >
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
)
