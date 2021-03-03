const getters = {
  cartList(state) {
    return state.cartList
		console.log(state.cartList)
  },
  cartlength(state) {
    return  state.cartList.length
  },

}

export default getters
