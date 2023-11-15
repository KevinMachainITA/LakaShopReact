import {createRef, useState} from 'react'
import { Link } from 'react-router-dom'
import Error from '../components/Error'
import { useAuth } from '../hooks/useAuth'

function Register() {

  const {register} = useAuth({middleware: 'guest', url: '/'})

  const [errors, setErrors] = useState([])

  const nameRef = createRef()
  const shippingAddressRef = createRef()
  const phoneRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()

  const handleSubmit = async e => {
    e.preventDefault()

    const form = {
      name: nameRef.current.value,
      shipping_address: shippingAddressRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    }
    register(form, setErrors)
  }

  return (
      <form
        onSubmit={handleSubmit}
      >
        <p className="mb-4 text-center">Please register with us</p>
        
        {errors ? errors.map(error => <Error key={error}>{error}</Error>) : null}
        
        <div className="flex flex-col">
          <label 
            htmlFor="name"
            className="my-2"
          >Name </label>
          <input 
            type="text"
            name="name"
            id="name"
            ref={nameRef}
            className="mb-4 p-2 border border-black rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label 
            htmlFor="address"
            className="my-2"
          >Address </label>
          <input 
            type="text"
            name="address"
            id="address"
            ref={shippingAddressRef}
            className="mb-4 p-2 border border-black rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label 
            htmlFor="phone"
            className="my-2"
          >Phone </label>
          <input 
            type="text"
            name="phone"
            id="phone"
            ref={phoneRef}
            className="mb-4 p-2 border border-black rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label 
            htmlFor="email"
            className="my-2"
          >Email </label>
          <input 
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            className="mb-4 p-2 border border-black rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label 
            htmlFor="email"
            className="my-2"
          >Password </label>
          <input 
            type="password" 
            name="password" 
            id="password"
            ref={passwordRef}
            className="mb-4 p-2 border border-black rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label 
            htmlFor="password_confirmation"
            className="my-2"
          >Password confirmation</label>
          <input 
            type="password" 
            name="password_confirmation" 
            id="password_confirmation"
            ref={passwordConfirmationRef}
            className="mb-4 p-2 border border-black rounded-lg"
          />
        </div>
        
        <div className="mb-12 pb-1 pt-1 text-center">
          <div className="w-full">
            <input
              className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-blue-800 text-white transition duration-150 ease-in-out hover:shadow-xl hover:cursor-pointer"
              type="submit"
              value="Create"
            />
          </div>
        </div>
        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 mr-2">Do you have an account?</p>
          <div>
            <Link
              to="/auth/login"
              className="inline-block rounded border-2 border-gray-400 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700"
            >
              Log in
            </Link>
          </div>
        </div>
      </form>
  )
}

export default Register