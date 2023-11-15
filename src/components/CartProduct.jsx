import React from 'react'
import {formatMoney, calculateDiscountedPrice} from "../helpers"
import useStore from '../hooks/useStore';

function CartProduct({product}) {

    const {id, name, price, amount, discount} = product
    const {handleEditCartProduct, handleDeleteCartProduct} = useStore()

    return (
        <div className="shadow space-y-1 p-4 bg-white border border-gray-500 rounded-lg mt-2">
            <div className="space-y-2">
                <p className="text-xl font-bold text-blue-800">{name}</p>
                <p className="text-base">
                    Amount: <span className='font-semibold text-black'>{amount}</span>
                </p>
                <p className="text-base">
                    Price: <span className='text-black font-semibold'>{formatMoney(price)}</span>
                </p>
                <p className="text-base">
                    Discount: <span className='text-black font-semibold'>{discount}%</span>
                </p>
                <p className="text-base">
                    Subtotal: <span className='text-black font-semibold'>{formatMoney(calculateDiscountedPrice(price, discount, amount))}</span>
                </p>
            </div>
    
            <div className="flex justify-between gap-2">
                <button
                    type="button"
                    className="p-2"
                    onClick={() => handleEditCartProduct(id)}
                >   
                    <div className='bg-blue-800 text-white p-1 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </div>
                </button>

                <button
                    type="button"
                    className="p-2"
                    onClick={() => handleDeleteCartProduct(id)}
                >
                    <div className='bg-red-600 text-white p-1 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default CartProduct