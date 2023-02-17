import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from '../data/data'
import reducer from '../reducer/reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  const addToCart = (id) => {
    dispatch({ type: 'ADD_TO_CART', payload: id })
  }
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
