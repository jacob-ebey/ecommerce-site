import { globalReducer } from "react-hook-utils"

import { listReducer } from "./list";

const lsCart = global.window && global.window.localStorage.getItem("shopping-cart")
const initialState = {
  items: !lsCart ? [] : JSON.parse(lsCart) || []
}

const cartList = listReducer(state => state.items)

export const cartReducer = {
  push: (state, ...entries) => ({
    ...state,
    items: cartList.push(state, ...entries)
  }),
  clear: (state) => ({
    ...state,
    items: cartList.clear()
  })
}

export const useCart = globalReducer(initialState, cartReducer, ({ items }) => {
  global.window && global.window.localStorage.setItem("shopping-cart", JSON.stringify(items));
})

export default useCart
