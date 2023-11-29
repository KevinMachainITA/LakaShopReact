import { useEffect } from "react"
import useSWR from "swr"
import { useNavigate } from "react-router-dom"
import customerAxios from "../config/axios"
import useStore from "./useStore"

export const useAuth = ({middleware, url}) => {

    const {token, setTokenFunction} = useStore();

    const navigate = useNavigate();

    const {data: user, error, mutate} = useSWR('/api/user', () =>
        customerAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    const login = async (form, setErrors) => {
        try {
            const { data } = await customerAxios.post('/api/login', form);
            
            setErrors([]);
            setTokenFunction(data.token)
            
            //setTokenFunction(data.token)
        } catch (error) {
            setErrors(Object.values(error.response.data.errors));
            console.log(error);
        }
      }

    const register = async (form, setErrors) => {
        try {
            const {data} = await customerAxios.post('/api/register',form)
            setTokenFunction(data.token)
            setErrors([])
            await mutate()
            
          } catch (error) {
            setErrors(Object.values(error.response.data.errors))
            console.log(error)
          }
    }

    const logout = async () => {
        try {
            const {data} = await customerAxios.post('/api/logout', null,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTokenFunction('')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(()=>{
        if(middleware === 'guest' && url && user){
            navigate(url)
        }

        if(middleware === 'guest' && user && user.admin === 1){
            navigate('/admin')
        }

        if(middleware === 'admin' && user && user.admin === 0){
            navigate('/')
        }

        if(middleware === 'auth' && error){
            navigate('/auth/login')
        }
    },[user, error])

    return {login, register, logout, user, error}
}