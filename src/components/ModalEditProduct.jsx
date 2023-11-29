import React, {useState} from 'react'
import useStore from '../hooks/useStore'

function ModalEditProduct() {

    const {categories, productEdit, handleClickModalEditProduct, updateProduct} = useStore()

    const [formData, setFormData] = useState({
        id: productEdit.id,
        name: productEdit.name,
        description: productEdit.description,
        price: productEdit.price,
        discount: productEdit.discount,
        size: productEdit.size,
        stock: productEdit.stock.toString(),
        image: productEdit.image,
        category_id: productEdit.category_id.toString(), // We add a field for the selected category
      });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };
    
    const handleCategoryChange = (e) => {
        setFormData({
          ...formData,
          category_id: e.target.value,
        });
    };
      
    const validateForm = () => {
        const newErrors = {};
        // Validate each field and add errors to the new Errors object if necessary
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!formData.price.trim() || parseFloat(price) <= 0) {
            newErrors.price = 'Price is required';
        }
        if (!formData.discount.trim() || parseFloat(discount) < 0 || parseFloat(discount) > 100) {
            newErrors.discount = 'Discount is required';
        }
        if (!formData.stock.trim() || parseInt(stock) < 0 || parseInt(stock) > 1000) {
            newErrors.stock = 'Stock is required';
        }
        if (!formData.size.trim() || parseFloat(size) >= 100) {
            newErrors.size = 'Size is required';
        }
        if (!formData.image.trim()) {
            newErrors.image = 'Image is required';
        }
        if (!formData.category_id.trim()) {
            newErrors.category_id = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if there are no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validateForm();

        if (isValid) {
            updateProduct(formData)
            handleClickModalEditProduct()
        }
    };

    return (
        <>
            <form className='w-[40rem]'
                onSubmit={handleSubmit}
            >
                <p className="mb-4 text-center font-semibold">Edit: <span className='font-normal'>{productEdit.name}</span></p>
                
                <div className="flex flex-col">
                    <label 
                        htmlFor="name"
                        className="my-2"
                    >Name</label>
                    <input 
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`mb-4 p-2 border border-black rounded-lg ${errors.name ? 'border-red-500' : ''}`}
                    />
                </div>

                <div className="flex flex-col">
                    <label 
                        htmlFor="description"
                        className="my-2"
                    >Description</label>
                    <input 
                        type="text"
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={`mb-4 p-2 border border-black rounded-lg ${errors.description ? 'border-red-500' : ''}`}
                    />
                </div>
                
                <div className='flex justify-between gap-2'>
                    <div className="flex flex-col w-1/3">
                        <label 
                            htmlFor="price"
                            className="my-2"
                        >Pirce</label>
                        <input 
                            type="number"
                            max="99999"
                            min="1"
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className={`mb-4 p-2 border border-black rounded-lg ${errors.price ? 'border-red-500' : ''}`}
                        />
                    </div>

                    <div className="flex flex-col w-1/3">
                        <label 
                            htmlFor="discount"
                            className="my-2"
                        >Discount</label>
                        <input
                            type="number"
                            max="100"
                            min="0"
                            name="discount"
                            id="discount"
                            value={formData.discount}
                            onChange={handleInputChange}
                            className={`mb-4 p-2 border border-black rounded-lg ${errors.discount ? 'border-red-500' : ''}`}
                        />
                    </div>

                    <div className="flex flex-col w-1/3">
                        <label 
                            htmlFor="size"
                            className="my-2"
                        >Size</label>
                        <input 
                            type="number"
                            max="99"
                            min="1"
                            name="size"
                            id="size"
                            value={formData.size}
                            onChange={handleInputChange}
                            className={`mb-4 p-2 border border-black rounded-lg ${errors.size ? 'border-red-500' : ''}`}
                        />
                    </div>

                    <div className="flex flex-col w-1/3">
                        <label 
                            htmlFor="stock"
                            className="my-2"
                        >Stock</label>
                        <input 
                            type="number"
                            max="1000"
                            min="1"
                            name="stock"
                            id="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            className={`mb-4 p-2 border border-black rounded-lg ${errors.stock ? 'border-red-500' : ''}`}
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label 
                        htmlFor="image"
                        className="my-2"
                    >Image</label>
                    <input 
                        type="text"
                        name="image"
                        id="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className={`mb-4 p-2 border border-black rounded-lg ${errors.image ? 'border-red-500' : ''}`}
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="category" className="my-2">
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        value={formData.category_id}
                        onChange={handleCategoryChange}
                        className={`mb-4 p-2 border border-black rounded-lg ${errors.category_id ? 'border-red-500' : ''}`}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input 
                    className='hover:cursor-pointer text-white text-center w-full uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none'
                    type='submit'
                    value='Edit'
                    />
                
                <button
                    className='focus:outline-none text-white w-full uppercase bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                    type='button'
                    onClick={()=>handleClickModalEditProduct()}
                >
                    cancel
                </button>
            </form>
        </>
    )
}

export default ModalEditProduct