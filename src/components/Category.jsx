import React from 'react'
import useStore from '../hooks/useStore'

function Category({category}) {
    const {id, name, description} = category
    const {currentCategory,handleClickCategory} = useStore()

    return (
      <button 
        className={`${currentCategory.id === id ? "bg-blue-800 text-white scale-125":""} transition duration-500 rounded py-2 px-4 mx-2 uppercase`}
        type="button"
        onClick={()=>handleClickCategory(id)}
      >{name}</button>
    )
}

export default Category