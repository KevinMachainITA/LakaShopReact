import React, {useState} from 'react'
import useStore from '../hooks/useStore'

function ModalUser() {

  const {user, handleClickModalUser, updateUser} =  useStore()

  const [isAdminChecked, setIsAdminChecked] = useState(user.admin);
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.shipping_address);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const [errors, setErrors] = useState({});

  const handleCheckboxChange = () => {
    setIsAdminChecked(!isAdminChecked);
  };

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleAddressChange(event) {
    setAddress(event.target.value)
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value)
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  const validateForm = () => {
    const newErrors = {};
  
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid){
      const updatedUserData = {
        id: user.id,
        admin: isAdminChecked,
        name,
        shipping_address: address,
        phone,
        email,
      };
  
      updateUser(updatedUserData);
      handleClickModalUser();
    }
  };

  return (
    <>
      <form className='w-96'
        onSubmit={handleFormSubmit}
      >
          <p className="mb-4 text-center font-semibold">Edit: <span className='font-normal'>{user.name}</span></p>
          
          <div className="flex flex-col">
            <label 
              htmlFor="name"
              className="my-2"
            >Name</label>
            <input 
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              className={`mb-4 p-2 border border-black rounded-lg ${errors.name ? 'border-red-500' : ''}`}
            />
          </div>

          <div className="flex flex-col">
            <label 
              htmlFor="address"
              className="my-2"
            >Address</label>
            <input 
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={handleAddressChange}
              className={`mb-4 p-2 border border-black rounded-lg ${errors.address ? 'border-red-500' : ''}`}
            />
          </div>

          <div className="flex flex-col">
            <label 
              htmlFor="phone"
              className="my-2"
            >Phone</label>
            <input 
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              className={`mb-4 p-2 border border-black rounded-lg ${errors.phone ? 'border-red-500' : ''}`}
            />
          </div>

          <div className="flex flex-col">
            <label 
              htmlFor="email"
              className="my-2"
            >Email</label>
            <input 
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`mb-4 p-2 border border-black rounded-lg ${errors.email ? 'border-red-500' : ''}`}
            />
          </div>
          
          
          <label className="relative inline-flex items-center mb-4 cursor-pointer">
            <input 
              type="checkbox"
              checked={isAdminChecked}
              onChange={handleCheckboxChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Admin</span>
          </label>
          

          <input 
            className='hover:cursor-pointer text-white text-center w-full uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none'
            type='submit'
            value='edit'
            />
          
          <button
            className='focus:outline-none text-white w-full uppercase bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            type='button'
            onClick={() => handleClickModalUser()}
          >
            cancel
          </button>
        </form>
    </>
  )
}

export default ModalUser