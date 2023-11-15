import React, {useState} from 'react'
import useStore from '../hooks/useStore'

function ModalOrder() {

    const {order, handleClickModalOrder, updateOrder} =  useStore()

    const [orderStatus, setOrderStatus] = useState(order.status)

    const handleStatusChange = (e) => {
        setOrderStatus(e.target.value);
    };

    const handleUpdateOrder = (e) => {
        e.preventDefault();

        const formData = {
            orderId: order.id,
            status: orderStatus
        }

        updateOrder(formData)
        handleClickModalOrder();
    };

    return (
        <>
            <div className='w-96'>
                <h1 className="mb-4 text-center font-semibold">Order ID: <span className='font-normal'>{order.id}</span></h1>
                
                <h2>{order.user.name}</h2>
                <h2>{order.shippin_address}</h2>
                <h2>{order.payment_method}</h2>
                <h2>{order.total}</h2>
                
                <div className="flex flex-col">
                    <label htmlFor="status" className="my-2">
                        Status
                    </label>
                    <select
                        name="status"
                        id="status"
                        value={orderStatus}
                        onChange={handleStatusChange}
                        className='mb-4 p-2 border border-black rounded-lg'
                    >
                        <option value="pending">Pending</option>
                        <option value="in process">In Process</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <input 
                    className='hover:cursor-pointer text-white text-center w-full uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none'
                    type='submit'
                    value='edit'
                    onClick={handleUpdateOrder}
                    />
                
                <button
                    className='focus:outline-none text-white w-full uppercase bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                    type='button'
                    onClick={() => handleClickModalOrder()}
                >
                    cancel
                </button>
            </div>
        </>
    )
}

export default ModalOrder