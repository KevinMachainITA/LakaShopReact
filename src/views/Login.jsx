import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Error from '../components/Error'
import { useAuth } from '../hooks/useAuth'

function Login() {

    const [errors, setErrors] = useState([])
    const { login } = useAuth({
      middleware: 'guest',
      url:'/'
    })

    const emailRef = createRef()
    const passwordRef = createRef()

    const handleSubmit = async e => {
      e.preventDefault()
  
      const form = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
      login(form, setErrors)
    }

    return (
      <form
        onSubmit={handleSubmit}
      >
          <p className="mb-4 text-center">Please login your account</p>
          
          {errors ? errors.map(error => <Error key={error}>{error}</Error>) : null}
          
          <div className="flex flex-col">
            <label 
              htmlFor="email"
              className="my-2"
            >Email </label>
            <input 
              type="email"
              name="email"
              id="email"
              className="mb-4 p-2 border border-black rounded-lg"
              ref={emailRef}
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
              className="mb-4 p-2 border border-black rounded-lg"
              ref={passwordRef}
            />
          </div>
          
          <div className="mb-12 pb-1 pt-1 text-center">
            <div className="w-full">
              <input
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-blue-800 text-white transition duration-150 ease-in-out hover:shadow-xl hover:cursor-pointer"
                type="submit"
                value="login"
              />
            </div>
            <a href="#!">Forgot password?</a>
          </div>
          <div className="flex items-center justify-between pb-6">
            <p className="mb-0 mr-2">Don't have an account?</p>
            <div>
              <Link
                to="/auth/register"
                className="inline-block rounded border-2 border-gray-400 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 "
              >
                Register
              </Link>
            </div>
          </div>
        </form>
    )
}

export default Login