import React from 'react'
import useStore from '../hooks/useStore'
import {formatMoney, calculateDiscountedPrice} from '../helpers' 

function Product({product}) {

    const {id, name, price, stock, discount, size, image, category_id} = product
    const {modal, handleClickModal, handleSetProduct} = useStore()

    const isDiscounted = discount > 0;

    return (
        <div className='border p-3 shadow rounded-lg bg-white flex flex-col justify-between'>
            <img
                className='w-full rounded-lg'
                src={image}
                alt={`image ${name}`} 
                />
            <div className='p-3 '>
                <h3 className='text-blue-700 text-lg font-semibold uppercase pb-2 line-clamp-2'>{name}</h3>
                <div className='flex items-center gap-2 my-2'>
                    <h4 className={`${isDiscounted ? "line-through" : "hidden"}`}>{formatMoney(price)}</h4>
                    <h4 className='text-xl font-bold'>{formatMoney(calculateDiscountedPrice(price, discount,1))}</h4>
                </div>
                <div className='flex flex-col  mb-4 gap-1'>
                    <h4 className='text-sm'>Discount: <span className="bg-green-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded">{discount}%</span></h4>
                    <h4 className='text-sm'>Stock: <span className="bg-gray-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded">{stock}</span></h4>
                    <h4 className='text-sm'>Size: <span className="bg-blue-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded">{size}</span></h4>
                </div>
                <button
                    type='button'
                    className='inline-block w-full rounded border-2 border-blue-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-500 ease-in-out hover:border-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 hover:text-white hover:bg-blue-800 hover:scale-110'
                    onClick={() => {
                        handleClickModal()
                        handleSetProduct(product)
                    }}
                >
                    add to cart
                </button>
            </div>
        </div>
    )
}

export default Product