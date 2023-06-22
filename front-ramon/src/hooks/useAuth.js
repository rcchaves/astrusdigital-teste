import { useEffect } from 'react'
import useSWR from 'swr'
import {useNavigate} from 'react-router-dom'
import clienteAxios from "../config/axios";

export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

     const login = async (dados, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/login', dados)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors) )
        }
     }

     const cadastro = async (dados, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/cadastro', dados)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors) )
        }
     }

     const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
     }

     useEffect(() => {
        if(middleware === 'guest' && url && user) {
            navigate(url)
        }

        if(middleware === 'guest' && user && user.admin) {
            navigate('/terminal');
        }

        if(middleware === 'admin' && user && !user.admin) {
            navigate('/')
        }

        if(middleware === 'auth' && error) {
            navigate('/admin/login')
        }
     }, [user, error]) 

     return {
        login,
        cadastro, 
        logout,
        user,
        
        
     }
    
}