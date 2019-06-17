import { globalReducer } from "react-hook-utils"

import { listReducer } from "./list";

const lsCart = global.window && global.window.localStorage.getItem("shopping-cart")
const initialItems = !lsCart ? [] : JSON.parse(lsCart) || []

export const useCart = globalReducer(initialItems, listReducer, currentItems => {
  global.window && global.window.localStorage.setItem("shopping-cart", JSON.stringify(currentItems));
});

export default useCart
