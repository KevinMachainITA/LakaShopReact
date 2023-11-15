import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import AuthLayout from "./layouts/AuthLayout"
import Principal from "./views/Principal"
import Login from "./views/Login"
import Register from "./views/Register"
import AdminLayout from "./layouts/AdminLayout"
import Orders from "./views/Orders"
import Products from "./views/Products"
import Users from "./views/Users"
import ProfileLayout from "./layouts/ProfileLayout"
import Profile from "./views/Profile"
import ProfileOrders from "./views/ProfileOrders"


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children:[
            {
                index: true,
                element: <Principal></Principal>
            }
        ]
    },
    {
        path: '/profile',
        element: <ProfileLayout></ProfileLayout>,
        children:[
            {
                index: true,
                element: <Profile></Profile>
            },
            {
                path: '/profile/orders',
                element: <ProfileOrders></ProfileOrders>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/login',
                element:<Login></Login>
            },
            {
                path: '/auth/register',
                element:<Register></Register>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                index: true,
                element: <Orders></Orders>
            },
            {
                path: '/admin/products',
                element: <Products></Products>
            },
            {
                path: '/admin/users',
                element: <Users></Users>
            },
        ]
    }
])

export default router