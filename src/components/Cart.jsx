import React from 'react'
import useStore from '../hooks/useStore'
import CartProduct from './CartProduct'
import { formatMoney } from '../helpers'

function Cart() {

  const {cart, total, userCart, handleClickModalPurchase} = useStore()

  const checkCart = () => cart.length === 0

  return (
    <aside className="w-full sm:w-2/3 lg:w-1/3 flex flex-col items-center px-3">
        <div className="w-full bg-white shadow-lg border-2 rounded-lg flex flex-col my-4 p-6">
            <p className="text-xl font-semibold pb-5">ID Cart: {userCart.id}</p>
            <p className="pb-2">Subtotal: {formatMoney(total)}</p>
            <p className="pb-2">Shipping:</p>
            <hr className='my-2' />
            <p className="pb-2">Total:</p>
            <button 
              type='submit'
              className={`${checkCart() ? 'bg-gray-300' : 'bg-yellow-500 hover:bg-yellow-400'} w-full  text-white font-bold text-sm uppercase rounded transition duration-500  flex items-center justify-center px-2 py-3 mt-4`}
              disabled={checkCart()}
              onClick={() => handleClickModalPurchase()}
            >purchase</button>
        </div>

        <div className="w-full bg-white shadow-lg border-2 rounded-lg flex flex-col my-4 p-6">
          <p className="text-xl font-semibold pb-5">Your cart</p>
          <div>
            {cart.length === 0 ? (
              <p>Your cart is empty, add products to buy your favorites shoes</p>
            ): (
              cart.map(product => (
                <CartProduct
                  key={product.id}
                  product={product}
                ></CartProduct>
              ))
            )}
          </div>
        </div>
    </aside>
  )
}

export default Cart