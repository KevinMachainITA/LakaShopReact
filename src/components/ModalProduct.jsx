import React from 'react'
import { useState, useEffect } from 'react'
import useStore from '../hooks/useStore'
import { formatMoney, calculateDiscountedPrice } from '../helpers'

function ModalProduct() {

    const { product, handleClickModal, handleClickAddProductCart, cart } = useStore()
    const [ amount, setAmount] = useState(1)
    const [ edition, setEdition] = useState(false)

    useEffect(()=>{
        if(cart.some(cartState => cartState.id === product.id)){
            const productEdit = cart.filter(cartState => cartState.id === product.id)[0]
            setAmount(productEdit.amount)
            setEdition(true)
        }
    },[cart])

    return (
        <div className='gap-10'>
            <div className='flex justify-end mb-2'>
                <button
                    type='button'
                    onClick={handleClickModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div>
                <img
                    className='w-56 h-64 m-auto' 
                    src={`${product.image}`} 
                    alt={`Image ${product.name}`}
                />
            </div>

            <div className='my-2 px-2'>
                <h1 className='text-center text-lg font-bold uppercase'>{product.name}</h1>
                <p className='text-center text-base font-semibold'>{formatMoney(calculateDiscountedPrice(product.price, product.discount,1))}</p>
                <div className='flex justify-center items-center gap-4 my-2'>
                    <button
                        type='button'
                        onClick={() => {
                            if(amount > 1) setAmount(amount - 1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                        </svg>
                    </button>
                    
                    <p className='text-lg'>{amount}</p>
                    
                    <button
                        type='button'
                        onClick={() => {
                            if(amount < 10) setAmount(amount +1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                    </button>
                </div>
                <button
                    type='submit'
                    className='inline-block w-full rounded border-2 border-blue-800 bg-blue-800 text-white my-2 p-2 text-xs font-medium uppercase leading-normal text-danger transition duration-500 ease-in-out hover:border-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 hover:text-blue-800 hover:bg-white hover:scale-110'
                    onClick={()=>{
                        handleClickAddProductCart({...product, amount})
                        handleClickModal()
                    }}
                >{edition ? 'edit':'add'}</button>
            </div>
        </div>
    )
}

export default ModalProduct