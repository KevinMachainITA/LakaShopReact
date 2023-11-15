import React, {useState} from 'react'
import useStore from '../hooks/useStore'
import { formatMoney } from '../helpers'

function ModalPurchase() {

    const {cart, total, handleClickModalPurchase, handleClickPurchase} = useStore()
    const [paymentMethod, setPaymentMethod] = useState('cash'); // or 'card'

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
        console.log(paymentMethod)
    };

    return (
        <>
            <h1 className='mb-2 text-xl text-center text-blue-800 border-b-2'>Order</h1>
            <h2 className='text-center text-2xl font-semibold'>{formatMoney(total)}</h2>
            <fieldset className='my-3 p-2 border rounded-lg shadow-md'>
                <legend className="sr-only">Payment Method</legend>

                <div className="flex items-center mb-2">
                    <input 
                        id="country-option-1" 
                        type="radio" 
                        name="countries" 
                        value="cash" 
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                        checked={paymentMethod === 'cash'}
                        onChange={handlePaymentMethodChange}
                        />
                    <label htmlFor="country-option-1" className="block ml-2 text-sm font-medium text-gray-900">
                    Cash
                    </label>
                </div>

                <div className="flex items-center mb-2">
                    <input 
                        id="country-option-2" 
                        type="radio" 
                        name="countries" 
                        value="card" 
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                        checked={paymentMethod === 'card'}
                        onChange={handlePaymentMethodChange}
                        />
                    <label htmlFor="country-option-2" className="block ml-2 text-sm font-medium text-gray-900">
                    Card
                    </label>
                </div>
            </fieldset>

            <button
                className='focus:outline-none text-white w-full uppercase bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900'
                type='button'
                onClick={() => handleClickPurchase(paymentMethod)}
            >
                purchase
            </button>

            <button
                className='focus:outline-none text-white w-full uppercase bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                type='button'
                onClick={()=>handleClickModalPurchase()}
            >
                cancel
            </button>
        </>
    )
}

export default ModalPurchase