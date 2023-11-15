import React from 'react'

function Error({children}) {
  return (
    <p className='bg-red-600 p-3 text-white text-center uppercase font-bold'>{children}</p>
  )
}

export default Error